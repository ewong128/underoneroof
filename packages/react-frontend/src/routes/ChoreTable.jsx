import React, { useEffect, useState } from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6" style={{ fontSize: "1.5rem", color: "#0a978d" }}>Chores</th>
      </tr>
      <tr>
        <th>Chore</th>
        <th>Assigned to</th>
        <th>Day of the Week</th>
        <th>Status</th>
        <th>Completed</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.choreData === null) {
    return <caption>Data Unavailable</caption>;
  }
  const [checkedState, setCheckedState] = useState({}); // State to keep track of checked status

  useEffect(() => {
    const initialCheckedState = {};
    props.choreData.forEach((_, index) => {
      const isChecked = localStorage.getItem(`completed_${index}`) === "true";
      initialCheckedState[index] = isChecked; // Initialize checked state from localStorage
    });
    setCheckedState(initialCheckedState); // Set initial checked state
  }, [props.choreData]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = { ...checkedState, [index]: !checkedState[index] };
    setCheckedState(updatedCheckedState); // Update checked state in local state
    localStorage.setItem(`completed_${index}`, updatedCheckedState[index]); // Update localStorage
    props.updateChoreStatus(index);
  };

  const rows = props.choreData.map((row, index) => {
    const isChecked = checkedState[index] || false; // Get checked state from local state

    // Rest of the code remains the same
    const status = isChecked ? "Completed" : "Pending...";
    const statusColor = isChecked ? "#D4FFD6" : "#D4EAFF";
    const roommateColor = row.color || "#FFFFFF";
    const textColor = getLuminance(roommateColor) < 0.5 ? "#FFFFFF" : "#000000";

    function getLuminance(color) {
      let rgb = [];
      if (color.length === 7) {
        rgb = [parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16)];
      } else if (color.length === 4) {
        rgb = [
          parseInt(color.slice(1, 2) + color.slice(1, 2), 16),
          parseInt(color.slice(2, 3) + color.slice(2, 3), 16),
          parseInt(color.slice(3, 4) + color.slice(3, 4), 16),
        ];
      } else {
        throw new Error('Invalid color format');
      }
    
      const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
      return luminance;
    }

    return (
      <tr key={index}>
        <td>{row.chore}</td>
        <td>
          <span style={{ backgroundColor: roommateColor, color: textColor, padding: "2px 5px", borderRadius: "5px" }}>
            {row.roommate}
          </span>
        </td>
        <td>{row.day}</td>
        <td>
          <span style={{ backgroundColor: statusColor, padding: "2px 5px", borderRadius: "5px" }}>
            {status}
          </span>
        </td>
        <td style={{ paddingLeft: "1px", paddingRight: "-20px", textAlign: "center" }}> 
          <input
            type="checkbox"
            id={`completed_${index}`}
            name="completed"
            checked={isChecked}
            onChange={() => handleCheckboxChange(index)}
          />
        </td>
        <td style={{ paddingLeft: "23px" }}>
          <button onClick={() => props.removeChore(index)} 
            style={{ padding: 0, border: "none", background: "none" }}>
            <img src={trashDelete} alt="Delete" style={{ marginTop: "5px", width: "20px", height: "25px" }} />
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function ChoreTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        choreData={props.choreData}
        removeChore={props.removeChore}
        updateChoreStatus={props.updateChoreStatus}
      />
    </table>
  );
}

export default ChoreTable;
