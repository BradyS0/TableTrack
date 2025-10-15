export function mainNavRoutes(){
   //if user logged-in
    //show user-profile option
    //show restaurant management option - redirect to restaurant management page
    //show a logout button

  //else show a signin button

  //------ hr ---------
  //Home
  //About - working in progress popup
  //Become a merchant
      // if user not logged in - redirect to login-page show a popup that user needs to be logged-in to become a merchant
      // if user logged in show become merchantRegistration popup
      // if user already a merchant dont show the option

  return null;
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