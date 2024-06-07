import React from "react";
import checkIcon from "../../check.png";

function AgreementTable({ agreementData, removeAgreement }) {
  const agreements = Array.isArray(agreementData) ? agreementData : []; // if no agreements
  const currentUser = localStorage.getItem("current user");

  if (agreements.length === 0) {
    return (
      <table
        style={{
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <caption style={{ textAlign: "center" }}>
          No agreements submitted.
        </caption>
      </table>
    );
  }

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={checkIcon}
          alt="Check Icon"
          style={{
            width: "20px",
            height: "20px",
            marginRight: "7px",
            marginTop: "1px",
          }}
        />
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Emergency Contacts</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-starto",
        }}
      >
        {agreements.map((agreement, index) => (
          <div
            key={index}
            style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}
          >
            <h3 style={{ color: "#0a978d", fontSize: "1.5rem" }}>
              {" "}
              {currentUser}'s Contact{" "}
            </h3>
            <p>
              <strong>Emergency Contact Relation:</strong>{" "}
              <p>{agreement.emergencyContactRelation}</p>
            </p>
            <p>
              <strong>Emergency Contact Name:</strong>{" "}
              <p>{agreement.emergencyContactName}</p>
            </p>
            <p>
              <strong>Emergency Contact Email:</strong>{" "}
              <p>{agreement.emergencyContactEmail}</p>
            </p>
            <p>
              <strong>Emergency Contact Phone:</strong>{" "}
              <p>{agreement.emergencyContactPhone}</p>
            </p>
            <button
              onClick={() => removeAgreement(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#d9534f",
                borderColor: "#d43f3a",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgreementTable;
