import React, { useState } from "react";

function ChoreForm(props) {
  const [chore, setChore] = useState({
    chore: "",
    roommate: "",
    day: "",
    color: "#000000",
    group_id: undefined,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setChore({ ...chore, [name]: value });
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
        <option value="" disabled>
          Select a day
        </option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <label htmlFor="Color" style={{ display: "flex", alignItems: "center" }}>
        <span>Color:</span>
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
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
        <input
          type="text"
          name="hexColor"
          value={chore.color}
          onChange={handleColorChange}
          style={{ width: "95px", marginLeft: "10px" }}
        />
      </label>

      <input
        type="button"
        value="Add Chore"
        onClick={submitForm}
        style={{
          backgroundColor: "#00AA9E",
          borderColor: "#0a978d",
          marginTop: "10px",
        }}
      />
    </form>
  );
}

export default ChoreForm;
