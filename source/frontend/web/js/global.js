import { createHeader } from './components/header.js';

 import {usersAPI} from "./api_calls/live/user_api.js"
 import {restaurantAPI} from "./api_calls/live/restaurant_api.js"
 import { menusAPI } from "./api_calls/live/menu_api.js";
 import { floorplanAPI } from './api_calls/live/floorplan_api.js';
 import { reservationAPI } from './api_calls/live/reservation_api.js';

//import { mockUsersAPI } from './api_calls/mock/user_api.js';
//import {mockRestaurantAPI,mockMenusAPI}  from './api_calls/mock/restaurant_api.js';

//export const api = { ...mockUsersAPI,...mockRestaurantAPI, ...mockMenusAPI};

 export const api = {...usersAPI, ...restaurantAPI, ...menusAPI, ...floorplanAPI, ...reservationAPI};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});

