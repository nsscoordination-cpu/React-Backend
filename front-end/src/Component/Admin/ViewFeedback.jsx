// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';

// function ViewFeedback() {
//   return (
//     <div>
//          <center><h1>
//         Feedbacks

//             </h1></center>
       
// <div className='w-50 m-auto'>
//              <FloatingLabel
//         controlId="floatingTextarea"
//         label="Event Type"
//         className="mb-3"
//       >
//         <Form.Control as="textarea" placeholder="Leave a comment here" />
//       </FloatingLabel>
//       <FloatingLabel controlId="floatingTextarea2" label="Feedbacks">
//         <Form.Control
//           as="textarea"
//           placeholder="Leave a comment here"
//           style={{ height: '100px' }}
//         />
//       </FloatingLabel>

//         <br></br>
//         <Button variant="outline-info">Replay</Button>
        
    
//         </div>

//     </div>
//   )
// }

// export default ViewFeedback

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import api from "../../api";

function ViewFeedback() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/coordinator/eventsall");
        setEvents(res.data.events || res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Fetch feedbacks for selected event
  const handleEventChange = async (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    setFeedbacks([]);

    if (!eventId) return;

    try {
      setLoading(true);
      const res = await api.get(
        `/coordinator/feedbacks/${eventId}`
      );
      console.log(res);
      
      setFeedbacks(res.data.eventfeedbacks || res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching feedbacks", err);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center text-info fw-bold">
            Event Feedback Viewer
          </h2>
        </Col>
      </Row>

      {/* 🔽 Event Selector */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form.Select
            value={selectedEvent}
            onChange={handleEventChange}
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.eventName || event.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* 🔄 Loader */}
      {loading && (
        <Row className="text-center">
          <Spinner animation="border" variant="info" />
        </Row>
      )}

      {/* 📋 Feedback List */}
      {!loading && feedbacks.length > 0 && (
        <Row>
          {feedbacks.map((item, index) => (
            <Col md={6} key={index} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  {/* <Card.Title className="text-primary">
                    Student: {item.studentId?.name || "Anonymous"}
                  </Card.Title> */}

                  <Card.Text className="mt-2">
                    <strong>Feedback:</strong>
                    <br />
                    {item.feedback}
                  </Card.Text>

                  <Card.Text>
                    <strong>Rating:</strong> ⭐ {item.rating}/5
                  </Card.Text>

                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ❌ No Feedback */}
      {!loading && selectedEvent && feedbacks.length === 0 && (
        <Row className="text-center mt-4">
          <Col>
            <p className="text-muted">No feedbacks found for this event.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ViewFeedback;
