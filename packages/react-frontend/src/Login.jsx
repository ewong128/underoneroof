import React, { useState } from "react";

function Login(props) {

  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const { mode } = props;

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function submitForm() {
    //debugger;
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

  return (
    <div className="login-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20vh" }}>
      <label>UnderOneRoof</label>
      <form style={{ width: "50%" }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={creds.pwd}
          onChange={handleChange}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <input
          type="button"
          value={props.buttonLabel || "Log In"}
          onClick={submitForm}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </form>
    </div>
  );  
}
export default Login;