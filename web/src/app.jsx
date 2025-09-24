import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${__API_URL__}/users`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }
        setUsers(data);
      })
      .catch(err => setError(err.message));
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
            <li key={u.id}>{u.name} ({u.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
