//UnavailabilityTable.jsx
import React from "react";
import trashDelete from "../../trash.png";
import availabilityIcon from "../../availability.png";

function TableHeader() {
  return (
    <thead>
      <th colSpan="6" style={{ fontSize: "1.5rem", color: "#0a978d" }}>
        <img
          src={availabilityIcon}
          alt="Events"
          style={{
            marginRight: "5px",
            marginTop: "-10px",
            width: "40px",
            height: "37px",
          }}
        />
        Unavailability
      </th>
      <tr>
        <th style={{ width: "20%", backgroundColor: "#f8f9fa" }}>Event</th>
        <th style={{ width: "10%", backgroundColor: "#f8f9fa" }}>Roommate</th>
        <th style={{ width: "10%", backgroundColor: "#f8f9fa" }}>Start Date</th>
        <th style={{ width: "10%", backgroundColor: "#f8f9fa" }}>End Date</th>
        <th style={{ width: "30%", backgroundColor: "#f8f9fa" }}>
          Description
        </th>
        <th style={{ width: "10%", backgroundColor: "#f8f9fa" }}>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.unavailabilityData === null) {
    return <caption>Data Unavailable</caption>;
  }

  console.log(props.unavailabilityData);
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
        <td>
          <span
            style={{
              width: "15%",
              backgroundColor: roommateColor,
              color: textColor,
              padding: "2px 5px",
              borderRadius: "5px",
            }}
          >
            {row.roommate}
          </span>
        </td>
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
    <div
      style={{
        marginTop: "30px",
        paddingTop: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <table>
        <TableHeader />
        <TableBody
          unavailabilityData={props.unavailabilityData}
          removeUnavailability={props.removeUnavailability}
        />
      </table>
    </div>
  );
}

export default UnavailabilityTable;
