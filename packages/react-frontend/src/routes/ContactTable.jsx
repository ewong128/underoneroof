import React from "react";
import contactIcon from "../../contact.png";

function ContactTable({ contactData, removeContact }) {
  const contacts = Array.isArray(contactData) ? contactData : [];

  if (contacts.length === 0) {
    return (
      <table
        style={{
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <caption style={{ textAlign: "center" }}>No emergency contacts recorded. Please fill out the form.</caption>
      </table>
    );
  }

  return (
    <div style={{ margin: "40px 20px 20px 20px", padding: "20px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "10px" }}>
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
          src={contactIcon}
          alt="Contact Icon"
          style={{ width: "30px", height: "30px", marginRight: "7px", marginTop: "1px" }}
        />
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Emergency Contacts</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
        {contacts.map((contact, index) => (
          <div key={index} style={{ width: "calc(25% - 10px)", marginBottom: "20px", backgroundColor: "#f8f9fa", borderRadius: "15px", padding: "10px" }}>
            <h3 style={{ color: "#0a978d", fontSize: "1.5rem", borderBottom: "1.5px solid #0a978d", textAlign: "center" }}>
              {contact.username}'s Contact</h3>
            <div style={{ marginBottom: "10px" }}>
              <strong>Emergency Contact Relation:</strong>
              <div>{contact.emergencyContactRelation}</div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Emergency Contact Name:</strong>
              <div>{contact.emergencyContactName}</div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Emergency Contact Email:</strong>
              <div>{contact.emergencyContactEmail}</div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Emergency Contact Phone:</strong>
              <div>{contact.emergencyContactPhone}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => removeContact(index)}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactTable;
