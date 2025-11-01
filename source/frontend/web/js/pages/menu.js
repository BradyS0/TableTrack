import { api } from '../global.js';

/**
 * Public-facing menu loader 
 */
export async function loadPublicMenu(restID) {
  const contentSection = document.getElementById('restaurant-content');
  contentSection.innerHTML = "<h2>Menu</h2>";

  const response = await api.getMenuItems(restID);

  if (response.code < 300) {
    const menuList = document.createElement('ul');
    menuList.classList.add('menu-list');

    response.data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <strong>$${item.price.toFixed(2)}</strong>
      `;
      menuList.appendChild(li);
    });

    contentSection.appendChild(menuList);
  } else {
    contentSection.innerHTML = `<p>No menu available for this restaurant.</p>`;
  }
}

/**
 * Owner-facing menu manager 
 */
export async function loadOwnerMenu(owner) {
  const app = document.getElementById('app');
  const response = await api.getMenuItems(owner.restID);

  const section = document.createElement('section');
  section.id = 'owner-menu';
  section.innerHTML = `<h2>Manage Menu</h2>`;

  // existing menu
  if (response.code < 300 && response.data.length) {
    const list = document.createElement('ul');
    list.classList.add('owner-menu-list');

    response.data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <b>${item.name}</b> — $${item.price.toFixed(2)}
        <span>${item.description}</span>
        <button class="btn delete-item" data-id="${item.itemID}">🗑️</button>
      `;
      list.appendChild(li);
    });

    section.appendChild(list);
  } else {
    section.innerHTML += `<p>No menu items found.</p>`;
  }

  // Add new item form
  const form = document.createElement('form');
  form.classList.add('menu-form');
  form.innerHTML = `
    <h3>Add New Menu Item</h3>
    <input type="text" id="newItemName" placeholder="Item Name" required />
    <input type="text" id="newItemDesc" placeholder="Description" required />
    <input type="number" id="newItemPrice" placeholder="Price" step="0.01" required />
    <button type="submit" class="btn">Add</button>
  `;

  // Add item handler
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const item = {
      name: document.getElementById('newItemName').value.trim(),
      description: document.getElementById('newItemDesc').value.trim(),
      price: parseFloat(document.getElementById('newItemPrice').value)
    };

    const res = await api.addMenuItem(owner.restID, owner.userID, item);
    alert(res.message);
    if (res.code < 300) loadOwnerMenu(owner);
  });

  // Delete handler (event delegation)
  section.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-item')) {
      const id = e.target.dataset.id;
      const res = await api.deleteMenuItem(owner.restID, owner.userID, id);
      alert(res.message);
      if (res.code < 300) loadOwnerMenu(owner);
    }
  });

  section.appendChild(form);
  app.appendChild(section);
}
