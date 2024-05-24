import React, { useState } from "react";

function EventForm(props) {
  const [events, setEvents] = useState({
    date: "",
	time: "",
    name: "",
    events: "",
	description: "",
  });


  function handleChange(events) {
    const { name, value } = events.target;
	
	 setEvents(prevEvents => ({
      ...prevEvents,
      [name]: value
    }));

 
  }

  function submitForm() {
    props.handleSubmit(events);
    setEvents({ date: "", time: "", name: "", events: "" , description: "" });
  }

  return (
    <form>
      <label htmlFor="date">Date</label>
      <input
        type="text"
        name="date"
        value={events.date}
        onChange={handleChange}
      />
	  <label htmlFor="time">Time</label>
      <input
        type="text"
        name="time"
        value={events.time}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={events.name}
        onChange={handleChange}
      />
      <label htmlFor="events">Event</label>
      <input
        type="text"
        name="events"
        value={events.events}
        onChange={handleChange}
      />
	   <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={events.description}
        onChange={handleChange}
      />
      <input type="button" value="Add Event" onClick={submitForm} />
    </form>
  );
}

export default EventForm;