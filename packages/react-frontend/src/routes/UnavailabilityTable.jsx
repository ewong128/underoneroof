//UnavailabilityTable.jsx
import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6">Unavailability</th>
      </tr>
      <tr>
        <th style={{ width: "15%" }}>Event</th>
        <th style={{ width: "10%" }}>Roommate</th>
        <th style={{ width: "15%" }}>Start Date</th>
        <th style={{ width: "20%" }}>End Date</th>
        <th style={{ width: "30%" }}>Description</th>
        <th style={{ width: "10%" }}>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.unavailabilityData === null) {
    return <caption>Data Unavailable</caption>;
  }

  const rows = props.unavailabilityData.map((row, index) => {
  const roommateColor = row.color || "#FFFFFF";
  const textColor = getLuminance(roommateColor) < 0.5 ? "#FFFFFF" : "#000000";

    function getLuminance(color) {
      let rgb = [];
      if (color.length === 7) {
        rgb = [
          parseInt(color.slice(1, 3), 16),
          parseInt(color.slice(3, 5), 16),
          parseInt(color.slice(5, 7), 16),
        ];
      } else if (color.length === 4) {
        rgb = [
          parseInt(color.slice(1, 2) + color.slice(1, 2), 16),
          parseInt(color.slice(2, 3) + color.slice(2, 3), 16),
          parseInt(color.slice(3, 4) + color.slice(3, 4), 16),
        ];
      } else {
        throw new Error("Invalid color format");
      }

      const luminance =
        (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
      return luminance;
    }
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
