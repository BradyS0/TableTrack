import { api } from '../global.js';

/* ============================================================
   PUBLIC-FACING MENU
   ============================================================ */
export async function loadPublicMenu(restID) {
  const contentSection = document.getElementById('restaurant-content');
  contentSection.innerHTML = "<h2>Menu</h2>";

  const response = await api.getMenuItems(restID);

  if (response.code < 300) {
    const items = response.data;
    const grouped = {};

    // Group items by category
    items.forEach(item => {
      const cat = item.category && item.category.trim() ? item.category : "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    Object.entries(grouped).forEach(([category, items]) => {
      const section = document.createElement('div');
      section.classList.add('menu-category');

      const header = document.createElement('h3');
      header.textContent = category;
      section.appendChild(header);

      const list = document.createElement('ul');
      list.classList.add('menu-list');

      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <strong>$${item.price.toFixed(2)}</strong>
        `;
        list.appendChild(li);
      });

      section.appendChild(list);
      contentSection.appendChild(section);
    });
  } else {
    contentSection.innerHTML = `<p>Menu not available.</p>`;
  }
}

/* ============================================================
   OWNER-FACING MENU MANAGER
   ============================================================ */
export async function loadOwnerMenu(owner) {
  const app = document.getElementById('restaurant-content') || document.getElementById('app');

  // Clear any existing section before rendering
  const existingSection = document.getElementById('owner-menu');
  if (existingSection) existingSection.remove();

  const section = document.createElement('section');
  section.id = 'owner-menu';
  section.innerHTML = `<h2>Manage Menu</h2>`;

  const response = await api.getMenuItems(owner.restID);

  const list = document.createElement('ul');
  list.classList.add('owner-menu-list');

  if (response.code < 300 && response.data.length) {
    const items = response.data;
    const grouped = {};

    // Group by category
    items.forEach(item => {
      const cat = item.category && item.category.trim() ? item.category : "Miscellaneous";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    Object.entries(grouped).forEach(([category, items]) => {
      const catHeader = document.createElement('h3');
      catHeader.textContent = category;
      catHeader.classList.add('menu-category-header');
      list.appendChild(catHeader);

      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <b>${item.name}</b> — $${item.price.toFixed(2)}
          <span>${item.description}</span>
          <button class="btn delete-item" data-id="${item.itemID}">Delete</button>
        `;
        list.appendChild(li);
      });
    });
  } else {
    const noItems = document.createElement('p');
    noItems.textContent = "No menu items found.";
    section.appendChild(noItems);
  }

  section.appendChild(list);

  // Add New Item Form
  const form = document.createElement('form');
  form.classList.add('menu-form');
  form.innerHTML = `
    <h3>Add New Menu Item</h3>
    <input type="text" id="newItemName" placeholder="Item Name" required />
    <input type="text" id="newItemDesc" placeholder="Description" required />
    <input type="number" id="newItemPrice" placeholder="Price" step="0.01" required />
    <input type="text" id="newItemCategory" placeholder="Category (optional)" />
    <button type="submit" class="btn">Add</button>
  `;

  // Add item handler
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const item = {
      name: document.getElementById('newItemName').value.trim(),
      description: document.getElementById('newItemDesc').value.trim(),
      price: parseFloat(document.getElementById('newItemPrice').value),
      category: document.getElementById('newItemCategory').value.trim() || "Miscellaneous"
    };

    if (!item.name || !item.description || isNaN(item.price)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const res = await api.addMenuItem(owner.restID, owner.userID, item);
    alert(res.message);

    if (res.code < 300) {
      await loadOwnerMenu(owner); // Re-render with updated data
    }
  });

  // Delete item handler
  section.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-item')) {
      const id = e.target.dataset.id;
      const res = await api.deleteMenuItem(owner.restID, owner.userID, id);
      alert(res.message);

      if (res.code < 300) {
        await loadOwnerMenu(owner); // Refresh after deletion
      }
    }
  });

  section.appendChild(form);
  app.appendChild(section);
}
