import { setUserState, getUserState, clearUserState } from '../utils.js';

const openBtn = document.getElementById("openSignup");
const closeBtn = document.getElementById("closeSignup");
const popup = document.getElementById("signupPopup");


// Toggle popup visibility
openBtn.addEventListener("click", () => popup.classList.remove("hidden"));
closeBtn.addEventListener("click", () => popup.classList.add("hidden"));

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (res.ok) {
    setUserState(data);
    alert("Login successful!");
    // redirect user
    window.location.href = "/dashboard.html";  //change this
  } else {
    alert(data.message || "Login failed");
  }
});

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = firstName.value;
  const lastName = lastName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirm = confirmPassword.value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Account created! You can now log in.");
    popup.classList.add("hidden");
  } else {
    alert(data.message || "Signup failed");
  }
});
