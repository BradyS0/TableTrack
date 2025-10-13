export function mainNavRoutes(){
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