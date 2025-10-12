export function createHeader() {
  const header = document.createElement('header');
  const nav = document.querySelector('nav');
  const hamburger = document.createElement('h1');
  const overlay = document.getElementById("overlay");
  
  hamburger.id = "hamburger"
  hamburger.innerHTML = "&#9776;"
  hamburger.addEventListener('click',()=>{
    console.log("hamburger!!")
    overlay.classList.add("overlay-active");
    nav.classList.add('nav-active')
  })

  
  header.innerHTML = `
  <image src="../assets/TableTrack-logo.svg" alt="Logo" class="logo"/>
  <h1>Table<span>Track</span></h1>
  <button class="login-btn">Login</button>
  `;

  header.prepend(hamburger)
  return header;
}