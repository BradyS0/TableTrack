import { createCard } from '../components/restCard.js';
import { getUserState, setUserState } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const cardGrid = document.createElement('div');
  cardGrid.classList.add('card-grid');

  const restaurants = [
    { name: 'Pizza Yum', hours: '9am - 12am', rating: 5 },
    { name: 'McMmm', hours: '2am - 7pm', rating: 4 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
    { name: '', hours: '', rating: 0 },
  ];

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

  const merchantNote = document.createElement('div');
  merchantNote.classList.add('merchant-note');
  merchantNote.textContent = 'Become a merchant!';
  app.appendChild(cardGrid);
  app.appendChild(merchantNote);
});