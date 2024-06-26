import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import groupLogo from "../../group.png";

function GroupForm(props) {
  const [group, setGroup] = useState({
    name: "",
    roommates: [],
  });

  const { mode } = props;
  const welcomeMessage = "Name Your Group!";
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  function handleChange(event) {
    const { name, value } = event.target;
    setGroup({ ...group, name: value });
  }

  function submitForm() {
    //debugger;
    props
      .handleSubmit(group)
      .then((response) => {
        if (response.status === 401) {
          setErrorMessage("Invalid group name.");
        } else {
          // Reset error message if login succeeds
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
    setGroup({ name: "" });
  }

  return (
    <div
      className="group-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh",
      }}
    >
      <img
        src={groupLogo}
        alt="logo"
        style={{ width: "75px", height: "75px", marginBottom: "10px" }}
      />
      <h1 style={{ marginTop: "0", marginBottom: "10px" }}>UnderOneRoof</h1>
      <p style={{ fontSize: "1rem", fontWeight: "300", marginBottom: "10px" }}>
        {welcomeMessage}
      </p>
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
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#00AA9E",
            borderColor: "#0a978d",
          }}
        />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {location.pathname === "/signup/createGroup" && (
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </div>
  );
}

export default GroupForm;
