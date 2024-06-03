import React, { useState } from "react";

function UnavailabilityForm(props) {
  const [unavailability, setUnavailability] = useState({
    eventName: "",
    roommate: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUnavailability(prevUnavailability => ({
      ...prevUnavailability,
      [name]: value
    }));
  }

  function submitForm() {
    props.handleSubmit(unavailability);
    setUnavailability({
      eventName: "",
      roommate: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  }

  return (
    <form>
      <label htmlFor="eventName">Event Name</label>
      <input
        type="text"
        name="eventName"
        id="eventName"
        value={unavailability.eventName}
        onChange={handleChange}
      />
      <label htmlFor="roommate">Roommate</label>
      <input
        type="text"
        name="roommate"
        id="roommate"
        value={unavailability.roommate}
        onChange={handleChange}
      />
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={unavailability.startDate}
        onChange={handleChange}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        name="endDate"
        id="endDate"
        value={unavailability.endDate}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={unavailability.description}
        onChange={handleChange}
      />
      <input
        type="button"
        value="Add Unavailability"
        onClick={submitForm}
        style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }}
      />
    </form>
  );
}

export default UnavailabilityForm;