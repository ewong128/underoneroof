// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Date</th>
		<th>Time</th>
        <th>Name</th>
        <th>Event</th>
		<th>Description</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if(props.characterData === null) {
    return <caption>Data Unavailable</caption>;
  }
  const rows = props.characterData.map((row, index) => {
    return(
      <tr key = {index}>
        <td>{row.date}</td>
		<td>{row.Time}</td>
        <td>{row.Name}</td>
        <td>{row.Event}</td>
		<td>{row.Description}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>
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
      characterData = {props.characterData}
      removeCharacter = {props.removeCharacter}
      />
    </table>
  );
}

export default EventTable;