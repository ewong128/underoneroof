import React, { useState } from "react";

function Group(props) {
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [message, setMessage] = useState("");

  function handleGroupNameChange(event) {
    setGroupName(event.target.value);
  }

  function handleGroupCodeChange(event) {
    setGroupCode(event.target.value);
  }

  function generateRandomId() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }

  function createGroup() {
    // Generate a unique group code (you can implement this logic)
    setGroupCode(generateRandomId());

    // Display a header with the group name
    setMessage(`Welcome to ${groupName}`);
  }

  return (
    <div>
      <h2>Create or Join a Group</h2>
      <label>
        Group Name:
        <input type="text" value={groupName} onChange={handleGroupNameChange} />
      </label>
      <br />
      <label>
        Group Code:
        <input type="text" value={groupCode} onChange={handleGroupCodeChange} />
      </label>
      <br />
      <button onClick={createGroup}>Create Group</button>
      <button onClick={joinGroup}>Join Group</button>
      <p>{message}</p>
    </div>
  );
}


export default Group;