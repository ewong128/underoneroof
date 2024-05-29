import React, { useState } from "react";

function EventForm(props) {
  const [event, setEvent] = useState({
    date: "",
    time: "",
    name: "",
    event: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  }

  function submitForm() {
    props.handleSubmit(event);
    setEvent({ date: "", time: "", name: "", event: "" , description: "" });
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

      <label htmlFor="name">Name</label>
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
      <input type="button" value="Add Event" onClick={submitForm} style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }} />
    </form>
  );
}

export default EventForm;
