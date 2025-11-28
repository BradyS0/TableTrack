import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/v1/user";

export async function createUser(first, last, email, password) {
  try {
    const res = await fetch(BASE_URL + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: first, last_name: last, email, password })
    });

    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}
