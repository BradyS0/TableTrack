import { createHeader } from './components/header.js';

// import {usersAPI} from "./api_calls/live/user_api.js"
// import {restaurantAPI} from "./api_calls/live/restaurant_api.js"

import { mockUsersAPI } from './api_calls/mock/user_api.js';
import {mockRestaurantAPI,mockMenusAPI}  from './api_calls/mock/restaurant_api.js';

export const api = { ...mockUsersAPI,...mockRestaurantAPI, ...mockMenusAPI};

// export const api = {...usersAPI, ...restaurantAPI, ...mockMenusAPI};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});

