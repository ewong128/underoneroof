// src/Table.jsx
import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6">Events</th> 
      </tr>
      <tr>
        <th>Date</th>
		<th>Time</th>
        <th>Name</th>
        <th>Events</th>
		<th>Description</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
    if(props.eventData === null) {
    return <caption>Data Unavailable</caption>;
    }
  const rows = props.eventData.map((row, index) => {
    return(
      <tr key = {index}>
        <td>{row.date}</td>
        <td>{row.time}</td>
        <td>{row.name}</td>
        <td>{row.event}</td>
        <td>{row.description}</td>
        <td style ={{ paddingLeft: "23px" }}></td>
        <td>
          <button onClick={() => props.removeEvent(index)}
          style={{ padding: 0, border: "none", background: "none" }}>
          <img src={trashDelete} alt="Delete" style={{ marginTop: "5px", width: "20px", height: "20px" }} />
          </button>
        </td>
      </tr>
    )
  }
  )
  return(
    <tbody>
      {rows}
    </tbody>
  );
}

function EventTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
      eventData = {props.eventData}
      removeEvent = {props.removeEvents}
      />
    </table>
  );
}

export default EventTable;