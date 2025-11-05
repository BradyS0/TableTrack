import { createCard } from '../components/restCard.js';
import { display_popup_msg } from '../components/popupMsg.js';
import { restaurantSearchByNameTags } from '../logic/aggregate.js';
import { createSearchBox } from '../components/search-box.js';
import { api } from '../global.js'

document.addEventListener('DOMContentLoaded', setupBody);

async function setupBody() {
  const app = document.getElementById('app');
  const container = document.createElement('div')
  container.id = 'container'
  const search = createSearchBox()

  app.append(search, container)

  const response = await api.getRestaurants();
  if (response.code < 300) {
    const restaurants = response.restaurants;
    const mainContainer = await populateRestaurants(restaurants);
    container.appendChild(mainContainer);
    implementSearch(search, restaurants, mainContainer);
  } else {
    display_popup_msg(`Error ${response.code}`, response.message)
  }
}


async function populateRestaurants(restaurants) {
  const cardGrid = document.createElement('div');
  cardGrid.classList.add('card-grid');

  if (restaurants.length) {
    restaurants.forEach(restaurant => {
      cardGrid.appendChild(createCard(restaurant));
    });
  } else {
    cardGrid.innerText = 'No Restaurants found'
  }

  return cardGrid;
}


function implementSearch(search,restaurants,mainContainer){
  search.search.placeholder = 'Search by Restaurant names or tag'
  let restContainer = mainContainer
  search.search.addEventListener('input', async () => {
      if (search.search.value.length >= 2) {
        const searchedRes = restaurantSearchByNameTags(search.search.value, restaurants);
        const newContainer = await populateRestaurants(searchedRes)
        restContainer.replaceWith(newContainer)
        restContainer = newContainer
      } else {
        restContainer.replaceWith(mainContainer)
        restContainer = mainContainer
      }

    })

    //potentially do a backend search when search button or enter is pressed
}
