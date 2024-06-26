import React, { useState } from "react";

function PreferencesForm(props) {
  const [formData, setFormData] = useState({
    preferredContact: "",
    preferredContactOther: "",
    responseTime: "",
    responseTimeOther: "",
    challengingConversation: "",
    challengingConversationOther: "",
    weekdaySleepHours: "",
    weekendSleepHours: "",
    quietStudyTime: "",
    studyHouseCondition: "",
    sharingPossessions: "",
    guestsPolicy: {
      anyTime: false,
      studyHours: false,
      midtermsFinals: false,
      advanceNotice: false,
      other: false,
      guestsPolicyOther: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleGuestsPolicyChange(event) {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      guestsPolicy: { ...prevData.guestsPolicy, [name]: checked },
    }));
  }

  function validateForm(data) {
    let validationErrors = {};
    if (!data.preferredContact)
      validationErrors.preferredContact =
        "Preferred contact method is required";
    if (data.preferredContact === "Other" && !data.preferredContactOther)
      validationErrors.preferredContactOther =
        "Please specify the preferred contact method";
    if (!data.responseTime)
      validationErrors.responseTime = "Response time is required";
    if (data.responseTime === "Other" && !data.responseTimeOther)
      validationErrors.responseTimeOther = "Please specify the response time";
    if (!data.challengingConversation)
      validationErrors.challengingConversation =
        "Challenging conversation method is required";
    if (
      data.challengingConversation === "Other" &&
      !data.challengingConversationOther
    )
      validationErrors.challengingConversationOther =
        "Please specify the conversation method";
    if (!data.weekdaySleepHours)
      validationErrors.weekdaySleepHours = "Weekday sleep hours are required";
    if (!data.weekendSleepHours)
      validationErrors.weekendSleepHours = "Weekend sleep hours are required";
    if (!data.quietStudyTime)
      validationErrors.quietStudyTime = "Quiet study time is required";
    if (!data.studyHouseCondition)
      validationErrors.studyHouseCondition =
        "Study house condition is required";
    if (!data.sharingPossessions)
      validationErrors.sharingPossessions =
        "Sharing possessions policy is required";
    if (data.guestsPolicy.other && !data.guestsPolicy.guestsPolicyOther)
      validationErrors.guestsPolicyOther = "Please specify the guest policy";

    return validationErrors;
  }

  function submitForm(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const submissionData = { ...formData };
    if (formData.preferredContact !== "Other") {
      delete submissionData.preferredContactOther;
    }
    if (formData.responseTime !== "Other") {
      delete submissionData.responseTimeOther;
    }
    if (formData.challengingConversation !== "Other") {
      delete submissionData.challengingConversationOther;
    }
    if (!formData.guestsPolicy.other) {
      delete submissionData.guestsPolicy.guestsPolicyOther;
    }

    props.handleSubmit(submissionData);

    setFormData({
      preferredContact: "",
      preferredContactOther: "",
      responseTime: "",
      responseTimeOther: "",
      challengingConversation: "",
      challengingConversationOther: "",
      weekdaySleepHours: "",
      weekendSleepHours: "",
      quietStudyTime: "",
      studyHouseCondition: "",
      sharingPossessions: "",
      guestsPolicy: {
        anyTime: false,
        studyHours: false,
        midtermsFinals: false,
        advanceNotice: false,
        other: false,
        guestsPolicyOther: "",
      },
    });

    setErrors({});
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={submitForm}
      className="preferences-form-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0a978d" }}>
        Communication Preferences
      </h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          1. Our preferred method of contact is:
        </label>
        <select
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Text">Text</option>
          <option value="Call">Call</option>
          <option value="Email">Email</option>
          <option value="Other">Other (please specify)</option>
        </select>
        {formData.preferredContact === "Other" && (
          <input
            type="text"
            name="preferredContactOther"
            value={formData.preferredContactOther}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              marginTop: "5px",
            }}
            placeholder="Please specify"
          />
        )}
        {errors.preferredContact && (
          <span style={{ color: "red" }}>{errors.preferredContact}</span>
        )}
        {errors.preferredContactOther && (
          <span style={{ color: "red" }}>{errors.preferredContactOther}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          2. We will respond to each other's messages:
        </label>
        <select
          name="responseTime"
          value={formData.responseTime}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Within 12 hours">Within 12 hours</option>
          <option value="Within 24 hours">Within 24 hours</option>
          <option value="Within 48 hours">Within 48 hours</option>
          <option value="Other">Other (please specify)</option>
        </select>
        {formData.responseTime === "Other" && (
          <input
            type="text"
            name="responseTimeOther"
            value={formData.responseTimeOther}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              marginTop: "5px",
            }}
            placeholder="Please specify"
          />
        )}
        {errors.responseTime && (
          <span style={{ color: "red" }}>{errors.responseTime}</span>
        )}
        {errors.responseTimeOther && (
          <span style={{ color: "red" }}>{errors.responseTimeOther}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          3. If we need to have a challenging or uncomfortable conversation, we
          will:
        </label>
        <select
          name="challengingConversation"
          value={formData.challengingConversation}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Have it right then and there">
            Have it right then and there
          </option>
          <option value="Give each other some time to calm down or cool off before sitting down to talk">
            Give each other some time to calm down or cool off before sitting
            down to talk
          </option>
          <option value="Schedule a time to chat at least hours or days in advance">
            Schedule a time to chat at least hours or days in advance
          </option>
          <option value="Other">Other (please specify)</option>
        </select>
        {formData.challengingConversation === "Other" && (
          <input
            type="text"
            name="challengingConversationOther"
            value={formData.challengingConversationOther}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              marginTop: "5px",
            }}
            placeholder="Please specify"
          />
        )}
        {errors.challengingConversation && (
          <span style={{ color: "red" }}>{errors.challengingConversation}</span>
        )}
        {errors.challengingConversationOther && (
          <span style={{ color: "red" }}>
            {errors.challengingConversationOther}
          </span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          4. On weekdays (Monday-Friday), we will set aside the following hours
          for sleeping:
        </label>
        <input
          type="text"
          name="weekdaySleepHours"
          value={formData.weekdaySleepHours}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          placeholder="e.g., 10 PM - 6 AM"
        />
        {errors.weekdaySleepHours && (
          <span style={{ color: "red" }}>{errors.weekdaySleepHours}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          5. On weekends (Saturday-Sunday), we will set aside the following
          hours for sleeping:
        </label>
        <input
          type="text"
          name="weekendSleepHours"
          value={formData.weekendSleepHours}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          placeholder="e.g., 11 PM - 7 AM"
        />
        {errors.weekendSleepHours && (
          <span style={{ color: "red" }}>{errors.weekendSleepHours}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          6. On weekdays (Monday-Friday), a reasonable time for quiet studying
          in our room is:
        </label>
        <select
          name="quietStudyTime"
          value={formData.quietStudyTime}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Mornings">Mornings</option>
          <option value="Afternoons">Afternoons</option>
          <option value="Evenings">Evenings</option>
          <option value="Late nights">Late nights</option>
        </select>
        {errors.quietStudyTime && (
          <span style={{ color: "red" }}>{errors.quietStudyTime}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          7. When studying, the house should be:
        </label>
        <select
          name="studyHouseCondition"
          value={formData.studyHouseCondition}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Silent">Silent</option>
          <option value="Minimal background noise">
            Minimal background noise (e.g., low music or television) is OK
          </option>
        </select>
        {errors.studyHouseCondition && (
          <span style={{ color: "red" }}>{errors.studyHouseCondition}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          8. We're OK with sharing our possessions and supplies with each other:
        </label>
        <select
          name="sharingPossessions"
          value={formData.sharingPossessions}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">Select...</option>
          <option value="Never">Never</option>
          <option value="Sometimes">
            Sometimes—just remember to ask permission first
          </option>
        </select>
        {errors.sharingPossessions && (
          <span style={{ color: "red" }}>{errors.sharingPossessions}</span>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          9. Friends and guests may come over (check all that apply):
        </label>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "normal", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="anyTime"
              checked={formData.guestsPolicy.anyTime}
              onChange={handleGuestsPolicyChange}
              style={{ marginRight: "10px" }}
            />
            Any time
          </label>
          <label style={{ fontWeight: "normal", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="studyHours"
              checked={formData.guestsPolicy.studyHours}
              onChange={handleGuestsPolicyChange}
              style={{ marginRight: "10px" }}
            />
            During study hours
          </label>
          <label style={{ fontWeight: "normal", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="midtermsFinals"
              checked={formData.guestsPolicy.midtermsFinals}
              onChange={handleGuestsPolicyChange}
              style={{ marginRight: "10px" }}
            />
            During midterms/finals
          </label>
          <label style={{ fontWeight: "normal", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="advanceNotice"
              checked={formData.guestsPolicy.advanceNotice}
              onChange={handleGuestsPolicyChange}
              style={{ marginRight: "10px" }}
            />
            With advance notice of hours or days
          </label>
          <label style={{ fontWeight: "normal", marginBottom: "5px" }}>
            <input
              type="checkbox"
              name="other"
              checked={formData.guestsPolicy.other}
              onChange={handleGuestsPolicyChange}
              style={{ marginRight: "10px" }}
            />
            Other (please specify)
          </label>
          {formData.guestsPolicy.other && (
            <input
              type="text"
              name="guestsPolicyOther"
              value={formData.guestsPolicy.guestsPolicyOther}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                marginTop: "5px",
              }}
              placeholder="Please specify"
            />
          )}
        </div>
        {errors.guestsPolicy && (
          <span style={{ color: "red" }}>{errors.guestsPolicy}</span>
        )}
        {errors.guestsPolicyOther && (
          <span style={{ color: "red" }}>{errors.guestsPolicyOther}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00AA9E",
          borderColor: "#0a978d",
          color: "#fff",
          fontSize: "16px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          borderRadius: "5px",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default PreferencesForm;
