import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Login(props) {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  const { mode } = props;
  const welcomeMessage =
    location.pathname === "/login"
      ? "Welcome back!"
      : "Create an account with us!";
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [searchParams] = useSearchParams();

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

  function handleCheckboxChange(event) {
    setRememberMe(event.target.checked);
  }

  function submitForm() {
    const next = searchParams.get("next");
    props
      .handleSubmit(creds, rememberMe, next)
      .then((response) => {
        if (response.status === 401) {
          setErrorMessage("Invalid credentials.");
        } else {
          // Reset error message if login succeeds
          setErrorMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid credentials.");
      });
    setCreds({ username: "", pwd: "" });
  }

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh",
      }}
    >
      <h1>UnderOneRoof</h1>
      <p style={{ fontSize: "1rem", fontWeight: "300" }}>{welcomeMessage}</p>
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
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleCheckboxChange}
            style={{ marginRight: "8px" }}
          />
          Remember me
        </label>
        <input
          type="button"
          value={props.buttonLabel || "Log In"}
          onClick={submitForm}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </form>
      {errorMessage && !(location.pathname == "/signup") && (
        <p>{errorMessage}</p>
      )}
      {location.pathname === "/login" && (
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </div>
  );
}
export default Login;
