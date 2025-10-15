import { display_popup_msg } from "./popupMsg.js"; 

export function mainNavRoutes(){
  const nav = document.querySelector('nav')
  const userOptions = document.createElement('div')
   //if user logged-in
    //show user-profile option
    //show restaurant management option - redirect to restaurant management page
    //show a logout button

  //else{
  const login = document.createElement('button')
  login.innerText = "Login"
  login.className = 'login-btn btn'
  login.addEventListener('click', goToLogin)
  userOptions.append(login)
  //}

  const hr  = document.createElement('hr')
  const home = document.createElement('p')
  home.innerText = "Home"
  home.addEventListener("click",goToHome)
  
  const about = document.createElement('about')
  about.innerText = 'About'
  about.addEventListener('click', ()=>{
    display_popup_msg("In Progress", "This page will contain our project vision statement and a little info about project feature 😊.")})

  //Become a merchant
      // if user not logged in - redirect to login-page show a popup that user needs to be logged-in to become a merchant
      // if user logged in show become merchantRegistration popup
      // if user already a merchant dont show the option
  
  nav.append(userOptions,hr,home,about)
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

function goToLogin(){
  console.log("call made to login")
  window.location.herf = "./login.html"}