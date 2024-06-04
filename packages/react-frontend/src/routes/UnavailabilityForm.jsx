import React, { useState } from "react";

function UnavailabilityForm(props) {
  const [unavailability, setUnavailability] = useState({
    eventName: "",
    roommate: "",
    startDate: "",
    endDate: "",
    description: "",
    color: "#000000",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUnavailability((prevUnavailability) => ({
      ...prevUnavailability,
      [name]: value,
    }));
  }

  function handleColorChange(event) {
    setUnavailability((prevUnavailability) => ({
      ...prevUnavailability,
      color: event.target.value,
    }));
  }

  function submitForm() {
    props.handleSubmit(unavailability);
    setUnavailability({
      eventName: "",
      roommate: "",
      startDate: "",
      endDate: "",
      description: "",
      color: "#000000",
    });
  }

  return (
    <form>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={{ marginRight: "15px" }}>
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            name="eventName"
            id="eventName"
            value={unavailability.eventName}
            onChange={handleChange}
            style={{ width: "300%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginRight: "15px" }}>
          <label htmlFor="roommate">Roommate</label>
          <input
            type="text"
            name="roommate"
            id="roommate"
            value={unavailability.roommate}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginRight: "15px" }}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={unavailability.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={unavailability.endDate}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: "15px" }}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={unavailability.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="Color" style={{ marginLeft: "10px" }}>
            <span>Color:</span>
            <input
              type="color"
              name="color"
              id="color"
              value={unavailability.color}
              onChange={handleColorChange}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                boxShadow: "0 0 0 2px #fff",
                cursor: "pointer",
                marginLeft: "1px",
                marginTop: "3px"
              }}
            />
          </label>
          <input
            type="text"
            name="hexColor"
            value={unavailability.color}
            onChange={handleColorChange}
            style={{ width: "95px", marginLeft: "5px", marginTop: "35px" }}
          />
        </div>
      </div>
      <div>
        <input
          type="button"
          value="Add Unavailability"
          onClick={submitForm}
          style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d", marginTop: "-10px", marginBottom: "60px" }}
        />
      </div>
    </form>
  );
}

export default UnavailabilityForm;