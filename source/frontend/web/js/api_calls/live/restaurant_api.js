import { getRandomRating } from "../mock/restaurant_api.js";
const API = "http://localhost:3000/v1/restaurant"

async function getRestaurants() {

  let result = {code:9001, message:"api backend cannot be reached"};
    
    try{
    const req = await fetch(API, {method: 'GET'})

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      const rests = data.restaurants
      console.log(rests)
      rests.forEach( r => r.rating = getRandomRating(2,5) )

      result.restaurants = rests
      result.message = 'request completed'
    }else
      result.message = data.error
    
  }catch(e){
      console.log("ERROR:::",e.message)
    }

    return result;
}



const createRestaurant = async (userID, name, tags, address, phone) => {
  let result = {code:9001, message:"api backend cannot be reached"};
  const newRest = {
    userID,
    name,
    tags,
    address,
    phone
  };

  console.log(newRest)
    
    try{
    const req = await fetch(API, {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newRest)
    })

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.restID =  data.restID
      result.message = 'Restaurant created successfully'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  }

    return result;
};



const getRestaurantByOwner = async(userID) => {
   let result = {code:9001, message:"api backend cannot be reached"};

    try{
    const req = await fetch(`${API}/user/${userID}`, {method: 'GET'})

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.restID =  data.restID
      result.message = 'Restaurant found'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  } 

  return result;
};


const getRestaurantByID = async(restID) => {
  let result = {code:9001, message:"api backend cannot be reached"};

    try{
    const req = await fetch(`${API}/${restID}`, {method: 'GET'})

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      data.rating  = getRandomRating(2,5)
      result.data =  data
      result.message = 'Restaurant found'
    }else
      result.message = data.error
    
  }catch(e){
      console.log("ERROR:::",e.message)
      result = {code:9001, message:"api backend cannot be reached"};
  }

  return result;
};



const changeRestaurantName = async(restID, userID, name) => {
  let result = {code:9001, message:"api backend cannot be reached"};

    try{
    const req = await fetch(`${API}/change/name`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({restID:restID, name:name})}
    )

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.message = 'Restaurant name updated'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  }

  return result;
};


const changeRestaurantAddress = async(restID, userID, address) => {
  let result = {code:9001, message:"api backend cannot be reached"};

    try{
    const req = await fetch(`${API}/change/address`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({restID,address})}
    )

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.message = 'Restaurant address updated'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  }

  return result;
};


const changeRestaurantPhone = async(restID, userID, phone) => {
 let result = {code:9001, message:"api backend cannot be reached"};

    try{
    const req = await fetch(`${API}/change/phone`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({restID:restID, phone:phone})}
    )

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.message = 'Restaurant phone updated'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  }

  return result;
};


const changeRestaurantTags = async(restID, userID, tags) => {
  const tagInfo = Array.isArray(tags) ? 
                  tags.filter(tag=>tag.trim().length>2).join('') : ""
                  
if (tagInfo.length<3) return { code: 400, message: "Tags must contain some information consisting of atleast 3 characters or more" };

let result = {code:9001, message:"api backend cannot be reached"};

    try{
    console.log(tags)
    const req = await fetch(`${API}/change/tags`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({restID, tags})}
    )

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
      result.message = 'Restaurant tags updated'
    }else
      result.message = data.error
    
  }catch{
      console.log("ERROR:::",result)
      result = {code:9001, message:"api backend cannot be reached"};
  }

  return result;
};





export const restaurantAPI = {getRestaurants,createRestaurant,
  getRestaurantByOwner,getRestaurantByID,
    changeRestaurantName,changeRestaurantAddress,
    changeRestaurantPhone,changeRestaurantTags
};