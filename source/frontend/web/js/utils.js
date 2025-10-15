export function setUserState(value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // expires in X days
  const expires = "expires=" + date.toUTCString();
  document.cookie = `u_session=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export function getUserState(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) || null;
  } catch {
    return null;
  }
}


export function clearUserState(){
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  // Clear session storage
  sessionStorage.clear();
}