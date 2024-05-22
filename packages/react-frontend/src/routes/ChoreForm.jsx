 // src/Form.jsx
import React, { useState } from "react";

function ChoreForm(props) {
    const [chore, setChore] = useState({
        chore: "",
        roommate: "",
        day: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "roommate")
        setChore({ chore: chore["chore"], roommate: value, day: chore["day"] });
        else if (name == "day")
        setChore({chore: chore["chore"], roommate: chore["roommate"], day: value});
        else setChore({ chore: value, roommate: chore["roommate"], day: chore["day"] });  
    }

    function submitForm(){
        props.handleSubmit(chore);
        setChore({chore: "", roommate: "", day: ""})
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
          <input
            type="text"
            name="day"
            id="day"
            value={chore.day}
            onChange={handleChange}
          />
          <input type="button" value="Add Chore" onClick={submitForm} style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }} />
        </form>
    );
}


export default ChoreForm;