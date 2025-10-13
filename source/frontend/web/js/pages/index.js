import { createNav } from '../components/nav.js';
import { createCard } from '../components/restCard.js';
import { getUserState, setUserState } from '../utils.js';
import { restaurants } from '../tempRestdata.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const cardGrid = document.createElement('div');
  
  createNav(["home","about","random", "option"])
  
 
  
  cardGrid.classList.add('card-grid');
  restaurants.forEach(restaurant => {
    cardGrid.appendChild(createCard(restaurant));
  });

  const loginBtn = document.querySelector('.login-btn');
  loginBtn.addEventListener('click', () => {
      console.log("loading login.html")
      window.location.href = './login.html';
  });

  
  app.appendChild(cardGrid);
});