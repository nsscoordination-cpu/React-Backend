import React, { useEffect, useState } from "react";
import { Table, Alert, Form, Card } from "react-bootstrap";
import api from "../../api";

function ViewStudentPerformanceCORD() {
  const [performances, setPerformances] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterLevel, setFilterLevel] = useState("All");

  // ✅ Fetch all performances
  const fetchPerformances = async () => {
    try {
      const res = await api.get("/coordinator/performances");
      console.log(res);
      
      setPerformances(res.data.performances || []);
      setFiltered(res.data.performances || []);
    } catch (e) {
      console.error(e);
      setAlert({
        show: true,
        message: "Failed to load performances.",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    fetchPerformances();
  }, []);

  // ✅ Filter by participation level
  const handleFilter = (value) => {
    setFilterLevel(value);
    if (value === "All") {
      setFiltered(performances);
    } else {
      setFiltered(performances.filter((p) => p.participationLevel === value));
    }
  };

  const handleDelete = async(id)=>{
    console.log(id);
    try{
      const res = await api.delete(`/coordinator/delete/performance/${id}`)
      console.log(res);
      alert("Deleted Succesfully");
      fetchPerformances()
      
    }
    catch(e){
      console.log(e);
      alert("Deletion failed");
      
    }
    
  }

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary fw-semibold">Student Performance Report</h5>

        {/* 🔹 Filter Dropdown */}
        <Form.Select
          style={{ width: "200px" }}
          value={filterLevel}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="All">All Levels</option>
          <option value="Excellent">Excellent</option>
          <option value="Active">Active</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
        </Form.Select>
      </div>

      {/* 🔹 Alert */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert({ show: false })}
        >
          {alert.message}
        </Alert>
      )}

      {/* 🔹 Table */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Admission Year</th>
              <th>Participation</th>
              <th>Attendance (%)</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.studentId?.name || "-"}</td>
                  <td>{item.studentId?.className || "-"}</td>
                  <td>{item.studentId?.regYear || "-"}</td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        item.participationLevel === "Excellent"
                          ? "bg-success"
                          : item.participationLevel === "Active"
                          ? "bg-primary"
                          : item.participationLevel === "Average"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {item.participationLevel}
                    </span>
                  </td>
                  <td>{item.attendance}%</td>
                  <td>{item.remarks}</td>
                  <td><button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No performance data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewStudentPerformanceCORD;
