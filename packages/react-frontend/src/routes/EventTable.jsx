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
        <td>{row.Date}</td>
        <td>{row.Time}</td>
        <td>{row.Name}</td>
        <td>{row.Event}</td>
        <td>{row.Description}</td>
        <td style ={{ paddingLeft: "23px" }}>
          <button onClick={() => props.removeChore(index)} 
            style={{ padding: 0, border: "none", background: "none" }}>
            <img src={trashDelete} alt="Delete" style={{ width: "20px", height: "20px" }} />
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