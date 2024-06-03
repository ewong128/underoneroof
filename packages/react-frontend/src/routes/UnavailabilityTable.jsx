import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6">Unavailability</th>
      </tr>
      <tr>
        <th>Event Name</th>
        <th>Roommate</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Description</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.unavailabilityData === null) {
    return <caption>Data Unavailable</caption>;
  }

  const rows = props.unavailabilityData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.eventName}</td>
        <td>{row.roommate}</td>
        <td>{row.startDate}</td>
        <td>{row.endDate}</td>
        <td>{row.description}</td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() => props.removeUnavailability(index)}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={trashDelete}
              alt="Delete"
              style={{
                width: "20px",
                height: "25px",
                marginRight: "-45px",
                marginTop: "5px",
              }}
            />
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function UnavailabilityTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        unavailabilityData={props.unavailabilityData}
        removeUnavailability={props.removeUnavailability}
      />
    </table>
  );
}

export default UnavailabilityTable;
