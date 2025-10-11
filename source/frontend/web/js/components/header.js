export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <image src="../assets/TableTrack-logo.svg" alt="Logo" class="logo"/>
    <h1>TableTrack</h1>
    <button class="login-btn">Login</button>
  `;
  return header;
}