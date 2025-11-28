import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/v1/restaurant";

// GET all restaurants
export async function listRestaurants() {
    try {
      const res = await fetch(BASE_URL);
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  }
  


