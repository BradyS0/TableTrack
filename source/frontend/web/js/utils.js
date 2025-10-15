export function setUserState(userData) {
  if (!userData) {
    console.error("Invalid data passed to setUserState");
    return;
  }
  
  sessionStorage.setItem("userState", JSON.stringify(userData));
}

export function getUserState() {
  try {
    return JSON.parse(sessionStorage.getItem("userState")) || null;
  } catch {
    return null;
  }
}

export function clearUserState() {
  sessionStorage.removeItem("userState");
}
