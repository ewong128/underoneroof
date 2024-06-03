import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";

const Navbar = ({ handleLogout, copyLink }) => {
  const [copyMessage, setCopyMessage] = useState("");
  const navigate = useNavigate();

  const handleCopyLink = () => {
    copyLink();
    setCopyMessage("Group invite link copied to clipboard!");
    setTimeout(() => {
      setCopyMessage("");
    }, 5000); // hide the message after 10 seconds
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand mb-0 h1 d-flex align-items-center">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
          style={{ marginRight: "10px" }}
        />
        <span className="ml-2" style={{ marginTop: "5px" }}>UnderOneRoof</span> 
        <div style={{ marginLeft: "20px", marginTop: "5px", fontSize: "1rem" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              marginRight: "10px",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              color: isActive ? "black" : "inherit",
            })}
          > {({ isActive }) => (
            <span
              style={{
                textDecoration: isActive ? "underline" : "none",
                cursor: "pointer",
              }}
            >
              Home
            </span>
          )}
          </NavLink>
          <NavLink
            to="/agreement"
            style={({ isActive }) => ({
              marginRight: "10px",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              color: isActive ? "black" : "inherit",
            })}
          >
             {({ isActive }) => (
            <span
              style={{
                textDecoration: isActive ? "underline" : "none",
                // cursor: "pointer",
              }}
            >
              Roommate Agreement Form
            </span>
          )}
          </NavLink>
        </div>
      </div>
      <div className="ml-2 d-flex align-items-center">
        {copyMessage && (
          <span className="text-success" 
            style={{ marginRight: "10px", marginTop: "-5px" }}>
            <span style={{ color: "#0a978d" }}>{copyMessage}</span>
          </span>
        )}
        <button className="btn"
          style={{
            marginRight: "10px",
            backgroundColor: "#00AA9E",
            borderColor: "#0a978d",
            color: "#ffffff", 
          }} 
          onClick={handleCopyLink}>
          Invite Roommates
        </button>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;