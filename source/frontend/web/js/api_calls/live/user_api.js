const API = "http://localhost:3000/v1/user"

const createUser = async (first_name,last_name, email, password)=>{
    const result = {code:9001, message:"api backend cannot be reached"};
    
    try{
    const user = {first_name,last_name,email,password}
    const req = await fetch(API, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

    result.code = req.status
    
    if(result.code<300){
      result.message = "User created successfully"
    }else if(req){
      const data = await req.json();
      result.message = data.error
    }
    console.log("RESULT:::",result)
  }catch{
      console.log("ERROR:::",result)
    }

    
    return result;
};



const loginUser = async (email, password) => {
    const result = {code:9001, message:"api backend cannot be reached"};
    const user = {email,password}
    
    try{
    const req = await fetch(`${API}/login/`,{
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

    result.code = req.status
    console.log(result.code)
    const data = await req.json()
    
    if(result.code<300){
      result.user = data.user;
      result.message = data.message
    }else{
      result.message = data.error
    }
    console.log(result)
  }catch{
    console.log("ERROR:::",result)
  }
    
  return result;
};



const changeEmail = async (userID, email) => {
  const result = {code:9001, message:"api backend cannot be reached"};
  const user = {userID,email}

  try{
  const req = await fetch(`${API}/change/email`,{
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

  
  result.code = req.status
  const data = await req.json()
    
    if(result.code<300){
      result.message = data.message
    }else{
      result.message = data.error
    }

    console.log(result)
  }catch{
    console.log("ERROR:::",result)
  }

    return result;
};



const changeFirstName = async(userID, first_name) => {
  const result = {code:9001, message:"api backend cannot be reached"};
  
  try{
  const user = {userID,first_name}
  const req = await fetch(`${API}/change/firstname`,{
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

  
  result.code = req.status
  const data = await req.json()
    
    if(result.code<300){
      result.message = data.message
    }else{
      result.message = data.error
    }

    console.log(result)
  }catch{
    console.log("ERROR:::",result)
  }

    return result;
};


const changeLastName = async(userID, last_name) => {
  const result = {code:9001, message:"api backend cannot be reached"};
  
  try{
  const user = {userID,last_name}
  const req = await fetch(`${API}/change/lastname`,{
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

  
  result.code = req.status
  const data = await req.json()
    
    if(result.code<300){
      result.message = data.message
    }else{
      result.message = data.error
    }

    console.log(result)
  }catch{
    console.log("ERROR:::",result)
  }

    return result;
};


const changePassword = async(userID, old_password, new_password) => {
  const result = {code:9001, message:"api backend cannot be reached"};
  
  try{ 
  const user = {userID,old_password,new_password}
  const req = await fetch(`${API}/change/password`,{
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

  
  result.code = req.status
  const data = await req.json()
    
    if(result.code<300){
      result.message = data.message
    }else{
      result.message = data.message
    }

    console.log(result)
  }catch{
    console.log("ERROR:::",result)
  }

    return result;
};

const deleteUser = async(userID) =>{
  const result = {code:9001, message:"api backend cannot be reached"};

  try{
  const req = await fetch(`${API}/${userID}`,{
      method: 'Delete', 
    });

  
  result.code = req.status
  
  if(result.code<300){
    result.message = "User successfully deleted."
  }else{
      const data = await req.json()
      result.message = data.error
  }
}catch{
  console.log("ERROR:::",result)
}

  return result;
}


export const usersAPI = {
    createUser, loginUser, changeEmail,
    changeFirstName, changeLastName, changePassword,
    deleteUser
}



//createUser("Daa","Sidddd","test215@email.com","NewPassword1!")

//loginUser("arsala2@example.com","NewPassword23!")

//changePassword(2,"NewPassword23!","NewPassword26!")

