import {createRegistrationPopup} from './merchantRegister.js'
import { getUserState, clearUserState } from '../utils.js';
import { display_popup_msg } from "./popupMsg.js"; 

export async function mainNavRoutes(){
  const user = getUserState() 
  const nav = document.querySelector('nav')
  
  const merchant = document.createElement('p')
  merchant.className = 'merchant-note'
  merchant.innerText = "Become a Merchant"
  
  const userOptions = await createUserOptions()

  const hr  = document.createElement('hr')
  const home = document.createElement('p')
  home.innerText = "Home"
  home.addEventListener("click",goToHome)
  
  const about = document.createElement('p')
  about.innerText = 'About'
  about.addEventListener('click', ()=>{
    display_popup_msg("In Progress", "This page will contain our project vision statement and a little info about project features 😊.")})

  //Become a merchant
  if(user && user.restID) merchant.style.display='none'    
  merchant.addEventListener("click",
        createRegistrationPopup)

  nav.append(userOptions,hr,home,about,merchant)
}


async function createUserOptions(){
  const userOptions = document.createElement('div')
  userOptions.className = 'user-options'
  
  const user = getUserState();
  
  if(user){    
    const userName = document.createElement('b')
    userName.innerHTML = `${user.first_name} ${user.last_name}`

    const userProfile = document.createElement('p')
    userProfile.innerText = "Profile Settings"
    userProfile.addEventListener('click',goToUserProfile)
    userOptions.append(userName,userProfile)

    if(user.restID){
    const manage = document.createElement('p')
    manage.innerText = "Manage Restaurant"
    manage.addEventListener('click', goToRestaurantManagement)
    userOptions.append(manage)
    }

    //show a logout button
    const logoutOption = document.createElement('button')
    logoutOption.className = 'login-btn btn'
    logoutOption.innerText = 'Logout'
    userOptions.append(logoutOption)
    logoutOption.addEventListener('click', clearUserState)
  
  }else{
    const login = document.createElement('button')
    login.innerText = "Login"
    login.className = 'login-btn btn'
    login.addEventListener('click', goToLogin)
    userOptions.append(login)
  }

  return userOptions;
}


export function createNav(menuItems = ['item1', 'item2']) {
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


export function goToHome(){window.location.href = './';}
export function goToLogin(){window.location.href = './login.html';}
function goToUserProfile(){window.open('./userProfile.html', '_self');}
function goToRestaurantManagement(){window.location.href = './restaurantManagement.html'}