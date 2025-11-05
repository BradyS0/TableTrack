import {restaurants,menus} from './mockRestdata.js'
const MOCK = "mockRest"
const MOCK_MENU = 'mockMenu'

function init(){
    if (!sessionStorage.getItem(MOCK)){
      sessionStorage.setItem(MOCK, JSON.stringify(restaurants));
      sessionStorage.setItem(MOCK_MENU, JSON.stringify(menus)); 
    }
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values
//place holder for random rating for sprint1
function getRandomRating(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function getAllData() {
  init();
  return JSON.parse(sessionStorage.getItem(MOCK)) || [];
}

function saveAllData(data) {
  sessionStorage.setItem(MOCK, JSON.stringify(data));
}

function getMenus(){
  if(!sessionStorage.getItem(MOCK_MENU))
    sessionStorage.setItem(MOCK_MENU, JSON.stringify([])); 
  return JSON.parse(sessionStorage.getItem(MOCK_MENU));
}


function saveAllMenus(data) {
  sessionStorage.setItem(MOCK_MENU, JSON.stringify(data));
}


async function getRestaurants() {
  init();
  const rests = JSON.parse(sessionStorage.getItem(MOCK)) || [];

  if (rests.length)
    return {code:200, message:"list of restaurants", restaurants: rests}

  return {code:404, message:"No restaurants found"}
}


const createRestaurant = async (userID, name, tags, address, phone) => {
  init();

  let data = JSON.parse(sessionStorage.getItem(MOCK));

  if (!userID || !name || !address || !phone || !Array.isArray(tags)) {
    return { code: 400, message: "Invalid parameters" };
  }else if (data.find(r=> r.address === address)){
    return { code: 400, message: `Address "${address}" already in use` };
  }

  const newRest = {
    restID: data.length + 1,
    userID,
    name,
    tags,
    rating:getRandomRating(1,5),
    address,
    phone
  };

  data.push(newRest);
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return {code: 201, message: "Restaurant created successfully", restID:newRest.restID};
};



const getRestaurantByOwner = async(userID) => {
  init();

  let data = JSON.parse(sessionStorage.getItem(MOCK));

  const owned = data.find(r => r.userID === userID);

  if (!owned) {
    return { code: 404, message: "No restaurants found for this user" };
  }

  return { code: 200, message: "Restaurants retrieved", restID: owned.restID };
};


const getRestaurantByID = async (restID) => {
  init();
  const data = getAllData();
  const restaurant = data.find(r => r.restID == restID);

  if (!restaurant) {
    return { code: 404, message: "Restaurant not found" };
  }

  // Ensure menu always exists and reflects latest state
  if (!restaurant.menu) restaurant.menu = [];

  return { code: 200, message: "Restaurant found", data: restaurant };
};



const changeRestaurantName = async(restID, userID, name) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!name || name.length < 3) return { code: 400, message: "Invalid name" };

  rest.name = name;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))
  
  return { code: 200, message: "Name updated successfully" };
};


const changeRestaurantAddress = async(restID, userID, address) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!address || address.length < 5 || address.length>120) return { code: 400, message: "Invalid address" };
  if (address && data.find(r=> r.restID != restID && r.address==address)) return {code:400, message:"Address already in use by another restaurant"}

  rest.address = address;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Address updated successfully" };
};


const changeRestaurantPhone = async(restID, userID, phone) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!phone || phone.length < 7) return { code: 400, message: "Invalid phone number" };

  rest.phone = phone;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Phone updated successfully" };
};


const changeRestaurantTags = async(restID, userID, tags) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);
  const tagInfo = Array.isArray(tags) ? 
                  tags.filter(tag=>tag.length>2).join('') : ""
                  
  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (tagInfo.length<3) return { code: 400, message: "Tags must contain some information consisting of atleast 3 characters or more" };

  rest.tags = tags;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Tags updated successfully" };
};

async function getMenuItems(restID) {
  const data = getMenus() || [];
  const menu = data[restID-1]

  if (!menu) return { code: 404, message: "Menu not found" };

  // Always return current menu state
  return { code: 200, data: menu || [] };
}

async function addMenuItem(restID, userID, item) {
  const data = getMenus();
  const menu = data[restID-1] || []

  if (!menu) return { code: 404, message: "Restaurant not found" };
  // if (restaurant.userID !== userID) return { code: 403, message: "Unauthorized" };

  const newItem = { ...item, itemID: Date.now() };
  menu.push(newItem);
  data[restID-1] = menu
  saveAllMenus(data);

  return { code: 200, message: `Item '${item.name}' added successfully!`, data: menu };
}

async function deleteMenuItem(restID, userID, itemID) {
  const data = getAllData();
  const restaurant = data.find(r => r.restID === restID);

  if (!restaurant) return { code: 404, message: "Restaurant not found" };
  // if (restaurant.userID !== userID) return { code: 403, message: "Unauthorized" };

  restaurant.menu = restaurant.menu.filter(i => i.itemID !== parseInt(itemID));
  saveAllData(data);

  return { code: 200, message: `Item #${itemID} deleted successfully!` };
}

export  const mockRestaurantAPI = {
  getRestaurants,
  createRestaurant,
  getRestaurantByID,
  getRestaurantByOwner,
  changeRestaurantName,
  changeRestaurantAddress,
  changeRestaurantPhone,
  changeRestaurantTags,
};

export const mockMenusAPI = {
  addMenuItem,
  getMenuItems,
  deleteMenuItem
}

