// import React, { useEffect, useState } from 'react';
// import './Viewstudent.css';
// import api from '../../api';


// function Viewstudent() {
//     // ✅ Fetch All Students
//       const [students, setStudents] = useState([]);
    
//   const fetchStudents = async () => {
//     try {
//       const res = await api.get("/student/allStudents");
//       console.log(res);
      
//       setStudents(res.data.student || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);
//   return (
//     <div className="container">
//       <h1>Students</h1>
//       <table className="view-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Department</th>
//             <th>Phone</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, index) => (
//             <tr key={index}>
//               <td>{student.name}</td>
//               <td>{student.className}</td>
//               <td>{student.phone}</td>
//               <td>{student.attendance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Viewstudent;

import React, { useEffect, useState } from 'react';
import './Viewstudent.css';
import api from '../../api';
import { Modal, Button, Table } from 'react-bootstrap';

function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ✅ Fetch All Students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/student/allStudents");
      setStudents(res.data.student || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Open modal
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // ✅ Close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Students</h1>

      <table className="view-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.className}</td>
              <td>{student.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleViewDetails(student)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedStudent && (
            <>
            {/* ===== STUDENT PHOTO ===== */}
      <div className="text-center mb-3">
        <img
          src={`http://localhost:8000/uploads/${selectedStudent.photo}`}
          alt="Student"
          className="rounded-circle border"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
        />
        <h5 className="mt-2">{selectedStudent.name}</h5>
      </div>
            <Table bordered responsive>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{selectedStudent.name}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{selectedStudent.className}</td>
                </tr>
                <tr>
                  <th>Registration Year</th>
                  <td>{selectedStudent.regYear}</td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{selectedStudent.dob}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{selectedStudent.sex}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{selectedStudent.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{selectedStudent.email}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{selectedStudent.address}</td>
                </tr>
                <tr>
                  <th>Blood Group</th>
                  <td>{selectedStudent.blood}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{selectedStudent.height}</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{selectedStudent.weight}</td>
                </tr>
                <tr>
                  <th>Interests</th>
                  <td>{selectedStudent.interests}</td>
                </tr>
                <tr>
                  <th>Account Status</th>
                  <td>
                    {selectedStudent.commonKey?.status ? "Active" : "Inactive"}
                  </td>
                </tr>
                <tr>
                  <th>Created At</th>
                  <td>
                    {new Date(selectedStudent.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th>Last Updated</th>
                  <td>
                    {new Date(selectedStudent.updatedAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </Table>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Viewstudent;
