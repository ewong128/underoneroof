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
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      name: "",
      event: "",
      description: "",
      color: "#000000",
    });
  }

  return (
    <form>
      <div style={{ display: "grid", gap: "10px", marginBottom: "10px", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={event.startDate}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={event.endDate}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={event.startTime}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={event.endTime}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="name">Roommate</label>
          <input
            type="text"
            name="name"
            id="name"
            value={event.name}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="event">Event</label>
          <input
            type="text"
            name="event"
            id="event"
            value={event.event}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={event.description}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="Color" style={{ marginRight: "10px" }}>Color:</label>
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
            }}
          />
          <input
            type="text"
            name="hexColor"
            value={event.color}
            onChange={handleColorChange}
            style={{ width: "95px", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div>
        <input
          type="button"
          value="Add Event"
          onClick={submitForm}
          style={{
            backgroundColor: "#00AA9E",
            borderColor: "#0a978d",
            marginTop: "10px",
          }}
        />
      </div>
    </form>
  );
}

export default EventForm;

// import React, { useState } from "react";

// function EventForm(props) {
//   const [event, setEvent] = useState({
//     startDate: "",
//     endDate: "",
//     startTime: "",
//     endTime: "",
//     name: "",
//     event: "",
//     description: "",
//     color: "#000000",
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setEvent((prevEvent) => ({
//       ...prevEvent,
//       [name]: value,
//     }));
//   }

//   function handleColorChange(event) {
//     setEvent((prevEvent) => ({
//       ...prevEvent,
//       color: event.target.value,
//     }));
//   }

//   function submitForm() {
//     props.handleSubmit(event);
//     setEvent({ 
//       startDate: "", 
//       endDate: "", 
//       startTime: "", 
//       endTime: "", 
//       name: "", 
//       event: "", 
//       description: "",
//       color: "#000000", 
//     });
//   }

//   return (
//     <form>
//       <div style={{ display: "flex", marginBottom: "10px" }}>
//         <div style={{ marginRight: "18px" }}>
//         <label htmlFor="startDate">Start Date</label>
//       <input
//         type="date"
//         name="startDate"
//         id="startDate"
//         value={event.startDate}
//         onChange={handleChange}
//         style={{ width: "300%", boxSizing: "border-box" }}
//       />
//       <label htmlFor="endDate">End Date</label>
//       <input
//         type="date"
//         name="endDate"
//         id="endDate"
//         value={event.endDate}
//         onChange={handleChange}
//       />
//       <label htmlFor="startTime">Start Time</label>
//       <input
//         type="time"
//         name="startTime"
//         id="startTime"
//         value={event.startTime}
//         onChange={handleChange}
//       />
//       <label htmlFor="endTime">End Time</label>
//       <input
//         type="time"
//         name="endTime"
//         id="endTime"
//         value={event.endTime}
//         onChange={handleChange}
//       />
//         </div>
       
//         <div style={{ marginRight: "18px" }}>
//           <label htmlFor="name">Roommate</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={event.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="event">Event</label>
//           <input
//             type="text"
//             name="event"
//             id="event"
//             value={event.event}
//             onChange={handleChange}
//           />
//         </div>
//         <div style={{ marginLeft: "18px" }}>
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             name="description"
//             id="description"
//             value={event.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <label htmlFor="Color" style={{ marginLeft: "18px" }}>
//             <span>Color:</span>
//             <input
//               type="color"
//               name="color"
//               id="color"
//               value={event.color}
//               onChange={handleColorChange}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "10px",
//                 boxShadow: "0 0 0 2px #fff",
//                 cursor: "pointer",
//                 marginLeft: "1px",
//                 marginTop: "3px"
//               }}
//             />
//           </label>
//           <input
//             type="text"
//             name="hexColor"
//             value={event.color}
//             onChange={handleColorChange}
//             style={{ width: "95px", marginLeft: "5px", marginTop: "35px" }}
//           />
//         </div>
//       </div>
//       <div>
//         <input
//           type="button"
//           value="Add Event"
//           onClick={submitForm}
//           style={{ backgroundColor: "#00AA9E", borderColor: "#0a978d", marginTop: "-10px", marginBottom: "25px" }}
//         />
//       </div>
//     </form>
//   );
// }

// export default EventForm;
