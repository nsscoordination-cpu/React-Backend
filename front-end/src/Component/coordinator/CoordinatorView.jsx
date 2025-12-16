import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import api from "../../api";

function CoordinatorView({ goToPage }) {
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
        <Col><h1>Coordinators</h1></Col>
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
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CoordinatorView;
