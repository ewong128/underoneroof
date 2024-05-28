// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
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
        <td>
          <button onClick={() => props.removeEvent(index)}>
            Delete
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