import React from "react";

function PreferencesTable({ preferencesData, removePreference }) {
  const preferences = Array.isArray(preferencesData) ? preferencesData : []; // if no preferences

  if (preferences.length === 0) {
    return (
      <table
        style={{
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <caption style={{ textAlign: "center" }}>
          No roommate preferences recorded. Please fill out the form.
        </caption>
      </table>
    );
  }

  const renderFriendsAndGuests = (preference) => {
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Anytime: {preference.guestsPolicy.anyTime ? "Yes" : "No"}</li>
        <li>
          Study Hours: {preference.guestsPolicy.studyHours ? "Yes" : "No"}
        </li>
        <li>
          Midterms/Finals:{" "}
          {preference.guestsPolicy.midtermsFinals ? "Yes" : "No"}
        </li>
        <li>
          Advance Notice: {preference.guestsPolicy.advanceNotice ? "Yes" : "No"}
        </li>
        <li>
          Other:{" "}
          {preference.guestsPolicy.other
            ? `Yes: ${preference.guestsPolicy.guestsPolicyOther}`
            : "No"}
        </li>
      </ul>
    );
  };

  return (
    <div
      className="preferences-table-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0a978d" }}>
        Preferences
      </h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              Agreements
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              Preference
            </th>
          </tr>
        </thead>
        <tbody>
          {preferences.map((preference, index) => (
            <React.Fragment key={index}>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  1. Preferred Contact Method:
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.preferredContact}
                  {preference.preferredContact === "Other" &&
                    `: ${preference.preferredContactOther}`}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  2. Response Time:
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.responseTime}
                  {preference.responseTime === "Other" &&
                    `: ${preference.responseTimeOther}`}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  3. Challenging Conversation Method
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.challengingConversation}
                  {preference.challengingConversation === "Other" &&
                    `: ${preference.challengingConversationOther}`}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  4. Weekday Sleep Hours:
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.weekdaySleepHours}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  5. Weekend Sleep Hours:
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.weekendSleepHours}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  6. Quiet Studying on Weekdays:
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.quietStudyTime}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  7. When Studying, the House Should Be
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.studyHouseCondition}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  8. Sharing?
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {preference.sharingPossessions}
                </td>
              </tr>
              <tr>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  9. Friends and Guests May Come Over
                </td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                  {renderFriendsAndGuests(preference)}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={removePreference}
          style={{
            padding: "10px 20px",
            backgroundColor: "#d9534f",
            borderColor: "#d43f3a",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete All Preferences
        </button>
      </div>
    </div>
  );
}

export default PreferencesTable;
