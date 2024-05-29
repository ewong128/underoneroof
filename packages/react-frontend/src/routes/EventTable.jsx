import React from "react";
import trashDelete from "../../trash.png";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th colSpan="6">Events</th>
      </tr>
      <tr>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Name</th>
        <th>Event</th>
        <th>Description</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.eventData === null) {
  if (props.eventData === null) {
    return <caption>Data Unavailable</caption>;
  }

  const rows = props.eventData.map((row, index) => (
    <tr key={index}>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
      <td>{row.startTime}</td>
      <td>{row.endTime}</td>
      <td>{row.name}</td>
      <td>{row.event}</td>
      <td>{row.description}</td>
      <td>
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
  ));

  return <tbody>{rows}</tbody>;
}

function EventTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
        eventData={props.eventData} 
        removeEvent={props.removeEvents} 
      />
    </table>
  );
}

export default EventTable;

// // src/Table.jsx
// import React from "react";

// function TableHeader() {
//   return (
//     <thead>
//       <tr>
//         <th>Date</th>
// 		<th>Time</th>
//         <th>Name</th>
//         <th>Events</th>
// 		<th>Description</th>
//         <th>Delete</th>
//       </tr>
//     </thead>
//   );
// }

// function TableBody(props) {
//     if(props.eventData === null) {
//     return <caption>Data Unavailable</caption>;
//     }
//   const rows = props.eventData.map((row, index) => {
//     return(
//       <tr key = {index}>
//         <td>{row.date}</td>
// 		<td>{row.time}</td>
//         <td>{row.name}</td>
//         <td>{row.event}</td>
// 		<td>{row.description}</td>
//         <td>
//           <button onClick={() => props.removeEvent(index)}>
//             Delete
//           </button>
//         </td>
//       </tr>
//     )
//   }
//   )
//   return(
//     <tbody>
//       {rows}
//     </tbody>
//   );
// }

// function EventTable(props) {
//   return (
//     <table>
//       <TableHeader />
//       <TableBody 
//       eventData = {props.eventData}
//       removeEvent = {props.removeEvents}
//       />
//     </table>
//   );
// }

// export default EventTable;