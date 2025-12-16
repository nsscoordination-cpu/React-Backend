// import React, { useEffect } from 'react'
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import { Col, Row } from 'react-bootstrap';
// import api from '../../api';
// import { useState } from 'react';
// function ManageCordinators() {
//   const [cordinator,setcordinator]=useState([])
//   const getcordinators=async()=>{
//     try{
//       const res=await api.get("/coordinator/all")
//       console.log (res)
//       setcordinator(res.data.coordinators)
  
//     }
//     catch(error){
//       console.log (error) 
//     }
//   }
//   useEffect (()=>{getcordinators()},[])
//   return (
//     <div>
//         <Row className="align-items-center mb-3">
//         {/* Center the heading */}
//         <Col xs={12} md={6} className="text-end">
//           <h1>Manage Coordinator</h1>
//         </Col>

//         {/* Align ADD button to the right */}
//         <Col xs={12} md={6} className="text-md-end text-center">
//           <Button variant="outline-success" className="mt-2 me-5">
//             <b>ADD</b>
//           </Button>
//         </Col>
//       </Row>
//      <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Cordinator NO</th>
//           <th className='text-danger'>Name</th>
//           <th>Email</th>
//           <th>phone no</th>
//           <th>Department</th>
//           <th>action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cordinator.length>0?(
//           cordinator.map((c,index)=>(
//             <tr key={c._id}>
//           <td >{index+1}</td>
//           <td>{c.name}</td>
//           <td>{c.email}</td>
//           <td>{c.phone}</td>
//           <td>{c.department}</td>
//           <td className='Button'>    <Button variant="outline-info " className='me-2'>EDIT</Button>
//       <Button variant="outline-danger">DELETE</Button></td>
//         </tr>

//           ))):(
//             <h1></h1>
//           )
//         }
        
    
//       </tbody>
//     </Table>
//         </div>
     
   
//   )
// }

// export default ManageCordinators
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import api from "../../api";

function ManageCordinators({ goToPage }) {
  const [coordinators, setCoordinators] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/coordinator/all");
      setCoordinators(res.data.coordinators);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/coordinator/delete/${id}`);
    load();
  };

  return (
    <div>
      <Row className="align-items-center mb-3">
        <Col><h1>Manage Coordinator</h1></Col>
        <Col className="text-end">
          <Button
            variant="outline-success"
            onClick={() => goToPage("AddCoordinator")}
          >
            ADD
          </Button>
        </Col>
      </Row>

      <Table bordered hover striped>
        <thead>
          <tr>
            <th>No</th><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {coordinators.map((c, i) => (
            <tr key={c._id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.department}</td>

              <td>
                <Button
                  variant="outline-info"
                  className="me-2"
                  onClick={() => goToPage("EditCoordinator", c)}
                >
                  EDIT
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(c._id)}
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageCordinators;
