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

   overlay.addEventListener('click', ()=>{
     nav.classList.remove('nav-active')
     overlay.classList.remove('overlay-active')
})

  
  header.innerHTML = `
  <image src="../assets/TableTrack-logo.svg" alt="Logo" class="logo"/>
  <h1>Table<span>Track</span></h1>
  <button class="login-btn">Login</button>
  `;

  header.prepend(hamburger)

  header.children[1].addEventListener('click', goToHome);
  header.children[2].addEventListener('click', goToHome);
  return header;
}

function goToHome(){window.location.href = './';}