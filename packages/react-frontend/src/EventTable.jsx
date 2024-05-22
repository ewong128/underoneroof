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
  const rows = props.eventData.map((row, index) => {
    return(
      <tr key = {index}>
        <td>{row.date}</td>
		<td>{row.time}</td>
        <td>{row.name}</td>
        <td>{row.events}</td>
		<td>{row.description}</td>
        <td>
          <button onClick={() => props.removeEvents(index)}>
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
      removeEvents = {props.removeEvents}
      />
    </table>
  );
}

export default EventTable;