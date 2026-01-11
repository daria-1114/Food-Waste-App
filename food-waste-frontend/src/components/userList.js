import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setName(""); setEmail(""); setPassword("");
    fetchUsers();
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
      </ul>
      <h3>Add User</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default UserList;
