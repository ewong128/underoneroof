import React, { useState } from "react";

function EventForm(props) {
  const [event, setEvent] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
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
    setEvent({ 
      startDate: "", 
      endDate: "", 
      startTime: "", 
      endTime: "", 
      name: "", 
      event: "", 
      description: "" 
    });
  }

  return (
    <form>
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={event.startDate}
        onChange={handleChange}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        name="endDate"
        id="endDate"
        value={event.endDate}
        onChange={handleChange}
      />
      <label htmlFor="startTime">Start Time</label>
      <input
        type="time"
        name="startTime"
        id="startTime"
        value={event.startTime}
        onChange={handleChange}
      />
      <label htmlFor="endTime">End Time</label>
      <input
        type="time"
        name="endTime"
        id="endTime"
        value={event.endTime}
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
