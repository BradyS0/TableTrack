import { createHeader } from './components/header.js';

//import {usersAPI} from "./api_calls/live/user_api.js"
//import {restaurantAPI} from "./api_calls/live/restaurant_api.js"

import { mockRestaurantAPI } from './api_calls/mock/restaurant_api.js';

export const api = { ...mockRestaurantAPI };

//export const api = {...usersAPI, ...mockRestaurantAPI};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});

