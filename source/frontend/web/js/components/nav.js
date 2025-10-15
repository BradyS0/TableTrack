import { display_popup_msg } from "./popupMsg.js"; 
import {createRegistrationPopup} from './merchantRegister.js'

export function mainNavRoutes(){
  const nav = document.querySelector('nav')
  const userOptions = document.createElement('div')
  userOptions.className = 'user-options'

  const merchant = document.createElement('p')
  merchant.className = 'merchant-note'
  
   //if user logged-in
    //show user-profile option
    const userName = document.createElement('b')
    userName.innerHTML = "First Last"

    const userProfile = document.createElement('p')
    userProfile.innerText = "Profile Settings"
    userProfile.addEventListener('click',goToUserProfile)
    userOptions.append(userName,userProfile)

    //if restaurant owner show restaurant management option - redirect to restaurant management page
    const manage = document.createElement('p')
    manage.innerText = "Manage Restaurant"
    manage.addEventListener('click', goToRestaurantManagement)
    userOptions.append(manage)

    //show a logout button
    const logoutOption = document.createElement('p')
    logoutOption.innerText = 'Logout'
    userOptions.append(logoutOption)

  //else{
  const login = document.createElement('button')
  login.innerText = "Login"
  login.className = 'login-btn btn'
  login.addEventListener('click', goToLogin)
  //userOptions.append(login)
  //}

  const hr  = document.createElement('hr')
  const home = document.createElement('p')
  home.innerText = "Home"
  home.addEventListener("click",goToHome)
  
  const about = document.createElement('p')
  about.innerText = 'About'
  about.addEventListener('click', ()=>{
    display_popup_msg("In Progress", "This page will contain our project vision statement and a little info about project feature 😊.")})

  //Become a merchant
  merchant.innerText = "Become a Merchant"
  merchant.addEventListener("click", ()=>{
    //display_popup_msg("Requirement", 
    // "You need to be logged-in or be a registered user to become a merchant", goToLogin)

    createRegistrationPopup()

  })
      // if user not logged in - redirect to login-page show a popup that user needs to be logged-in to become a merchant
      // if user logged in show become merchantRegistration popup
      // if user already a merchant dont show the option
  
  nav.append(userOptions,hr,home,about,merchant)
}



export function createNav(menuItems = [item1, item2]) {
  const nav = document.querySelector('nav')

  menuItems.forEach(item => {
    const link = document.createElement('p');
    link.innerText = item
    nav.appendChild(link)
  });

  const merchantNote = document.createElement('div');
  merchantNote.classList.add('merchant-note');
  merchantNote.textContent = 'Become a merchant!';

  nav.appendChild(merchantNote)
}

export function toggleLoginButton(){
  document.addEventListener('DOMContentLoaded',()=>{
  const loginButton = document.querySelector(".login-btn")
  
  if (loginButton.style.display == 'none'){
    loginButton.style.display = ''
  }else{
  loginButton.style.display = 'none'
}})
}

export function goToHome(){window.location.href = './';}
function goToLogin(){window.location.href = './login.html';}
function goToUserProfile(){window.open('./userProfile.html', '_self');}
function goToRestaurantManagement(){window.location.href = './restaurantManagement.html'}