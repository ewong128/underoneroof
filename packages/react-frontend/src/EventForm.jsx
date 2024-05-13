import React, { useState } from "react";

function EventForm(props) {
  const [person, setPerson] = useState({
    date: "",
	Time: "",
    Name: "",
    Event: "",
	Description: "",
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
    setPerson({ date: "", Time: "", Name: "", Event: "" , Description: "" });
  }

  return (
    <form>
      <label htmlFor="date">Date</label>
      <input
        type="text"
        name="Date"
        value={person.date}
        onChange={handleChange}
      />
	  <label htmlFor="Time">Time</label>
      <input
        type="text"
        name="Time"
        value={person.Time}
        onChange={handleChange}
      />
      <label htmlFor="Name">Name</label>
      <input
        type="text"
        name="Name"
        value={person.Name}
        onChange={handleChange}
      />
      <label htmlFor="Event">Event</label>
      <input
        type="text"
        name="Event"
        value={person.Event}
        onChange={handleChange}
      />
	   <label htmlFor="Description">Description</label>
      <input
        type="text"
        name="Description"
        value={person.Description}
        onChange={handleChange}
      />
      <input type="button" value="Add Event" onClick={submitForm} />
    </form>
  );
}

export default EventForm;