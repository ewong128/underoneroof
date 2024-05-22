import React from "react";
import checkIcon from "../../check.png";

function AgreementTable({ agreementData, removeAgreement }) {
    // if no agreements
    const agreements = Array.isArray(agreementData) ? agreementData : [];

    if (agreements.length === 0) {
      return (
        <table
          style={{
            margin: "20px auto", 
            padding: "20px",
            border: "1px solid #ccc",
          }}
        >
          <caption style={{ textAlign: "center" }}>No agreements submitted.</caption>
        </table>
      );
    }

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <div style={{ textAlign: "center", fontSize: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={checkIcon} alt="Check Icon" style={{ width: "20px", height: "20px", marginRight: "7px", marginTop: "1px" }} />
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Submitted Agreements</h2>
      </div>
      {agreements.map((agreement, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3> Roommate Agreement {index + 1}</h3>
          <p>
            <strong>Emergency Contact Relation:</strong> {agreement.emergencyContactRelation}
          </p>
          <p>
            <strong>Emergency Contact Name:</strong> {agreement.emergencyContactName}
          </p>
          <p>
            <strong>Emergency Contact Email:</strong> {agreement.emergencyContactEmail}
          </p>
          <p>
            <strong>Emergency Contact Phone:</strong> {agreement.emergencyContactPhone}
          </p>
          <button
            onClick={() => removeAgreement(index)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#d9534f",
              borderColor: "#d43f3a",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AgreementTable;
