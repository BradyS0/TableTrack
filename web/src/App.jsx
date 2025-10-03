import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);  // store users
  const [error, setError] = useState(null); // store errors

  useEffect(() => {
    fetch(`${__API_URL__}/api/users`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("API response:", data);

        // Make sure we have an array
        const usersArray = Array.isArray(data) ? data : data.data;
        if (!Array.isArray(usersArray)) {
          throw new Error("API did not return an array");
        }

        setUsers(usersArray);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
