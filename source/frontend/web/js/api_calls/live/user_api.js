const API_URL = __API_URL__;
const API = `${API_URL}/v1/user`;
import loader from "./loader.js";

const createUser = async (first_name, last_name, email, password) => {
  loader.showLoading();
  console.log("Creating user at api:", API);
  const result = {
    code: 9001,
    message: "api backend cannot be reached at " + API,
  };
  try {
    const user = { first_name, last_name, email, password };
    const req = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;

    if (result.code < 300) {
      result.message = "User created successfully";
    } else if (req) {
      const data = await req.json();
      result.message = data.error;
    }
    console.log("RESULT:::", result);
  } catch {
    console.log("ERROR:::", result);
  }

  loader.hideLoading();
  return result;
};

const loginUser = async (email, password) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  const user = { email, password };
  loader.showLoading();

  try {
    const req = await fetch(`${API}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;
    console.log(result.code);
    const data = await req.json();

    if (result.code < 300) {
      result.user = data.user;
      result.message = data.message;
    } else {
      result.message = data.error;
    }
    console.log(result);
  } catch {
    console.log("ERROR:::", result);
  }
  loader.hideLoading();
  return result;
};

const changeEmail = async (userID, email) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  const user = { userID, email };
  loader.showLoading();

  try {
    const req = await fetch(`${API}/change/email`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;
    const data = await req.json();

    if (result.code < 300) {
      result.message = data.message;
    } else {
      result.message = data.error;
    }

    console.log(result);
  } catch {
    console.log("ERROR:::", result);
  }

  loader.hideLoading();
  return result;
};

const changeFirstName = async (userID, first_name) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  loader.showLoading();
  try {
    const user = { userID, first_name };
    const req = await fetch(`${API}/change/firstname`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;
    const data = await req.json();

    if (result.code < 300) {
      result.message = data.message;
    } else {
      result.message = data.error;
    }

    console.log(result);
  } catch {
    console.log("ERROR:::", result);
  }
  loader.hideLoading();
  return result;
};

const changeLastName = async (userID, last_name) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  loader.showLoading();
  try {
    const user = { userID, last_name };
    const req = await fetch(`${API}/change/lastname`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;
    const data = await req.json();

    if (result.code < 300) {
      result.message = data.message;
    } else {
      result.message = data.error;
    }

    console.log(result);
  } catch {
    console.log("ERROR:::", result);
  }
  loader.hideLoading();
  return result;
};

const changePassword = async (userID, old_password, new_password) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  loader.showLoading();
  try {
    const user = { userID, old_password, new_password };
    const req = await fetch(`${API}/change/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    result.code = req.status;
    const data = await req.json();

    if (result.code < 300) {
      result.message = data.message;
    } else {
      result.message = data.message;
    }

    console.log(result);
  } catch {
    console.log("ERROR:::", result);
  }
  loader.hideLoading();
  return result;
};

const deleteUser = async (userID) => {
  const result = { code: 9001, message: "api backend cannot be reached" };
  loader.showLoading();
  try {
    const req = await fetch(`${API}/${userID}`, {
      method: "Delete",
    });

    result.code = req.status;

    if (result.code < 300) {
      result.message = "User successfully deleted.";
    } else {
      const data = await req.json();
      result.message = data.error;
    }
  } catch {
    console.log("ERROR:::", result);
  }
  loader.hideLoading();
  return result;
};

export const usersAPI = {
  createUser,
  loginUser,
  changeEmail,
  changeFirstName,
  changeLastName,
  changePassword,
  deleteUser,
};

//createUser("Daa","Sidddd","test215@email.com","NewPassword1!")

//loginUser("arsala2@example.com","NewPassword23!")

//changePassword(2,"NewPassword23!","NewPassword26!")
