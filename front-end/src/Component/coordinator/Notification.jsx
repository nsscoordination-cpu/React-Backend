import React from 'react'
import React, { useState, useEffect } from 'react';

function Notification() {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);

  const sendToAll = () => {
    alert("Notification sent to all students: " + message);
  };

  const sendNotification = (student) => {
    alert("Notification sent to " + student.name + ": " + message);
  };

  useEffect(() => {
    // Dummy student list for testing
    setStudents([
      { name: "Rahim", department: "CSE", regNo: "123" },
      { name: "Ahamed", department: "IT", regNo: "456" }
    ]);
  }, []);

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Send Notification to Students</h1>

      <textarea
        className="notification-text"
        placeholder="Enter notification message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button className="add-button" onClick={sendToAll} style={{ marginBottom: "20px" }}>
        Send to All Students
      </button>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Reg. No</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s, index) => (
              <tr key={index}>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>{s.regNo}</td>
                <td>
                  <button className="add-button" onClick={() => sendNotification(s)}>
                    Send
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "gray" }}>
                Loading students...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Notification