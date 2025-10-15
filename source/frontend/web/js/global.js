import { createHeader } from './components/header.js';
import { getUserState, setUserState } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.appendChild(createHeader());
});