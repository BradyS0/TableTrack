const editPopup = function(heading) {
    const popup = document.createElement('div');
    popup.className = 'edit-container';
    popup.innerHTML = `
        <span>
            <h1>${heading}</h1>
            <button class="close-btn">×</button>
        </span>`;

    popup.add = function(name) {
        const editButton = document.createElement('section');
        editButton.innerHTML = `${name} <span>›</span>`;

        const goBack = (() => {
            const btn = document.createElement('button');
            btn.innerHTML = '‹';
            btn.className = 'prev-btn';
            return btn;
        })();

        const editHeader = (() => {
            const span = document.createElement('span');
            const h1 = document.createElement('h1');
            h1.textContent = `Edit ${name}`;
            span.append(goBack, h1);
            return span;
        })();

        const createEditScreen = (inputs, onSubmit, special) => {
            const screen = document.createElement('div');
            screen.className = 'edit-container';

            goBack.onclick = () => screen.replaceWith(popup);

            special(...inputs);

            const submit = document.createElement('button');
            submit.textContent = 'Save Changes';
            submit.className = 'submit';
            submit.onclick = () => onSubmit(...inputs);

            screen.append(editHeader, ...inputs, submit);
            popup.replaceWith(screen);
        };

        editButton.editText = function(preExist, onSubmit, special = () => {}) {
            editButton.onclick = () => {
                const input = (() => {
                    const el = document.createElement('input');
                    el.type = 'text';
                    el.value = preExist;
                    el.placeholder = name;
                    return el;
                })();
                createEditScreen([input], () => onSubmit(input), special);
            };
        };

        editButton.editPassword = function(onSubmit = () => {}, special = () => {}) {
            editButton.onclick = () => {
                const [newPass, confirmNew, confirmOld] = ['New Password', 'Confirm New Password', 'Old Password']
                    .map(placeholder => {
                        const input = document.createElement('input');
                        input.type = 'password';
                        input.placeholder = placeholder;
                        return input;
                    });

                createEditScreen([newPass, confirmNew, confirmOld],
                    () => onSubmit(newPass, confirmNew, confirmOld),
                    special);
            };
        };

        popup.append(editButton);
        return editButton;
    };

    const overlay = document.createElement('div');
    overlay.className = 'popup overlay overlay-active';
    overlay.append(popup);
    popup.overlay = overlay;

    popup.querySelector('.close-btn').addEventListener('click', () => overlay.remove());

    return popup;
};

const app = document.querySelector('#app')
const newEdit = editPopup('Edit User Profile')

newEdit.add('First Name').editText('Arsalan')
newEdit.add('Last Name').editText('Siddiqui')
newEdit.add('Email').editText('arsalan@email.com')
newEdit.add('Password').editPassword()

app.append(newEdit.overlay)
