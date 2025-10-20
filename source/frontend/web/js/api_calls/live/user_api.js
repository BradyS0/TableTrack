import {users} from './mockUserdata.js'
const MOCK = "mockUsers"

const init = ()=>{
    if (!sessionStorage.getItem(MOCK)){
        sessionStorage.setItem(MOCK,JSON.stringify(users))
    }

}

const createUser = (first_name,last_name, email, password)=>{
    init()
    let users = JSON.parse(sessionStorage.getItem(MOCK))
    let result = { code: 400,
                   message:"Invalid parameters, user was not created"}
    let userCheck = users.filter(user => user.email === email);
    
    if (userCheck || password.length<5){return result}
    
    users[users.length] = {userID:users.length+1, first_name:first_name,
        last_name:last_name, email:email, password:password 
    }
    

    result.code = 201;
    result.message = "User created successfully"
    return result;
};

// const loginUser;

// const changeEmail;
// const changeFirstName;
// const changeLastName;
// const changePassword;


export const mockUsersAPI = {
    createUser
}

