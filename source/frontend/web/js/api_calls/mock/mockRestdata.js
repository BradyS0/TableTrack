export const restaurants = [
  { 
    restID: 1, 
    name: 'Pizza Yum', 
    hours: '9am - 12am', 
    tags: ['italian', 'cheesy'], 
    logo: null, 
    rating: 5,
    address: '123 Main St, Toronto, Canada'
  },
  { 
    restID: 2, 
    name: 'McMmm', 
    hours: '2am - 7pm', 
    tags: ['burgers', 'fastfood', 'dairy-free'], 
    logo: null, 
    rating: 4,
    address: '456 King St, Vancouver, Canada'
  },
  { 
    restID: 3, 
    name: 'Sushi Go!', 
    hours: '11am - 10pm', 
    tags: ['japanese', 'seafood', 'fresh', 'vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.5,
    address: '789 Queen St, Montreal, Canada'
  },
  { 
    restID: 4, 
    name: 'Taco Town', 
    hours: '10am - 11pm', 
    tags: ['mexican', 'spicy', 'street-food'], 
    logo: null, 
    rating: 4.2,
    address: '321 Elm St, Calgary, Canada'
  },
  { 
    restID: 5, 
    name: 'Green Fork', 
    hours: '8am - 8pm', 
    tags: ['vegan', 'organic', 'healthy'], 
    logo: null, 
    rating: 4.8,
    address: '654 Maple Ave, Ottawa, Canada'
  },
  { 
    restID: 6, 
    name: 'Curry Corner', 
    hours: '12pm - 10pm', 
    tags: ['indian', 'spicy', 'vegetarian'], 
    logo: null, 
    rating: 4.3,
    address: '987 Bloor St, Edmonton, Canada'
  },
  { 
    restID: 7, 
    name: 'The Grill Spot', 
    hours: '11am - 12am', 
    tags: ['barbecue', 'steakhouse', 'meat-lovers'], 
    logo: null, 
    rating: 4.6,
    address: '111 Front St, Winnipeg, Canada'
  },
  { 
    restID: 8, 
    name: 'Noodle Nest', 
    hours: '10am - 9pm', 
    tags: ['chinese', 'noodles', 'comfort-food'], 
    logo: null, 
    rating: 4.1,
    address: '222 Bay St, Halifax, Canada'
  },
  { 
    restID: 9, 
    name: 'Morning Mug', 
    hours: '6am - 4pm', 
    tags: ['coffee', 'breakfast', 'pastries'], 
    logo: null, 
    rating: 4.9,
    address: '333 Yonge St, Victoria, Canada'
  },
  { 
    restID: 10, 
    name: 'Falafel Factory', 
    hours: '9am - 10pm', 
    tags: ['mediterranean', 'vegan', 'wraps'], 
    logo: null, 
    rating: 4.4,
    address: '444 Granville St, Quebec City, Canada'
  }
];



export function restById (id){
    return restaurants[id-1];
}

const menus = {
  1: [
    { itemID: 1, name: "Margherita Pizza", price: 14.99, description: "Classic with basil and mozzarella", category: "Pizza" },
    { itemID: 2, name: "Spaghetti Carbonara", price: 12.50, description: "Creamy pasta", category: "Pasta" },
    { itemID: 3, name: "Tiramisu", price: 7.50, description: "Dessert", category: "Desserts" },
    { itemID: 4, name: "Garlic Bread", price: 4.99, description: "Toasted side dish", category: "Sides" }
  ],
  2: [],
  3: [],
  4: []
};


export async function getMenuItems(restID) {
  const data = menus[restID] || [];
  return { code: 200, data };
}

export async function addMenuItem(restID, userID, item) {
  const newItem = { ...item, itemID: Date.now() };
  if (!menus[restID]) menus[restID] = [];
  menus[restID].push(newItem);
  console.log(`Added to restaurant ${restID}:`, newItem);
  return { code: 200, message: `Item '${item.name}' added successfully!` };
}

export async function deleteMenuItem(restID, userID, itemID) {
  const id = parseInt(itemID);
  if (menus[restID]) {
    menus[restID] = menus[restID].filter(i => i.itemID !== id);
    console.log(`Deleted item ID ${id} from restaurant ${restID}`);
  }
  return { code: 200, message: `Item #${id} deleted successfully!` };
}