export const editPopup = function (heading) {
    const overlay = document.createElement('div');
    overlay.className = 'popup overlay overlay-active';
    const popup = document.createElement('div');
    popup.className = 'edit-container';
    popup.innerHTML = `
        <span>
            <h2>${heading}</h2>
            <button class="close-btn">×</button>
        </span>`;

    popup.add = function (name) {
        const editButton = document.createElement('button');
        editButton.className = 'edit-button'
        editButton.innerHTML = `${name} <span>›</span>`;

        const goBack = (() => {
            const btn = document.createElement('button');
            btn.innerHTML = '‹';
            btn.className = 'prev-btn';
            return btn;
        })();

        const editHeader = (() => {
            const span = document.createElement('span');
            const h2 = document.createElement('h2');
            h2.textContent = `Edit ${name}`;
            span.append(goBack, h2);
            return span;
        })();

        const createEditScreen = (inputs, onSubmit, special) => {
            const screen = document.createElement('form');
            screen.className = 'edit-container';

            goBack.onclick = (e) => {
                e.preventDefault();
                screen.replaceWith(popup)
            };

            special(...inputs);

            const submit = document.createElement('button');
            submit.type = 'submit'
            submit.textContent = 'Save Changes';
            submit.className = 'submit';

            screen.addEventListener('submit', (e) => {
                e.preventDefault();
                if (screen.checkValidity())
                    onSubmit(...inputs)
            });

            screen.append(editHeader, ...inputs, submit);
            popup.replaceWith(screen);
        };

        editButton.editText = function (preExist, onSubmit, special = () => { }) {
            editButton.onclick = () => {
                const input = (() => {
                    const el = document.createElement('input');
                    el.type = 'text';
                    el.value = preExist;
                    el.placeholder = name;
                    el.required = true;
                    el.minLength = 2
                    return el;
                })();
                createEditScreen([input], () => onSubmit(input), special);
            };
        };


        editButton.editPassword = function (onSubmit = () => { }) {
            editButton.onclick = () => {
                const [newPass, confirmNew, confirmOld] = ['New Password', 'Confirm New Password', 'Old Password']
                    .map(placeholder => {
                        const input = document.createElement('input');
                        input.type = 'password';
                        input.placeholder = placeholder;
                        input.required = true;
                        return input;
                    });

                createEditScreen([newPass, confirmNew, confirmOld],
                    () => onSubmit(newPass, confirmNew, confirmOld),
                    (newPass, confirmNew, confirmOld) => {
                        confirmNew.maxLength = 0
                        newPass.minLength = confirmOld.minLength = 8

                        confirmNew.addEventListener("input", () => {
                            if (confirmNew.value.length === newPass.value.length && confirmNew.value !== newPass.value)
                                popup.showFeedback(9000, 'passwords do not match')

                            if (confirmNew.value === newPass.value && newPass.value.length >= 8) {
                                confirmNew.style.outline = newPass.style.border = '3px solid limegreen'
                            } else {
                                confirmNew.style.outline = newPass.style.border = 'none'
                            }
                        })
                        newPass.addEventListener("blur", () => { confirmNew.minLength = confirmNew.maxLength = newPass.value.length })
                    });
        };
    };

    popup.append(editButton);
    return editButton;
};

popup.showFeedback = function (code, message) {
    const feedback = document.createElement('span')
    feedback.className = 'feedback-msg'
    feedback.innerText = message

    if (code > 299)
        feedback.classList.add('feedback-fail')

    overlay.append(feedback)
    setTimeout(() => {
        feedback.classList.add('feedback-transition')
        setTimeout(() => { feedback.remove() }, 2300 + Math.min(message.length, 1000))
    }, 10)

}


overlay.append(popup);
popup.overlay = overlay;

popup.querySelector('.close-btn').addEventListener('click', () => overlay.remove());
overlay.addEventListener("click", (e) => {
    if (e.target == overlay)
        overlay.remove()
})

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