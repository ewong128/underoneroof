import React, { useState } from "react";

function EventForm(props) {
  const [event, setEvent] = useState({
    date: "",
    time: "",
    name: "",
    event: "",
    description: "",
    color: "#000000",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }

  function handleColorChange(event) {
    setEvent((prevEvent) => ({
      ...prevEvent,
      color: event.target.value,
    }));
  }

  function submitForm() {
    props.handleSubmit(event);
    setEvent({
      date: "",
      time: "",
      name: "",
      event: "",
      description: "",
      color: "#000000",
    });
  }

  return (
    <form>
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        id="date"
        value={event.date}
        onChange={handleChange}
      />
      <label htmlFor="time">Time</label>
      <input
        type="time"
        name="time"
        id="time"
        value={event.time}
        onChange={handleChange}
      />
      <label htmlFor="name">Roommate</label>
      <input
        type="text"
        name="name"
        id="name"
        value={event.name}
        onChange={handleChange}
      />
      <label htmlFor="event">Event</label>
      <input
        type="text"
        name="event"
        id="event"
        value={event.event}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={event.description}
        onChange={handleChange}
      />

      <label htmlFor="Color" style={{ display: "flex", alignItems: "center" }}>
        <span>Color:</span>
        <input
          type="color"
          name="color"
          id="color"
          value={event.color}
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
          value={event.color}
          onChange={handleColorChange}
          style={{ width: "95px", marginLeft: "10px" }}
        />
      </label>
      <input
        type="button"
        value="Add Event"
        onClick={submitForm}
        style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }}
      />
    </form>
  );
}

export default EventForm;
