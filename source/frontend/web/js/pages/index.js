import { createNav } from '../components/nav.js';
import { createCard } from '../components/restCard.js';
import { getUserState, setUserState } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const cardGrid = document.createElement('div');
  
  createNav(["home","about","random", "option"])
  
  const restaurants = [
    { restId: 1, name: 'Pizza Yum', hours: '9am - 12am', tags:["italian","cheesy"], logo:null, rating: 5 },
    { restId: 2, name: 'McMmm', hours: '2am - 7pm', tags:["burgers","fastfood", "dairy-free"], logo:null, rating: 4 },
    { restId: 3, name: 'Sushi Go!', hours: '11am - 10pm', tags: ['japanese', 'seafood', 'fresh','vegan', 'organic', 'healthy'], logo: null, rating: 4.5 },
    { restId: 4, name: 'Taco Town', hours: '10am - 11pm', tags: ['mexican', 'spicy', 'street-food'], logo: null, rating: 4.2 },
    { restId: 5, name: 'Green Fork', hours: '8am - 8pm', tags: ['vegan', 'organic', 'healthy'], logo: null, rating: 4.8 },
    { restId: 6, name: 'Curry Corner', hours: '12pm - 10pm', tags: ['indian', 'spicy', 'vegetarian'], logo: null, rating: 4.3 },
    { restId: 7, name: 'The Grill Spot', hours: '11am - 12am', tags: ['barbecue', 'steakhouse', 'meat-lovers'], logo: null, rating: 4.6 },
    { restId: 8, name: 'Noodle Nest', hours: '10am - 9pm', tags: ['chinese', 'noodles', 'comfort-food'], logo: null, rating: 4.1 },
    { restId: 9, name: 'Morning Mug', hours: '6am - 4pm', tags: ['coffee', 'breakfast', 'pastries'], logo: null, rating: 4.9 },
    { restId: 10, name: 'Falafel Factory', hours: '9am - 10pm', tags: ['mediterranean', 'vegan', 'wraps'], logo: null, rating: 4.4 }
  ];
  
  cardGrid.classList.add('card-grid');
  restaurants.forEach(restaurant => {
    cardGrid.appendChild(createCard(restaurant));
  });

  const loginBtn = document.querySelector('.login-btn');
  loginBtn.addEventListener('click', () => {
    setUserState('user', { loggedIn: true, username: 'User' });
    if (getUserState('user').loggedIn) {
      window.location.href = 'profile.html';
    }
  });

  
  app.appendChild(cardGrid);
});