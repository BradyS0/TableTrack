import { setUserState} from '../utils.js';
import {api} from '../global.js'
import { passValidator } from '../logic/format-utils.js'; 

const openBtn = document.getElementById("openSignup");
const closeBtn = document.getElementById("closeSignup");
const popup = document.getElementById("signupPopup");


// Toggle popup visibility
openBtn.addEventListener("click", () => popup.classList.remove("hidden"));
closeBtn.addEventListener("click", () => popup.classList.add("hidden"));

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;


  const res = await api.loginUser(email,password);
  console.log(res)
  if (res.code <300){
    const res2 = await api.getRestaurantByOwner(res.user.userID) //call made to check if the user is a restaurant owner
    if(res2.code===200)
      res.user.restID = res2.restID
    setUserState(res.user)
    window.location.href = "./";  //change this
  }else{
    alert(res.message || "Login failed")
  }
});

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }


  const res = await api.createUser(firstName,lastName,email,password)
  if (res.code<300){
      alert("Account created! You can now log in.");
      popup.classList.add("hidden");
  } else {
    alert(res.message || "Signup failed");
  }   

});


document.addEventListener("DOMContentLoaded",()=>{
    const password = document.getElementById("signupPassword");
    const confirm = document.getElementById("confirmPassword");

    verifyPass(password,confirm)
})


function verifyPass(pass,confirm){
  const validationContainer = document.querySelector(".pass-validation")
  let copyHTML =''
  
  pass.addEventListener('input',()=>{
    const result = passValidator(pass.value)
    validationContainer.innerHTML = `
    <p class="pass-check ${result.hasUpperAndLower ? "valid-check" : ""} ">At least one UPPERCASE and one lowercase</p>
      <p class="pass-check ${result.hasNumber ? "valid-check" : ""}">At least one number</p>
      <p class="pass-check ${result.hasSpecial ? "valid-check" : ""}  ">At least one special character</p>
      <p class= "pass-check ${result.hasMinLength ? "valid-check" : ""}">At least 8 characters</p>
    `
    confirm.value = ''
    copyHTML = validationContainer.innerHTML
  })

  confirm.addEventListener('input',()=>{
    validationContainer.innerHTML = `${copyHTML}
    <p class="pass-check ${pass.value===confirm.value ? "valid-check" : ""} ">Passwords Match</p>
    `
  })

}
