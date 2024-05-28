import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6">Chores</th>
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
  const rows = props.choreData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.chore}</td>
        <td>{row.roommate}</td>
        <td>{row.day}</td>
        <td>{row.status}</td>
        <td
          style={{
            paddingLeft: "1px",
            paddingRight: "-20px",
            textAlign: "center",
          }}
        >
          <input
            type="checkbox"
            id="completed"
            name="completed"
            onClick={() => props.updateChoreStatus(index)}
          />
        </td>
        <td style={{ paddingLeft: "23px" }}>
          <button
            onClick={() => props.removeChore(index)}
            style={{ padding: 0, border: "none", background: "none" }}
          >
            <img
              src={trashDelete}
              alt="Delete"
              style={{ marginTop: "5px", width: "20px", height: "25px" }}
            />
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
