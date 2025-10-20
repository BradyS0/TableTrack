import { createHeader } from './components/header.js';
import { getUserState, setUserState } from './utils.js';
import {mockUsersAPI} from './api_calls/mock/user_api.js'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());

  let result = mockUsersAPI.createUser("Arsalan","Siddiqui","arsalan@gmail.com","newPassword1");
  console.log(result)
});