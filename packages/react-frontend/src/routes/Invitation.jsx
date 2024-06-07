import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function Invitation(props) {
  const { mode } = props;
  const welcomeMessage = "Accept Invite!";
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  function submitForm() {
    const group_id = searchParams.get("group");
    props.handleSubmit(group_id).catch((error) => {
      console.log(error);
      setErrorMessage(error.message);
    });
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
      <h1>UnderOneRoof</h1>
      <p style={{ fontSize: "1rem", fontWeight: "300" }}>{welcomeMessage}</p>
      <form style={{ width: "50%" }}>
        <input
          type="button"
          value={"Accept Invitation"}
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
    </div>
  );
}

export default Invitation;
