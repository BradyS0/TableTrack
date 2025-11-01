import { createHeader } from './components/header.js';
import { getMenuItems, addMenuItem, deleteMenuItem } from './api_calls/mock/mockRestdata.js';

//import {usersAPI} from "./api_calls/live/user_api.js"
//import {restaurantAPI} from "./api_calls/live/restaurant_api.js"

import {mockUsersAPI} from './api_calls/mock/user_api.js'
import {mockRestaurantAPI} from './api_calls/mock/restaurant_api.js'
export const api = {...mockUsersAPI, ...mockRestaurantAPI, getMenuItems, addMenuItem, deleteMenuItem};

//export const api = {...usersAPI, ...mockRestaurantAPI};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});

