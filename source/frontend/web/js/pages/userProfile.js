import { clearUserState, getUserState, setUserState } from '../utils.js';
import { createRegistrationPopup } from '../components/merchantRegister.js';
import { editPopup } from '../components/edit-popup.js';
import { api } from '../global.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const user = getUserState('user') || { first_name: 'Guest', last_name:'User', email: 'guest@example.com' };
  document.querySelector('.username').textContent = `${user.first_name} ${user.last_name}`;
  document.querySelector('.email').textContent = user.email || 'Not provided';

  // Get elements
  const editBtn = document.getElementById('editProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const merchantBtn = document.getElementById('merchantBtn');

  if(user.restID)
    merchantBtn.replaceWith(managerButton())

  // Open popup
  editBtn.addEventListener('click', () => {
    createEditProfilePopup(user)
  });


  // Open merchant registration popup
  merchantBtn.addEventListener('click', createRegistrationPopup)


  // Logout functionality
  logoutBtn.addEventListener('click',clearUserState);
});

function createEditProfilePopup(user){
  const userEdit = editPopup("User Profile")

  //creating first name edit field
  userEdit.add("First Name").editText(user.first_name, async(nameInput)=>{
    const res = await api.changeFirstName(user.userID,nameInput.value)
    userEdit.showFeedback(res.code, res.message)
    if(res.code < 300){
      user.first_name = nameInput.value
      setUserState(user)
      document.querySelector('.username').textContent = `${user.first_name} ${user.last_name}`;
    }
  })
  
  //creating last name edit field
  userEdit.add("Last Name").editText(user.last_name, async(nameInput)=>{
    const res = await api.changeLastName(user.userID,nameInput.value)
    userEdit.showFeedback(res.code, res.message)
    if(res.code < 300){
      user.last_name = nameInput.value
      setUserState(user)
      document.querySelector('.username').textContent = `${user.first_name} ${user.last_name}`;
    }
  })
  
  //creating user email edit field
  userEdit.add("Email").editText(user.email,async(emailInput)=>{
    const res = await api.changeEmail(user.userID,emailInput.value)
    userEdit.showFeedback(res.code, res.message)
    if(res.code < 300){
      user.email = emailInput.value
      setUserState(user)
      document.querySelector('.email').textContent = user.email
    }
  },(emailInput)=>{
    emailInput.type = 'email'
    emailInput.minLength = 8
  })
  

  //setting up edit password np:new password,  cp:confirm new password,  op: old password
  userEdit.add("Password").editPassword(async(np,cp,op)=>{
    //logic to confirm passwords and submit the new password
    if (np.value.length>=8 && op.value.length>8 && np.value===cp.value){
      const res = await api.changePassword(user.userID,op.value,np.value)
      userEdit.showFeedback(res.code, res.message)
      np.value = cp.value = op.value = ''
    }
  }); 

  //adding the popup to the page
  document.querySelector("#app").append(userEdit.overlay)
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
