import { FloorPlanEditor } from "./FloorPlanEditor.js";
import { api } from "../../js/global.js";
import { goToHome, goToLogin } from "../../js/components/nav.js";
import { display_popup_msg } from "../../js/components/popupMsg.js";
import { isoTo12hr } from "../../js/logic/format-utils.js";
import { getUserState } from "../../js/utils.js";
import { DAYS } from "../../js/components/schedule.js";
import { createDatePicker } from "../../js/components/datePicker.js";
import { generateTemplate } from "../../js/utils.js";

const MAX_ALLOWED_GUESTS = 10;
let invalid_days = [];

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.querySelector(".editor-root");

  if (!root) return;
  const floorplan = new FloorPlanEditor(root);
  

  const params = new URLSearchParams(window.location.search);
  const restID = params.get("restID");
  
  if (!restID) return;
  const rest = await api.getRestaurantByID(restID);

  if (rest.code < 300) {
    await populateFloorPlan(rest.data, floorplan);
  } else goToHome();
});

async function populateFloorPlan(rest, floorplan) {
  const guest_count = document.getElementById("guest-count");
  populateGuestDropDown(guest_count, MAX_ALLOWED_GUESTS);
  document.getElementById("rest-name").innerText = rest.name;

  //make a request to fetch floorplan and layout using restID
  const floor = await api.get_walls(rest.restID);

  if (floor.code < 300 && floor.data.floorplan.length >= 3) {
    floorplan.loadFloorplanPolygon(floor.data.floorplan);

    const layout = await api.get_layout(rest.restID);
    if (layout.code < 300) floorplan.loadItems(layout.data);
    else {
      empty_reservation(rest.restID);
      return;
    }
  } else {
    empty_reservation(rest.restID);
    return;
  }
  
  floorplan.setMode("read-only");
  await setInvalidDays(rest.restID)
  const tables = floorplan.getTables();
  tables.forEach((table) => {
    table.group.on("click", async () => {
      await showReservations(rest.restID, table);
    });
  });

  guest_count.addEventListener("change", () => {
    let count = 0;
    for (let table of tables) {
      if (!table.data.reservable) continue;
      const diff = table.data.capacity - guest_count.value;
      const withinValidDiff =
        guest_count.value == 0 ||
        (diff >= 0 && diff <= 3) ||
        (count < 1 && diff > 3 && diff < 12);
      count = withinValidDiff ? count + 1 : count;
      table.changeFill(withinValidDiff ? "green" : "#843");
    }
  });
}

async function showReservations(restID, table) {
  const title = document.querySelector(".side-reservation-panel p");
  const resContainer = document.querySelector(
    ".side-reservation-panel section"
  );
  const message = document.getElementById('ticket-msg')

  message.innerHTML = ""
  resContainer.innerHTML = "";
  title.innerHTML = "";

  const guest_count = document.getElementById("guest-count");

  if (!table.data.reservable) return;
  title.innerHTML = `Table capacity: ${table.data.capacity}`;

  const daySelect = createDatePicker(title, invalid_days);
  let i_tickets = await api.get_tickets(restID, table.id, daySelect.value);
  if(i_tickets.data.length === 0) message.innerHTML = "No Possible Reservations Found"
  for (let ticket of remove2Keep1(i_tickets.data))
    resContainer.append(
      generateTicket(restID, guest_count, table, daySelect, ticket)
    );


  daySelect.addEventListener("change", async () => {
    resContainer.innerHTML = "";
    message.innerHTML = ""
    const tickets = await api.get_tickets(restID, table.id, daySelect.value);
    if(tickets.data.length === 0) message.innerHTML = "No Possible Reservations Found"
    for (let ticket of remove2Keep1(tickets.data)) {
      resContainer.append(
        generateTicket(restID, guest_count, table, daySelect, ticket)
      );
    }
  });
}

function generateTicket(restID, guest_count, table, daySelect, timeInfo) {
  const newSpan = document.createElement("button");
  newSpan.className = "btn2 danger small";
  newSpan.innerText = isoTo12hr(timeInfo);

  const user = getUserState();
  if (!user) {
    display_popup_msg(
      "No User",
      "You need to be logged in to reserve a spot",
      goToLogin
    );
    return;
  }

  newSpan.addEventListener("click", () => {
    let guestAmount = guest_count.value > 0 ? guest_count.value : 1;
    createReservationPopup(
      restID,
      user.userID,
      table,
      guestAmount,
      daySelect.value,
      timeInfo
    );
  });

  return newSpan;
}

function createReservationPopup(
  restID,
  userID,
  table,
  guestAmount,
  date,
  time
) {

  const guestSelectParent = createGuestDropDown(
    table.data.capacity,
    guestAmount
  );

  const dateStamp = getDate(date);
  const backdrop = generateTemplate(`
    <div class="modal-backdrop">
    <div class="modal">
      <h3>Reservation Confirmation</h3>
      <section class="modal-row">
        ${`Reservation on 
          <b>${dateStamp.toDateString()}</b> at 
        <b>${isoTo12hr(time)}</b>`}
      </section>
      ${guestSelectParent.outerHTML}
      <section class="modal-footer">
        <button class = "btn2 small danger">Cancel</button>
        <button class = "btn2 small primary">Confirm</button>
      </section>
    </div>
    </div>`
  )
  
  const acceptBtn = backdrop.querySelector("button.primary");
  acceptBtn.addEventListener("click", async () => {
    const res = await api.create_res(
      restID,
      userID,
      table.id,
      time,
      guestSelectParent.select.value
    );
    console.log(res);
    display_popup_msg("Reservation Status",res.message)
    
    backdrop.remove();
  });
  
  const cancelBtn = backdrop.querySelector("button.danger");
  cancelBtn.addEventListener("click", () => backdrop.remove());

  document.querySelector("body").append(backdrop);
}

// helper for checks and html element creation
function getDate(yearMonthDay) {
  let [year, month, day] = yearMonthDay.split("-");
  month = month === 1 || month == 0 ? 0 : month - 1;
  console.log(yearMonthDay);
  const date = new Date(year, month, day);
  return date;
}


function createGuestDropDown(maxCapacity, selectedCapacity) {
  const labelGuestSize = generateTemplate(`<label class="modal-row" for="res-guest"> Guest Amount
      <select class="btn2 drop-down" id="res-guest" name="rest-guest"></select>
    </label>`)

  const select = labelGuestSize.querySelector("#res-guest")
  populateGuestDropDown(select, maxCapacity);

  select.selectedIndex =
    selectedCapacity > maxCapacity ? 0 : selectedCapacity - 1;

  labelGuestSize.select = select;
  return labelGuestSize;
}

function populateGuestDropDown(select, max) {
  for (let i = 1; i <= max; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = `${i} Guest${i > 1 ? "s" : ""}`;
    select.append(option);
  }
}

function empty_reservation(restID) {
  display_popup_msg(
    "Not Reservable",
    "It seems this restaurant doesn't have a floorplan and reservations setup",
    () => {
      window.location.href = `./restaurantDetail.html?restID=${restID}`;
    }
  );
}

function remove2Keep1(arr) {
  if (arr.length > 25) {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] !== undefined) {
        result.push(arr[i]);
      }
    }
    return result;
  }
  return arr;
}

async function setInvalidDays(restID){
  const req = await api.getFullSchedule(restID)
  if(req.code>299) return
  const schedule = req.schedule;
  const data = []
  for (let i=0; i<DAYS.length ; i++){
    const day = schedule[DAYS[i]]
    if(day.open===day.close || day.open===-1 || day.close===-1)
      data.push(i)
  }

  invalid_days = data
}
