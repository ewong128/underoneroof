import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6" style={{ fontSize: "1.5rem", color: "#0a978d" }}>Events</th>
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
  if (props.eventData === null) {
    return <caption>Data Unavailable</caption>;
  }

  const rows = props.eventData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.date}</td>
        <td>{row.time}</td>
        <td>{row.name}</td>
        <td>{row.event}</td>
        <td>{row.description}</td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => props.removeEvent(index)}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              src={trashDelete}
              alt="Delete"
              style={{ width: "20px", height: "25px", marginRight: "-45px", marginTop: "5px" }}
            />
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function EventTable(props) {
  return (
    <div style={{ paddingTop: "40px" }}> 
      <table style={{ borderTop: "1px solid black" }}>
        <TableHeader />
        <TableBody eventData={props.eventData} removeEvent={props.removeEvents} />
      </table>
    </div>
  );
}

export default EventTable;