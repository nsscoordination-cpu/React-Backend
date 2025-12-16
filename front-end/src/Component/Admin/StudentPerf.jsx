
    import React from 'react';
import './StudentPerf.jsx';

const students = [
  { name: 'Fida Saleem', event: 'Independence Day', score: 'Good' },
  // You can add more students here
];

function StudentPerf() {
  return (
    <div className="container">
      <h1>Student Performance</h1>
      <div className="card-container">
        {students.map((student, index) => (
          <div className="student-card" key={index}>
            <h2>{student.name}</h2>
            <p><strong>Event:</strong> {student.event}</p>
            <p><strong>Score:</strong> {student.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentPerf;
