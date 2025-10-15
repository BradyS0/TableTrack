import { createNav } from '../components/nav.js';
import { createCard } from '../components/restCard.js';
import { getUserState, setUserState } from '../utils.js';
import { restaurants } from '../tempRestdata.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const cardGrid = document.createElement('div');
  
  
  cardGrid.classList.add('card-grid');
  restaurants.forEach(restaurant => {
    cardGrid.appendChild(createCard(restaurant));
  });
  
  app.appendChild(cardGrid);
});