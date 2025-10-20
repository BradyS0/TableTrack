import { createHeader } from './components/header.js';
import { getUserState, setUserState } from './utils.js';
import {mockUsersAPI} from './api_calls/mock/user_api.js'
import {mockRestaurantAPI} from './api_calls/mock/restaurant_api.js'

//import {userAPI} from "./api_calls/live/user_api.js"

export const api = {...mockUsersAPI, ...mockRestaurantAPI};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});