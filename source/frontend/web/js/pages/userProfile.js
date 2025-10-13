import { createNav } from '../components/nav.js';
import { getUserState, setUserState } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
   createNav(['home', 'about', 'logout']); 

  const user = getUserState('user') || { username: 'Guest', email: 'guest@example.com' };
  document.querySelector('.username').textContent = user.username;
  document.querySelector('.email').textContent = user.email || 'Not provided';

  // Elements
  const editBtn = document.getElementById('editProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const popup = document.getElementById('editPopup');
  const merchantBtn = document.getElementById('merchantBtn');
  const merchantCloseBtn = document.getElementById('closeMerchant');
  const merchantPopup = document.getElementById('merchantPopup');
  const closeBtn = document.getElementById('closeEdit');
  const form = document.getElementById('editForm');

  // Edit Popup open/close
  editBtn.addEventListener('click', () => popup.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));

  // Merchant Popup open/close
  merchantBtn.addEventListener('click', () => merchantPopup.classList.remove('hidden'));
  merchantCloseBtn.addEventListener('click', () => merchantPopup.classList.add('hidden'));

  // Save profile
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedName = document.getElementById('editName').value.trim();
    const updatedEmail = document.getElementById('editEmail').value.trim();
    const updatedPassword = document.getElementById('editPassword').value.trim();

    if (!updatedName || !updatedEmail) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedUser = {
      ...user,
      username: updatedName,
      email: updatedEmail,
      password: updatedPassword || user.password,
    };

    setUserState('user', updatedUser);
    document.querySelector('.username').textContent = updatedUser.username;
    document.querySelector('.email').textContent = updatedUser.email;
    popup.classList.add('hidden');

    alert('Profile updated successfully!');
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    setUserState('user', { loggedIn: false });
    window.location.href = 'login.html';
  });
});
