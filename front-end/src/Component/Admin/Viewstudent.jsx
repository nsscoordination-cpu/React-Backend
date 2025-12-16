import React from 'react';
import './Viewstudent.css';

const students = [
  { name: 'Fida Saleem', department: 'BCA', regNo: 'MBAXBCA019', attendance: 85 },
  // You can add more students here
];

function Viewstudent() {
  return (
    <div className="container">
      <h1>Students</h1>
      <table className="view-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Reg. No</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.regNo}</td>
              <td>{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Viewstudent;
