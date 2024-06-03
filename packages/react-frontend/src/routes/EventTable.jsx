import React from "react";
import trashDelete from "../../trash.png";
import event from "../../event.png";

function TableHeader() {
  return (
    <thead>
      <th colSpan="6" style={{ fontSize: "1.5rem", color: "#0a978d" }}>
        <img
          src={event}
          alt="Events"
          style={{
            marginRight: "5px",
            marginTop: "-10px",
            width: "45px",
            height: "42px",
          }}
        />
        Events
      </th>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>By...</th>
        <th>Name of Event</th>
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
        <td>{row.date}</td>
        <td>{row.time}</td>
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
            {row.name}
          </span>
        </td>
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

function EventTable(props) {
  return (
    <div style={{ paddingTop: "40px" }}>
      <table>
        <TableHeader />
        <TableBody
          eventData={props.eventData}
          removeEvent={props.removeEvents}
        />
      </table>
    </div>
  );
}

export default EventTable;
