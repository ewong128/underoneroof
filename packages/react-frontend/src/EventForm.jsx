import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    date: "",
	time: "",
    name: "",
    Event: "",
	description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson(prevPerson => ({
      ...prevPerson,
      [name]: value
    }));
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ date: "", time: "", name: "", Event: "" , description: "" });
  }

  return (
    <form>
      <label htmlFor="date">Date</label>
      <input
        type="text"
        name="date"
        value={person.date}
        onChange={handleChange}
      />
	  <label htmlFor="time">Time</label>
      <input
        type="text"
        name="time"
        value={person.time}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="Event">Event</label>
      <input
        type="text"
        name="Event"
        value={person.Event}
        onChange={handleChange}
      />
	   <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={person.description}
        onChange={handleChange}
      />
      <input type="button" value="Add Event" onClick={submitForm} />
    </form>
  );
}

export default Form;