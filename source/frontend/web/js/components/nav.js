export function mainNavRoutes(){

}

export function createNav(menuItems = [item1, item2]) {
  const nav = document.querySelector('nav')
  const nav_close = document.getElementById("overlay");

  nav_close.addEventListener('click', ()=>{
     nav.classList.remove('nav-active')
     nav_close.classList.remove('overlay-active')
})

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