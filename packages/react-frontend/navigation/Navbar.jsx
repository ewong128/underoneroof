import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

const Navbar = ({ handleLogout, copyLink }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const navigate = useNavigate();

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   // For demonstration purposes, we navigate to a search results page with the query as a URL parameter
  //   navigate(`/search?query=${searchQuery}`);
  // };

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
        <span className="ml-2" style={{ lineHeight: "30px", marginTop: "5px" }}>UnderOneRoof</span>
      </div>
      {/* <form className="form-inline ml-auto d-flex align-items-center" onSubmit={handleSearchSubmit}>
        <input
          className="form-control mr-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form> */}
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
            color: "#ffffff", // Text color
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
