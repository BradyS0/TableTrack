import {restaurants} from './mockRestdata.js'
const MOCK = "mockRest"

function init(){
    if (!sessionStorage.getItem(MOCK)){
        sessionStorage.setItem(MOCK,JSON.stringify(restaurants))
    }
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values
//place holder for random rating for sprint1
function getRandomRating(min, max) {
  return Math.random() * (max - min) + min;
}


function getRestaurants() {
  init();
  const rests = JSON.parse(sessionStorage.getItem(MOCK)) || [];

  if (rests.length)
    return {code:200, message:"list of restaurants", restaurants: rests}

  return {code:404, message:"No restaurants found"}
}



const createRestaurant = (userID, name, tags, address, phone) => {
  init();

  let data = JSON.parse(sessionStorage.getItem(MOCK));

  if (!userID || !name || !address || !phone || !Array.isArray(tags)) {
    return { code: 400, message: "Invalid parameters" };
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

  return {code: 201, message: "Restaurant created successfully"};
};



const getRestaurantByOwner = (userID) => {
  init();

  let data = JSON.parse(sessionStorage.getItem(MOCK));

  const owned = data.find(r => r.userID === userID);

  if (owned.length === 0) {
    return { code: 404, message: "No restaurants found for this user" };
  }

  return { code: 200, message: "Restaurants retrieved", restID: owned.restID };
};


const getRestaurantByID = (restID) => {
  init();

  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID);

  if (!rest) {
    return { code: 404, message: "Restaurant not found" };
  }

  return { code: 200, message: "Restaurant found", data: rest };
};



const changeRestaurantName = (restID, userID, name) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!name || name.length < 3) return { code: 400, message: "Invalid name" };

  rest.name = name;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))
  
  return { code: 200, message: "Name updated successfully" };
};


const changeRestaurantAddress = (restID, userID, address) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!address || address.length < 5) return { code: 400, message: "Invalid address" };

  rest.address = address;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Address updated successfully" };
};


const changeRestaurantPhone = (restID, userID, phone) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!phone || phone.length < 7) return { code: 400, message: "Invalid phone number" };

  rest.phone = phone;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Phone updated successfully" };
};


const changeRestaurantTags = (restID, userID, tags) => {
  let data = JSON.parse(sessionStorage.getItem(MOCK));
  const rest = data.find(r => r.restID === restID && r.userID === userID);

  if (!rest) return { code: 404, message: "Restaurant not found or not owned by user" };
  if (!Array.isArray(tags)) return { code: 400, message: "Tags must be an array" };

  rest.tags = tags;
  data[restID-1] = rest
  sessionStorage.setItem(MOCK,JSON.stringify(data))

  return { code: 200, message: "Tags updated successfully" };
};





export const mockRestaurantAPI = {getRestaurants,getRestaurantByOwner,getRestaurantByID,
    changeRestaurantName,changeRestaurantAddress,
    changeRestaurantPhone,changeRestaurantTags
};