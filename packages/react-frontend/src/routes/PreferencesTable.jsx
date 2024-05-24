import React from "react";

function PreferencesTable({ preferencesData, removePreference }) {
    const preferences = Array.isArray(preferencesData) ? preferencesData : []; // if no contacts

    if (preferences.length === 0) {
        return (
        <table
            style={{
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ccc",
            }}
        >
            <caption style={{ textAlign: "center" }}>No roommmate preferences recorded. Please fill out the form.</caption>
        </table>
        );
    }

  return (
    <div className="preferences-table-container" style={{ padding: "20px", fontFamily: "Arial, sans-serif", margin: "0 auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0a978d" }}>Preferences</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Preference</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Value</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {preferencesData.map((preference, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Preferred Contact Method
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                {preference.preferredContact}
                {preference.preferredContact === "Other" && `: ${preference.preferredContactOther}`}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                <button onClick={() => removePreference(index)} style={{ padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
          {preferencesData.map((preference, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Response Time
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                {preference.responseTime}
                {preference.responseTime === "Other" && `: ${preference.responseTimeOther}`}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                <button onClick={() => removePreference(index)} style={{ padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
          {preferencesData.map((preference, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Challenging Conversation Method
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                {preference.challengingConversation}
                {preference.challengingConversation === "Other" && `: ${preference.challengingConversationOther}`}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                <button onClick={() => removePreference(index)} style={{ padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
          {preferencesData.map((preference, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Weekday Sleep Hours
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                {preference.weekdaySleepHours}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                <button onClick={() => removePreference(index)} style={{ padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
          {preferencesData.map((preference, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Weekend Sleep Hours
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                {preference.weekendSleepHours}
              </td>
              <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                <button onClick={() => removePreference(index)} style={{ padding: "5px 10px", backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreferencesTable;
