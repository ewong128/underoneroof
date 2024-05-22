import React, { useState } from "react";

function AgreementForm(props) {
  const [formData, setFormData] = useState({
    emergencyContactRelation: "",
    emergencyContactName: "",
    emergencyContactEmail: "",
    emergencyContactPhone: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function submitForm() {
    props.handleSubmit(formData);
    setFormData({
      emergencyContactRelation: "",
      emergencyContactName: "",
      emergencyContactEmail: "",
      emergencyContactPhone: "",
    });
  }

  return (
    <div className="agreement-form-container" style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0a978d" }}>Emergency Contacts</h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Emergency Contact Relation:</label>
        <input
          type="text"
          name="emergencyContactRelation"
          value={formData.emergencyContactRelation}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Emergency Contact Name:</label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Emergency Contact Email:</label>
        <input
          type="email"
          name="emergencyContactEmail"
          value={formData.emergencyContactEmail}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Emergency Contact Phone:</label>
        <input
          type="text"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>
      <button
        onClick={submitForm}
        style={{ padding: "10px 20px", backgroundColor: "#00AA9E", borderColor: "#0a978d", color: "#fff", fontSize: "16px", cursor: "pointer", borderRadius: "5px" }}
      >
        Submit
      </button>
    </div>
  );
}

export default AgreementForm;
