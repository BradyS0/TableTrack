import { createNav } from '../components/nav.js';
import { clearUserState, getUserState, setUserState } from '../utils.js';
import { createRegistrationPopup } from '../components/merchantRegister.js';
import { mockUsersAPI } from '../api_calls/mock/user_api.js'; 

document.addEventListener('DOMContentLoaded', () => {
  // Reuse your hamburger nav and overlay system
  createNav(['home', 'about', 'logout']); 

  const user = getUserState('user') || { username: 'Guest', email: 'guest@example.com' };
  document.querySelector('.username').textContent = user.username;
  document.querySelector('.email').textContent = user.email || 'Not provided';

  // Get elements
  const editBtn = document.getElementById('editProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const popup = document.getElementById('editPopup');
  const closeBtn = document.getElementById('closeEdit');
  const form = document.getElementById('editForm');
  const merchantBtn = document.getElementById('merchantBtn');

  // Open popup
  editBtn.addEventListener('click', () => popup.classList.remove('hidden'));

  // Close popup
  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));

  // Open merchant registration popup
  merchantBtn.addEventListener('click', () => {
    createRegistrationPopup();

    // Observe user changes after registration
    const observer = new MutationObserver(() => {
      const updatedUser = getUserState('user');
      if (updatedUser.restID) {
        observer.disconnect();

        // Create "Manage Restaurant" button
        const manageBtn = document.createElement('button');
        manageBtn.classList.add('btn', 'merchant');
        manageBtn.textContent = 'Manage Restaurant';
        manageBtn.addEventListener('click', () => {
          window.location.href = 'restaurantManagement.html';
        });

        // Replace "Become a Merchant!" button
        merchantBtn.replaceWith(manageBtn);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });

  // Save updated profile using mockUsersAPI
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedFName = document.getElementById('editFName').value.trim();
    const updatedLName = document.getElementById('editLName').value.trim();
    const updatedEmail = document.getElementById('editEmail').value.trim();
    const updatedPassword = document.getElementById('editPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!updatedFName || !updatedLName || !updatedEmail) {
      alert('Please fill in all required fields.');
      return;
    }
    if (updatedPassword && updatedPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const currentUser = getUserState('user');
    let response;

    // Change first name
    if (updatedFName !== currentUser.first_name) {
      response = await mockUsersAPI.changeFirstName(currentUser.userID, updatedFName);
      if (response.code !== 200) return alert(response.message);
      currentUser.first_name = updatedFName;
    }

    // Change last name
    if (updatedLName !== currentUser.last_name) {
      response = await mockUsersAPI.changeLastName(currentUser.userID, updatedLName);
      if (response.code !== 200) return alert(response.message);
      currentUser.last_name = updatedLName;
    }

    // Change email
    if (updatedEmail !== currentUser.email) {
      response = await mockUsersAPI.changeEmail(currentUser.userID, updatedEmail);
      if (response.code !== 200) return alert(response.message);
      currentUser.email = updatedEmail;
    }

    // Change password
    if (updatedPassword) {
      response = await mockUsersAPI.changePassword(
        currentUser.userID,
        currentUser.password,
        updatedPassword
      );
      if (response.code !== 200) return alert(response.message);
      currentUser.password = updatedPassword;
    }

    // Update session state
    setUserState('user', currentUser);
    document.querySelector('.username').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.querySelector('.email').textContent = currentUser.email;
    popup.classList.add('hidden');

    alert('Profile updated successfully!');
  });

  // Logout functionality
  logoutBtn.addEventListener('click', () => {
    clearUserState();
    window.location.href = 'login.html';
  });
});
