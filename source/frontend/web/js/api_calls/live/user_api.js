import axios from 'axios';
const API = "http://localhost:3000/v1/user"

const createUser = async (first_name,last_name, email, password)=>{

    const result = {code:500};
    const user = {first_name,last_name,email,password}

    const req = await axios.post(`${API}/`,user)

    result.code = req.status

    if(result.code<300){
        result.message = "User created successfully"
    }else{
        const data = await req.json();
        result.message = data.error
    }

    console.log(result)
    
    
    return result;
};


const loginUser = async (email, password) => {
   const result = {code:500};
    const user = {email,password}
    
    const req = axios.post(`${API}/login/`,user)

    result.code = req.status
    const data = await req.json();

    if(result.code<300){
        result.message = "User login successfull";
        //result.user = data.user;
    }else{
        result.message = data.error
    }

    console.log(result)
  
  return result;
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

const deleteUser = async(userID) =>{

}

export const usersAPI = {
    createUser, loginUser, changeEmail,
    changeFirstName, changeLastName, changePassword,
    deleteUser
}




//createUser("Daa","Sidddd","test256@email.com","NewPassword1!")
//loginUser("test25@email.com","NewPassword1!")


