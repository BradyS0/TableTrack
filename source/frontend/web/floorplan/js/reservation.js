import { FloorPlanEditor } from "./FloorPlanEditor.js";
import { api } from "../../js/global.js";
import { goToHome, goToLogin } from "../../js/components/nav.js";
import { display_popup_msg } from "../../js/components/popupMsg.js";
import { isoTo12hr } from "../../js/logic/format-utils.js";
import { getUserState } from "../../js/utils.js";

const MAX_DAYS_AHEAD = 14;
const MAX_ALLOWED_GUESTS = 10;

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.querySelector(".editor-root");

  if (!root) return;
  const floorplan = new FloorPlanEditor(root);
  floorplan.setMode("read-only");

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
  title.innerHTML = `Available time-slots for ${table.id} <br> max-capacity: ${table.data.capacity}`;

  const daySelect = createDaySelect();
  let i_tickets = await api.get_tickets(restID, table.id, daySelect.value);
  if(i_tickets.data.length === 0) message.innerHTML = "No Possible Reservations Found"
  for (let ticket of remove2Keep1(i_tickets.data))
    resContainer.append(
      generateTicket(restID, guest_count, table, daySelect, ticket)
    );

  title.append(daySelect);

  daySelect.addEventListener("change", async () => {
    resContainer.innerHTML = "";
    message.innerHTML = ""
    daySelect.value = validateDate(daySelect);
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
  console.log(time);
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  const modal = document.createElement("div");
  modal.className = "modal";

  backdrop.appendChild(modal);

  const heading = document.createElement("h3");
  heading.innerText = "Reservation Confirmation";

  const guestSelectParent = createGuestDropDown(
    table.data.capacity,
    guestAmount
  );

  const dateStamp = getDate(date);
  const timeDateInfo = document.createElement("section");
  timeDateInfo.className = "modal-row";
  timeDateInfo.innerHTML = `Reservation on <b>${dateStamp.toDateString()}</b> at <b>${isoTo12hr(
    time
  )}</b>`;

  const acceptBtn = document.createElement("button");
  acceptBtn.className = "btn2 small primary";
  acceptBtn.innerText = "Confirm";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn2 small danger";
  cancelBtn.innerText = "Cancel";

  acceptBtn.addEventListener("click", async () => {
    // TODO: Implement reservation confirmation logic here.
    // For now, just close the modal.
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

  cancelBtn.addEventListener("click", () => backdrop.remove());

  const modalFooter = document.createElement("section");
  modalFooter.className = "modal-footer";

  modalFooter.append(cancelBtn, acceptBtn);
  modal.append(heading, timeDateInfo, guestSelectParent, modalFooter);

  document.querySelector("body").append(backdrop);
}

// helper for checks and html element creation

function createDaySelect() {
  const daySelect = document.createElement("input");
  daySelect.id = "day-select";
  daySelect.type = "date";
  daySelect.className = "btn2 day-select";

  daySelect.min = daySelect.value = futureDateString(1);
  daySelect.max = futureDateString(MAX_DAYS_AHEAD);

  return daySelect;
}

function futureDateString(daysToAdd) {
  const date = new Date();
  // Advance the date by the specified number of days
  date.setDate(date.getDate() + daysToAdd);

  // Format components to YYYY-MM-DD
  const year = date.getFullYear();
  // Months are 0-indexed, so add 1 and pad with '0'
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDate(yearMonthDay) {
  let [year, month, day] = yearMonthDay.split("-");
  month = month === 1 || month == 0 ? 0 : month - 1;
  console.log(yearMonthDay);
  const date = new Date(year, month, day);
  return date;
}

function validateDate(daySelect) {
  const min = new Date(daySelect.min);
  const max = new Date(daySelect.max);
  const curr = new Date(daySelect.value);

  return min <= curr && curr <= max ? daySelect.value : daySelect.min;
}

function createGuestDropDown(maxCapacity, selectedCapacity) {
  const labelGuestSize = document.createElement("label");
  labelGuestSize.className = "modal-row";
  labelGuestSize.innerText = "Guest Amount";
  labelGuestSize.htmlFor = "res-guest";

  const select = document.createElement("select");
  select.className = "btn2 drop-down";
  select.id = "res-guest";

  populateGuestDropDown(select, maxCapacity);

  select.selectedIndex =
    selectedCapacity > maxCapacity ? 0 : selectedCapacity - 1;

  labelGuestSize.select = select;
  labelGuestSize.append(select);
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
    for (let i = 0; i < arr.length; i += 3) {
      if (arr[i + 2] !== undefined) {
        result.push(arr[i + 2]);
      }
    }
    return result;
  }
  return arr;
}
