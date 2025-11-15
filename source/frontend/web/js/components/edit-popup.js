import { floatToTime,timeToFloat } from "../logic/format-utils.js";

export const editPopup = function (heading) {
  const overlay = document.createElement("div");
  overlay.className = "popup overlay overlay-active";
  const popup = document.createElement("div");
  popup.className = "edit-container";
  popup.innerHTML = `
        <span>
            <h2>${heading}</h2>
            <button class="close-btn">×</button>
        </span>`;

  popup.add = function (name) {
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = `${name} <span>›</span>`;

    const goBack = (() => {
      const btn = document.createElement("button");
      btn.innerHTML = "‹";
      btn.className = "prev-btn";
      return btn;
    })();

    const editHeader = (() => {
      const span = document.createElement("span");
      const h2 = document.createElement("h2");
      h2.textContent = `Edit ${name}`;
      span.append(goBack, h2);
      return span;
    })();

    const createEditScreen = (inputs, onSubmit, special) => {
      const screen = document.createElement("form");
      screen.className = "edit-container";

      goBack.onclick = (e) => {
        e.preventDefault();
        screen.replaceWith(popup);
      };

      special(...inputs);

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.textContent = "Save Changes";
      submit.className = "submit";

      screen.addEventListener("submit", (e) => {
        e.preventDefault();
        if (screen.checkValidity()) onSubmit(...inputs);
      });

      screen.append(editHeader, ...inputs, submit);
      popup.replaceWith(screen);
    };

    editButton.editText = function (preExist, onSubmit, special = () => {}) {
      editButton.onclick = () => {
        const input = (() => {
          const el = document.createElement("input");
          el.type = "text";
          el.value = preExist;
          el.placeholder = name;
          el.required = true;
          el.minLength = 2;
          return el;
        })();
        createEditScreen([input], () => onSubmit(input), special);
      };
    };

    editButton.editPassword = function (onSubmit = () => {}) {
      editButton.onclick = () => {
        const [newPass, confirmNew, confirmOld] = [
          "New Password",
          "Confirm New Password",
          "Old Password",
        ].map((placeholder) => {
          const input = document.createElement("input");
          input.type = "password";
          input.placeholder = placeholder;
          input.required = true;
          return input;
        });

        createEditScreen(
          [newPass, confirmNew, confirmOld],
          () => onSubmit(newPass, confirmNew, confirmOld),
          (newPass, confirmNew, confirmOld) => {
            confirmNew.maxLength = 0;
            newPass.minLength = confirmOld.minLength = 8;

            confirmNew.addEventListener("input", () => {
              if (
                confirmNew.value.length === newPass.value.length &&
                confirmNew.value !== newPass.value
              )
                popup.showFeedback(9000, "passwords do not match");

              if (
                confirmNew.value === newPass.value &&
                newPass.value.length >= 8
              ) {
                confirmNew.style.outline = newPass.style.border =
                  "3px solid limegreen";
              } else {
                confirmNew.style.outline = newPass.style.border = "none";
              }
            });
            newPass.addEventListener("blur", () => {
              confirmNew.minLength = confirmNew.maxLength =
                newPass.value.length;
            });
          }
        );
      };
      };

      editButton.editSchedule = function (existingSchedule, onSubmit) {
    editButton.onclick = () => {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        const scheduleContainer = document.createElement("div");
        scheduleContainer.className = "schedule-edit";

        const inputs = [];

        days.forEach(day => {
            const row = document.createElement("div");
            row.className = "schedule-row";

            // Checkbox: whether to include in update
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "day-check";

            const label = document.createElement("label");
            label.textContent = day.slice(0, 3);
            label.className = "day-label";

            // Toggle open/closed for that day
            const statusToggle = document.createElement("select");
            statusToggle.className = "status-toggle";
            statusToggle.innerHTML = `
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            `;

            const openInput = document.createElement("input");
            openInput.type = "time";
            openInput.step = 300; // 5-minute increments
            openInput.className = "time-input";

            const closeInput = document.createElement("input");
            closeInput.type = "time";
            closeInput.step = 300;
            closeInput.className = "time-input";

            // Initialize from existing schedule
            const { open, close } = existingSchedule[day] || { open: -1, close: -1 };
            if (open>=0 && close>=0) {
                statusToggle.value = "open";
                openInput.value = floatToTime(open);
                closeInput.value = floatToTime(close);
            } else {
                statusToggle.value = "closed";
                openInput.value = "";
                closeInput.value = "";
            }
            statusToggle.disabled = openInput.disabled = closeInput.disabled = !checkbox.checked;

            // When status changes
            statusToggle.addEventListener("change", () => {
                const isOpen = statusToggle.value === "open";
                openInput.disabled = closeInput.disabled = !isOpen;
                row.classList.toggle("closed", !isOpen);
            });

            // Checkbox state change
            checkbox.addEventListener("change", () => {
                row.classList.toggle("selected", checkbox.checked);
                statusToggle.disabled= !checkbox.checked
                openInput.disabled = closeInput.disabled =  !checkbox.checked || statusToggle.value == 'closed'
            });

            row.append(checkbox, label, statusToggle, openInput, closeInput);
            scheduleContainer.appendChild(row);

            inputs.push({ day, checkbox, statusToggle, openInput, closeInput });
        });

        const special = () => {}; // no additional logic yet

        const handleSubmit = () => {
            const updated = {};
            inputs.forEach(({ day, checkbox, statusToggle, openInput, closeInput }) => {
                const update = checkbox.checked;
                const isOpen = statusToggle.value === "open";
                
                if (update){
                updated[day] = {
                    open: isOpen ? timeToFloat(openInput.value) : -1,
                    close: isOpen ? timeToFloat(closeInput.value) : -1
                };
                }
        });
            onSubmit(updated);
        };
        
        const usabilityMsg = document.createElement('p')
        usabilityMsg.innerHTML = '<i>Only changes in fields with the checkbox checked will be saved.</i>'
        setTimeout(()=>{usabilityMsg.remove()}, 6000)
        createEditScreen([usabilityMsg,scheduleContainer], handleSubmit, special);
    };
};
    

    popup.append(editButton);
    return editButton;
  };

  popup.showFeedback = function (code, message) {
    const feedback = document.createElement("span");
    feedback.className = "feedback-msg";
    feedback.innerText = message;

    if (code > 299) feedback.classList.add("feedback-fail");

    overlay.append(feedback);
    setTimeout(() => {
      feedback.classList.add("feedback-transition");
      setTimeout(() => {
        feedback.remove();
      }, 2300 + Math.min(message.length, 1000));
    }, 10);
  };

  overlay.append(popup);
  popup.overlay = overlay;

  popup
    .querySelector(".close-btn")
    .addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target == overlay) overlay.remove();
  });

  return popup;
};

// const app = document.querySelector('#app')
// const newEdit = editPopup('Edit User Profile')

// newEdit.add('First Name').editText('Arsalan')
// newEdit.add('Last Name').editText('Siddiqui')
// newEdit.add('Email').editText('arsalan@email.com',(input)=>{
//     console.log(input.value)
//     newEdit.showFeedback(400,`The new email will be: ${input.value}`)
// })
// newEdit.add('Password').editPassword()

// app.append(newEdit.overlay)
