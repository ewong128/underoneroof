// src/Form.jsx
import React, { useState } from "react";

function ChoreForm(props) {
  const [chore, setChore] = useState({
    chore: "",
    roommate: "",
    day: "",
    color: "#000000"
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "roommate") {
      setChore({ chore: chore["chore"], roommate: value, day: chore["day"], color: chore["color"] });
    } else if (name === "day") {
      setChore({ chore: chore["chore"], roommate: chore["roommate"], day: value, color: chore["color"] });
    } else if (name === "color") {
      setChore({ chore: chore["chore"], roommate: chore["roommate"], day: chore["day"], color: value });
    } else {
      setChore({ chore: value, roommate: chore["roommate"], day: chore["day"], color: chore["color"] });
    }
  }

  function handleColorChange(event) {
    setChore({ ...chore, color: event.target.value });
  }

  function submitForm() {
    props.handleSubmit(chore);
    setChore({ chore: "", roommate: "", day: "", color: "#000000" });

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("completed_")) {
        localStorage.removeItem(key);
      }
    }
  }

  return (
    <form>
      <label htmlFor="chore">Chore</label>
      <input
        type="text"
        name="chore"
        id="chore"
        value={chore.chore}
        onChange={handleChange}
      />
      <label htmlFor="roommate">Roommate</label>
      <input
        type="text"
        name="roommate"
        id="roommate"
        value={chore.roommate}
        onChange={handleChange}
      />

      <label htmlFor="day">Day</label>
      <select name="day" id="day" onChange={handleChange} value={chore.day}>
        <option value="" disabled>Select a day</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <label htmlFor="color">Color</label>
      <input
        type="color"
        name="color"
        id="color"
        value={chore.color}
        onChange={handleColorChange}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          boxShadow: "0 0 0 2px #fff",
          cursor: "pointer"
        }}
      />

      <input 
        type="button" 
        value="Add Chore" 
        onClick={submitForm} 
        style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }} />

    </form>
  );
}

export default ChoreForm;
