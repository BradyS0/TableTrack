import { FloorPlanEditor } from "./FloorPlanEditor.js";

const MAX_DAYS_AHEAD = 14;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".editor-root");
  const guest_count = document.getElementById("guest-count");

  if (!root) return;
  const floorplan = new FloorPlanEditor(root);
  floorplan.loadFloorplanPolygon(mock_floor().floorplan);
  floorplan.loadItems(mock_layout());
  floorplan.setMode("read-only");

  const tables = floorplan.getTables();
  tables.forEach((table) => {
    table.group.on("click", () => {
      showReservations(table, guest_count.value);
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
});

function showReservations(table, guestAmount) {
  const title = document.querySelector(".side-reservation-panel p");
  const resContainer = document.querySelector(
    ".side-reservation-panel section"
  );
  resContainer.innerHTML = "";
  title.innerHTML = "";

  if (!table.data.reservable) return;
  title.innerHTML = `Available time-slots for ${table.id} <br> max-capacity: ${table.data.capacity}`;
  //make request and get the times from the table

  const daySelect = createDaySelect();
  title.append(daySelect);

  daySelect.addEventListener("change", () => {
    daySelect.value = validateDate(daySelect);
    console.log(daySelect.value);
  });

  for (let i = 0; i < 5; i++) {
    const newSpan = document.createElement("button");
    newSpan.className = "btn2 danger small";
    newSpan.innerText = `${i + 1}:30pm`;

    newSpan.addEventListener("click", () => {
      createReservationPopup(
        table,
        guestAmount,
        daySelect.value,
        newSpan.innerText
      );
    });

    resContainer.append(newSpan);
  }
}

function createReservationPopup(table, guestAmount, date, time) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  const modal = document.createElement("div");
  modal.className = "modal";

  backdrop.appendChild(modal);

  const heading = document.createElement("h3");
  heading.innerText = "Reservation Confirmation";

  const guestSize = document.createElement("input");
  guestSize.type = "number";
  guestSize.min = 0;
  guestSize.max = table.data.capacity;
  guestSize.value = guestAmount <= guestSize.max ? guestAmount : guestSize.max;
  guestSize.id = "res-guest";

  const labelGuestSize = document.createElement("label");
  labelGuestSize.className = "modal-row";
  labelGuestSize.innerText = "Guest Amount";
  labelGuestSize.for = "res-guest";
  labelGuestSize.appendChild(guestSize);

  const timeDateInfo = document.createElement("section");
  timeDateInfo.className = "modal-row";
  timeDateInfo.innerHTML = `Making Reservation for <b>${date}</b> at <b>${time}</b>`;

  const acceptBtn = document.createElement("button");
  acceptBtn.className = "btn2 small primary";
  acceptBtn.innerText = "Confirm";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn2 small danger";
  cancelBtn.innerText = "Cancel";

  acceptBtn.addEventListener("click", () => {
    console.log(timeDateInfo.innerHTML);
  });

  cancelBtn.addEventListener("click", () => backdrop.remove());

  const modalFooter = document.createElement("section");
  modalFooter.className = "modal-footer";

  modalFooter.append(cancelBtn, acceptBtn);
  modal.append(heading, timeDateInfo, labelGuestSize, modalFooter);

  document.querySelector("body").append(backdrop);
}

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

function validateDate(daySelect) {
  const min = new Date(daySelect.min);
  const max = new Date(daySelect.max);
  const curr = new Date(daySelect.value);

  return min <= curr && curr <= max ? daySelect.value : daySelect.min;
}

function mock_floor() {
  return {
    floorplan: [
      {
        x: 327.65625,
        y: 147.8125,
      },
      {
        x: 721.65625,
        y: 147.8125,
      },
      {
        x: 721.65625,
        y: 375.8125,
      },
      {
        x: 588.65625,
        y: 375.8125,
      },
      {
        x: 588.65625,
        y: 495.8125,
      },
      {
        x: 277.65625,
        y: 495.8125,
      },
      {
        x: 277.65625,
        y: 261.8125,
      },
      {
        x: 150.65625,
        y: 261.8125,
      },
      {
        x: 150.65625,
        y: 147.8125,
      },
    ],
  };
}

function mock_layout() {
  return {
    tables: [
      {
        id: "a86dbffa-ae1b-4326-b085-32ef3dd08e81",
        type: "table",
        pos: {
          x: 355.65625,
          y: 406.8125,
        },
        rotation: 0,
        data: {
          capacity: 4,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "c1785334-735d-467c-9e9c-dc7eda746fca",
        type: "table",
        pos: {
          x: 353.65625,
          y: 327.8125,
        },
        rotation: 0,
        data: {
          capacity: 5,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "9e694792-030b-4e92-a866-bb9ff1ce52d1",
        type: "table",
        pos: {
          x: 542.65625,
          y: 403.8125,
        },
        rotation: 0,
        data: {
          capacity: 4,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "b9284fcb-1f8f-4dae-902b-2d9d521e76fd",
        type: "table",
        pos: {
          x: 542.65625,
          y: 329.8125,
        },
        rotation: 0,
        data: {
          capacity: 8,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "8789871e-ddf6-437a-a88c-680b9ec2c1a7",
        type: "table",
        pos: {
          x: 675.65625,
          y: 324.8125,
        },
        rotation: 0,
        data: {
          capacity: 4,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "41dc6c1e-7857-4da5-8b66-ec502a831c3b",
        type: "table",
        pos: {
          x: 678.65625,
          y: 253.8125,
        },
        rotation: 0,
        data: {
          capacity: 4,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "4a93da6f-c398-4664-afc2-4e7da3b782c1",
        type: "table",
        pos: {
          x: 674.65625,
          y: 188.8125,
        },
        rotation: 0,
        data: {
          capacity: 10,
          reservable: true,
          rotation: 0,
        },
      },
      {
        id: "20cdb432-e22b-4437-a91b-76bd31dcf884",
        type: "table",
        pos: {
          x: 199.65625,
          y: 199.8125,
        },
        rotation: 0,
        data: {
          capacity: 4,
          reservable: false,
          rotation: 0,
        },
      },
      {
        id: "fc90aaa7-1ea4-4d8b-a272-90b6a1c0f248",
        type: "table",
        pos: {
          x: 299.65625,
          y: 196.8125,
        },
        rotation: 0,
        data: {
          capacity: 26,
          reservable: true,
          rotation: 0,
        },
      },
    ],
    misc: [
      {
        id: "f64ca693-6f25-480c-8ded-a05d54f6997a",
        type: "window",
        pos: {
          x: 150.65625,
          y: 176.8125,
        },
        rotation: -90,
        data: {
          length: 50,
        },
      },
      {
        id: "378b763c-cc93-46fe-8086-b7a45005fddc",
        type: "window",
        pos: {
          x: 150.65625,
          y: 227.8125,
        },
        rotation: -90,
        data: {
          length: 50,
        },
      },
      {
        id: "6df8bded-2c17-4281-85f3-b0084161b198",
        type: "window",
        pos: {
          x: 721.65625,
          y: 188.8125,
        },
        rotation: 90,
        data: {
          length: 50,
        },
      },
      {
        id: "6f1a0b6e-a861-461c-abc3-6c60a82d9e53",
        type: "window",
        pos: {
          x: 721.65625,
          y: 268.8125,
        },
        rotation: 90,
        data: {
          length: 50,
        },
      },
      {
        id: "bfc2ae43-63f1-4237-b3a9-bce40a62fcc4",
        type: "window",
        pos: {
          x: 721.65625,
          y: 335.8125,
        },
        rotation: 90,
        data: {
          length: 50,
        },
      },
      {
        id: "0738398d-8ea2-4d89-93e7-8e0b12467c13",
        type: "door",
        pos: {
          x: 424.65625,
          y: 495.8125,
        },
        rotation: 180,
        data: {
          length: 80,
        },
      },
    ],
  };
}
