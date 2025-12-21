import { api } from "../global.js";
import { getUserState } from "../utils.js";
import { isoTo12hr } from "../logic/format-utils.js";
import { generateTemplate } from "../utils.js";

const groupTitle = {
  date_stamp: "Date",
  tableID: "Table",
};

const user = getUserState();
let RESERVATIONS;

async function loadReservations() {
  const container = document.querySelector(".reservations");
  container.innerHTML = "<p class='loading'>Loading...</p>";

  let reservations = await api.get_by_rest(user.restID);
  RESERVATIONS = reservations.data || [];

  container.innerHTML = "";
  let tempContainer = container;
  populateCards(tempContainer, RESERVATIONS);

  const filterSelect = document.getElementById("filter-select");
  filterSelect.onchange = () => {
    if (filterSelect.value == 0) {
      let tempC = generateTemplate(`<div class="reservations"></div>`)
      populateCards(tempC, RESERVATIONS);
      tempContainer.replaceWith(tempC);
      tempContainer = tempC;
    }else if(RESERVATIONS.length>0) {
      const groupBy = filterSelect.value;
      let resGroup = createReservedGroup(RESERVATIONS, groupBy);
      const parentContainer = generateTemplate(
        `<div class="res-group-parent"></div>`
      );
      for (let key in resGroup) {
        const groupContainer =
          generateTemplate(`<div class="reservations group">
          <h2>${groupTitle[groupBy]} : ${key} </h2>
          <p>Reservations: ${resGroup[key].length}</p>
          </div>`);
        populateCards(groupContainer, resGroup[key]);
        parentContainer.append(groupContainer);
      }
      tempContainer.replaceWith(parentContainer);
      tempContainer = parentContainer;
      const gContainers = parentContainer.querySelectorAll(
        ".reservations.group"
      );

      gContainers.forEach((group) => {
        group.addEventListener("click", (e) => {
          gContainers.forEach((g) => {
            if (g !== group) g.classList.remove("open");
          });

          if(!e.target.className.includes("btn danger"))
            group.classList.toggle("open");
        });
      });

    }
  };
}

function createReservedGroup(reservations, groupBy) {
  const groupedReservations = Object.groupBy(reservations, (item) => {
    let result = item[groupBy];
    if (groupBy === "date_stamp") {
      const date = new Date(item[groupBy]);
      return date.toDateString();
    }
    return result;
  });
  return groupedReservations;
}

function populateCards(container, reservations) {
   if (reservations.length === 0) {
    container.innerHTML =
      "<p class='no-res'>There are currently no reservations available.</p>";
    return;
  }

  reservations.forEach((r) => {
    const div = document.createElement("div");
    div.className = "reservation-card";

    const date = new Date(r.date_stamp);

    div.innerHTML = `
                        <h3>${
                          r["User.first_name"] + " " + r["User.last_name"] ||
                          "Restaurant"
                        }</h3>
                        <p><b>Email: </b>${r["User.email"]}</p>
                        <p><b>Table: </b>${r.tableID}</p>
                        <p><strong>Date: </strong> ${date.toDateString()}</p>
                        <p><strong>Time: </strong> ${isoTo12hr(date)}</p> 
                    `;

    const cancel = generateTemplate(
      `<button class='btn danger'> Cancel Reservation</button>`
    );
    div.append(cancel);
    container.appendChild(div);

    cancel.addEventListener("click", async () => {
      const req = await api.delete_res(r.reserveID, user.restID, r.userID);
      if (req.code < 300) {
        const i = RESERVATIONS.indexOf(r)
        const j = reservations.indexOf(r)
        RESERVATIONS.splice(i,1)
        reservations.splice(j,1)
        if(reservations.length==0) container.remove()
        else{
          container.querySelector("p").innerText = `Reservations : ${reservations.length}`
        }
        div.remove();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadReservations();
  const container = document.getElementById("container");
  const app = document.getElementById("app");

  app.append(container);
});
