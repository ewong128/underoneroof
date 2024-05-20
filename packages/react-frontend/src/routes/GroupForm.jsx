import React, { useState } from "react";
import { Link } from "react-router-dom";

function GroupForm(props) {

  const [group, setGroup] = useState({
    name: "",
  });

  const { mode } = props;
  const welcomeMessage = "Name Your Group!";
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setGroup({ ...group, name: value });
  }

  function submitForm() {
    //debugger;
    props.handleSubmit(group)
      .then(response => {
        if (response.status === 401) {
          setErrorMessage("Invalid group name1.");
        } else {
          // Reset error message if login succeeds
          setErrorMessage("");
        }
      })
      .catch(error => {
        console.log(error.response)
        setErrorMessage("Error when creating group name.");
      });
    setGroup({ name: ""});
  }

  return (
    <div className="group-container" 
    style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20vh" }}>
      <h1>UnderOneRoof</h1>
      <p style={{ fontSize: "1rem", fontWeight: "300" }}>{welcomeMessage}</p>
      <form style={{ width: "50%" }}>
        <label htmlFor="username">Group Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={group.name}
          onChange={handleChange}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <input
          type="button"
          value={props.buttonLabel || "Create Group"}
          onClick={submitForm}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </form>
      {errorMessage && !(location.pathname == "/signup") && <p>{errorMessage}</p>}
      {location.pathname === "/signup/createGroup" && (
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </div>
  );  
}
export default GroupForm;