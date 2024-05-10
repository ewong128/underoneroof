// src/Table.jsx
import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Chore</th>
        <th>Assigned to</th>
        <th>Day of the Week</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.choreData.map((row, index) => {
    return(
      <tr key = {index}>
        <td>{row.chore}</td>
        <td>{row.roommate}</td>
        <td>{row.day}</td>
        <td>
          <button onClick={() => props.removeChore(index)}>
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

function ChoreTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
      choreData = {props.choreData}
      removeChore = {props.removeChore}
      />
    </table>
  );
}

export default ChoreTable;