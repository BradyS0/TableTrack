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
  window.location.href = './';
}


//this function takes in string as html-format and returns them as dom elements
export function generateTemplate(data) {
  const template = document.createElement("div");
  template.innerHTML = data.trim();
  return template.firstElementChild;
}
