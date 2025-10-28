import { clearUserState, getUserState, setUserState } from '../utils.js';
import { createRegistrationPopup } from '../components/merchantRegister.js';
import { editPopup } from '../components/edit-popup.js';
import { api } from '../global.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const user = getUserState('user') || { username: 'Guest', email: 'guest@example.com' };
  document.querySelector('.username').textContent = `${user.first_name} ${user.last_name}`;
  document.querySelector('.email').textContent = user.email || 'Not provided';

  // Get elements
  const editBtn = document.getElementById('editProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const popup = document.getElementById('editPopup');
  const closeBtn = document.getElementById('closeEdit');
  const form = document.getElementById('editForm');
  const merchantBtn = document.getElementById('merchantBtn');

  if(user.restID)
    merchantBtn.replaceWith(managerButton())

  // Open popup
  editBtn.addEventListener('click', () => {
    populateCurrentInput(user)
    // popup.classList.remove('hidden')
    createEditProfilePopup(user)
  });

  // Close popup
  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));

  // Open merchant registration popup
  merchantBtn.addEventListener('click', createRegistrationPopup)


  // Save updated profile using api
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedFName = document.getElementById('editFName').value.trim();
    const updatedLName = document.getElementById('editLName').value.trim();
    const updatedEmail = document.getElementById('editEmail').value.trim();
    const updatedPassword = document.getElementById('editPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // if (!updatedFName || !updatedLName || !updatedEmail) {
    //   alert('Please fill in all required fields.');
    //   return;
    // }
    // if (updatedPassword && updatedPassword !== confirmPassword) {
    //   alert('Passwords do not match.');
    //   return;
    // }

    const currentUser = getUserState();
    let response;

    // Change first name
    if (updatedFName.length>3 && updatedFName !== currentUser.first_name) {
      response = await api.changeFirstName(currentUser.userID, updatedFName);
      if (response.code !== 200) {
        alert(response.message); 
        return }
      currentUser.first_name = updatedFName;
    }

    // Change last name
    if (updatedLName.length>3 && updatedLName !== currentUser.last_name) {
      response = await api.changeLastName(currentUser.userID, updatedLName);
      if (response.code !== 200) return alert(response.message);
      currentUser.last_name = updatedLName;
    }

    // Change email
    if (updatedEmail.length>4 && updatedEmail !== currentUser.email) {
      response = await api.changeEmail(currentUser.userID, updatedEmail);
      if (response.code !== 200) return alert(response.message);
      currentUser.email = updatedEmail;
    }

    // Change password
    if (updatedPassword.length>8) {
      response = await api.changePassword(
        currentUser.userID,
        confirmPassword,
        updatedPassword
      );
      if (response.code !== 200) return alert(response.message);
      currentUser.password = updatedPassword;
    }

    // Update session state
    setUserState(currentUser);
    document.querySelector('.username').textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    document.querySelector('.email').textContent = currentUser.email;
    popup.classList.add('hidden');

    //alert('Profile updated successfully!');
    window.location.reload()
  });

  // Logout functionality
  logoutBtn.addEventListener('click',clearUserState);
});

function createEditProfilePopup(user){
  const userEdit = editPopup("User Profile")

  userEdit.add("First Name").editText(user.first_name, async(nameInput)=>{

  })
  
  userEdit.add("Last Name").editText(user.last_name, async(nameInput)=>{
    

  })
  
  userEdit.add("Email").editText(user.email,async(emailInput)=>{
  },(emailInput)=>{
    emailInput.type = 'email'
    email.minLength = 8
  })
  

  //setting up edit password np:new password,  cp:confirm new password,  op: old password
  userEdit.add("Password").editPassword(async(np,cp,op)=>{
    //logic to confirm passwords and submit the new password
    if (np.value.length>=8 && op.length>8 && np.value===cp.value){
      const res = await api.changePassword(user.userID,op.value,np.value)
      userEdit.showPopover(res.code, res.message)
    }
  },
  (np,cp,op)=>{
    cp.maxLength=0
    np.minLength = op.minLength= 8

    cp.addEventListener("input", ()=>{
      if(cp.value.length === np.value.length && cp.value !== np.value)
        userEdit.showFeedback(9000,'passwords do not match')

      if(cp.value===np.value && np.value.length>=8){
        cp.style.outline = np.style.outline =  '1px solid limegreen'
      }else{
        cp.style.outline = np.style.outline =  'none'
      }
    })
    np.addEventListener("blur",()=>{cp.minLength = cp.maxLength = np.value.length})
  }); 

  document.querySelector("#app").append(userEdit.overlay)
}

function populateCurrentInput(user){
  const updatedFName = document.getElementById('editFName');
  const updatedLName = document.getElementById('editLName');
  const updatedEmail = document.getElementById('editEmail');

  updatedFName.value = user.first_name
  updatedLName.value = user.last_name
  updatedEmail.value = user.email
}

function managerButton(){
  const manageBtn = document.createElement('button');
  manageBtn.classList.add('btn', 'merchant');
  manageBtn.textContent = 'Manage Restaurant';
  manageBtn.addEventListener('click', () => {
    window.location.href = 'restaurantManagement.html';
  });
  return manageBtn;
}
