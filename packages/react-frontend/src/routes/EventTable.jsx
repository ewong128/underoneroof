import React from "react";
import trashDelete from "../../trash.png";
import event from "../../event.png";

function TableHeader() {
  return (
    <thead>
      <tr>
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
          Upcoming Events
        </th>
      </tr>
      <tr>
        <th style={{ width: "20%", backgroundColor: "#f8f9fa" }}>Date</th>
        <th style={{ width: "15%", backgroundColor: "#f8f9fa" }}>Time</th>
        <th style={{ width: "12%", backgroundColor: "#f8f9fa" }}>By...</th>
        <th style={{ width: "15%", backgroundColor: "#f8f9fa" }}>Name of Event</th>
        <th style={{ width: "25%", backgroundColor: "#f8f9fa" }}>Description</th>
        <th style={{ width: "10%", backgroundColor: "#f8f9fa" }}>Delete</th>
      </tr>
    </thead>
  );
}

function convertTo12HourFormat(time) {
  if(time) {
    let [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }
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
        <td>{`${row.startDate} - ${row.endDate}`}</td>
        <td>{`${convertTo12HourFormat(row.startTime)} - ${convertTo12HourFormat(row.endTime)}`}</td>
        <td>
          <span
            style={{
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
              padding: 10,
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
    <div style={{ marginTop: "30px", paddingTop: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
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

