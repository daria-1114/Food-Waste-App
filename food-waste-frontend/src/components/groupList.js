import React, { useEffect, useState } from "react";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");

  const fetchGroups = async () => {
    const res = await fetch("http://localhost:8000/api/groups");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const addGroup = async () => {
    await fetch("http://localhost:8000/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, label }),
    });
    setName(""); setLabel("");
    fetchGroups();
  };

  const addUserToGroup = async () => {
    await fetch(`http://localhost:8000/api/groups/${groupId}/users/${userId}`, {
      method: "POST",
    });
    setUserId(""); setGroupId("");
  };

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {groups.map(g => <li key={g.id}>{g.name} ({g.label})</li>)}
      </ul>

      <h3>Add Group</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Label" value={label} onChange={e => setLabel(e.target.value)} />
      <button onClick={addGroup}>Add Group</button>

      <h3>Add User to Group</h3>
      <input placeholder="Group ID" value={groupId} onChange={e => setGroupId(e.target.value)} />
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <button onClick={addUserToGroup}>Add User</button>
    </div>
  );
};

export default GroupList;
