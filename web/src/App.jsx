import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(`${__API_URL__}/api/users`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("API response:", data); // <-- just log it
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <p>Check the console to see the API response.</p>
    </div>
  );
}

export default App;