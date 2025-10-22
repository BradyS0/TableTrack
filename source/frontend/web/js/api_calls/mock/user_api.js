import {users} from './mockUserdata.js'
const MOCK = "mockUsers"

function init(){
    if (!sessionStorage.getItem(MOCK)){
        sessionStorage.setItem(MOCK,JSON.stringify(users))
    }

}

const getUsers = ()=>{
  return JSON.parse(sessionStorage.getItem(MOCK))
}

const saveUsers = (this_users)=>{
  sessionStorage.setItem(MOCK,JSON.stringify(this_users))
}

const createUser = async (first_name,last_name, email, password)=>{
    init()
    let users = getUsers()
    let result = { code: 400,
                   message:"Invalid parameters, user was not created"}
    let userCheck = users.find(user => user.email === email);

    console.log(userCheck)
    
    if (userCheck || password.length<5){return result}
    
    users[users.length] = {userID:users.length+1, first_name:first_name,
        last_name:last_name, email:email, password:password 
    }

   saveUsers(users)
    result.code = 201;
    result.message = "User created successfully"
    return result;
};


const loginUser = async (email, password) => {
  init()
  let users = JSON.parse(sessionStorage.getItem(MOCK));
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { code: 401, message: "Invalid email or password" };
  }

  return { code: 200, message: "Login successful", user:user };
};



const changeEmail = async (userID, newEmail) => {
  let users = getUsers();
  let user = users.find(u => u.userID === userID);

  if (!user) return { code: 404, message: "User not found" };

  // Check if email is already taken
  let exists = users.find(u => u.email === newEmail);
  if (exists) return { code: 400, message: "Email already in use" };

  user.email = newEmail;
  saveUsers(users);

  return { code: 200, message: "Email updated successfully" };
};



const changeFirstName = async(userID, newFirstName) => {
  let users = getUsers();
  let user = users.find(u => u.userID === userID);

  if (!user) return { code: 404, message: "User not found" };
  if (!newFirstName || newFirstName.length < 2)
    return { code: 400, message: "Invalid first name" };

  user.first_name = newFirstName;
  saveUsers(users);

  return { code: 200, message: "First name updated successfully" };
};


const changeLastName = async(userID, newLastName) => {
  let users = getUsers();
  let user = users.find(u => u.userID === userID);

  if (!user) return { code: 404, message: "User not found" };
  if (!newLastName || newLastName.length < 2)
    return { code: 400, message: "Invalid last name" };

  user.last_name = newLastName;
  saveUsers(users);

  return { code: 200, message: "Last name updated successfully" };
};


const changePassword = async(userID, old_password, new_password) => {
  let users = getUsers();
  let user = users.find(u => u.userID === userID);

  if (!user) return { code: 404, message: "User not found" };
  if (user.password !== old_password)
    return { code: 401, message: "Old password is incorrect" };
  if (new_password.length < 5)
    return { code: 400, message: "New password must be at least 5 characters" };

  user.password = new_password;
  saveUsers(users);

  return { code: 200, message: "Password changed successfully" };
};


export const mockUsersAPI = {
    createUser, loginUser, changeEmail,
    changeFirstName, changeLastName, changePassword
}

