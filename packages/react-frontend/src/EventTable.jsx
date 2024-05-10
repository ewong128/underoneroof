// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>date</th>
        <th>Name</th>
        <th>Event</th>
		<th>description</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return(
      <tr key = {index}>
        <td>{row.date}</td>
        <td>{row.name}</td>
        <td>{row.Event}</td>
		<td>{row.description}</td>
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

function Table(props) {
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

export default Table;