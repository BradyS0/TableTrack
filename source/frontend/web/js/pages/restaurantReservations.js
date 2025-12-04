import { api } from "../global.js";
import { getUserState } from "../utils.js";
import { isoTo12hr } from "../logic/format-utils.js";

const container = document.getElementById("reservations");

async function loadReservations() {
  container.innerHTML = "<p class='loading'>Loading...</p>";

  const user = getUserState();
  let reservations = await api.get_by_rest(user.restID);
  reservations = reservations.data || [];
  console.log(reservations);

  if (reservations.length === 0) {
    container.innerHTML = "<p class='no-res'>There are currently no reservations available.</p>";
    return;
  }

  container.innerHTML = "";
  reservations.forEach(async (r) => {
    const div = document.createElement("div");
    div.className = "reservation-card";

    const date = new Date(r.date_stamp);

    div.innerHTML = `
                        <h3>${r["User.first_name"]+" "+ r["User.last_name"] || "Restaurant"}</h3>
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
      if (req.code < 300) div.remove();
    });
  });

}

function generateTemplate(data) {
  const template = document.createElement("div");
  template.innerHTML = data.trim();
  return template.firstElementChild;
}

document.addEventListener("DOMContentLoaded",async()=>{
  await loadReservations();
  const container = document.getElementById("container")
  const app = document.getElementById("app")

  app.append(container)

})
