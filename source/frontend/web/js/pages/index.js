import { createCard } from '../components/restCard.js';
import { display_popup_msg } from '../components/popupMsg.js';
import { api } from '../global.js'

document.addEventListener('DOMContentLoaded', populateRestaurants);


async function populateRestaurants(){
  const app = document.getElementById('app');
  const cardGrid = document.createElement('div');
  cardGrid.classList.add('card-grid');

  const response = await api.getRestaurants();
  if (response.code<300){
    const restaurants = response.restaurants;
    restaurants.forEach(restaurant => {
      cardGrid.appendChild(createCard(restaurant));
    });
    app.appendChild(cardGrid);
   }else{
    display_popup_msg(`Error ${response.code}`, response.message)
   }
}