import React, { useEffect, useState } from "react";
import "./StudentPerf.css";
import api from "../../api.jsx";

function StudentPerf() {
  const [studentsPerf, setStudentsPerf] = useState([]);

  // ✅ Fetch All Student Performance
  const fetchStudentsPerf = async () => {
    try {
      const res = await api.get("/admin/performance/allStudents");
      setStudentsPerf(res.data.performances || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentsPerf();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Student Performance</h1>

      {studentsPerf.length === 0 ? (
        <p>No performance records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Reg Year</th>
                <th>Attendance (%)</th>
                <th>Participation</th>
                <th>Remarks</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {studentsPerf.map((perf, index) => (
                <tr key={perf._id || index}>
                  <td>{index + 1}</td>
                  <td>{perf.studentId?.name}</td>
                  <td>{perf.studentId?.className?.toUpperCase()}</td>
                  <td>{perf.studentId?.regYear}</td>
                  <td>{perf.attendance}%</td>
                  <td>
                    <span
                      className={`badge ${
                        perf.participationLevel === "Excellent"
                          ? "bg-success"
                          : perf.participationLevel === "Good"
                          ? "bg-primary"
                          : "bg-warning"
                      }`}
                    >
                      {perf.participationLevel}
                    </span>
                  </td>
                  <td>{perf.remarks}</td>
                  <td>
                    {new Date(perf.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentPerf;
