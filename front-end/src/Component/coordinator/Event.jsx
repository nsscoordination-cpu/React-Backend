// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import './Event.css';
// import api from '../../api';
// import { useNavigate } from 'react-router-dom';

// function Event({goToAdd }) {

// const[events,setevent]=useState([])
//   const navigate= useNavigate()

//     const fetchevents=async(req,res)=>{
//     try{
//       const res=await api.get("/event/allevents")
//       console.log(res)
//       setevent(res.data.events)
//     }
//     catch(e){
//       console.log(e);
      
//     }
//   }

//   const handleDelete=async(id)=>{
//     try{
//     const res=await api.delete(`/event/deleteEvents/${id}`)
//     alert(res.data.message || "deleted successfully")
//     fetchevents();
//     }
//     catch(e){
//       console.log(e);
      
//     }
    
//   }
//   // useEffect(()=>{fetchevents()},[])
//   useEffect(() => { fetchevents(); }, []);
//   // const events = [
//   //   { name: "Children's Day", date: "Nov 14", place: "Mes College" },
//   //   { name: "Annual Day", date: "Dec 25", place: "Main Auditorium" },
//   // ];
// const handleEdit=(id)=>{
//   navigate(`/EditEvents/${id}`)
// }
//   return (
//     <div className="event-container">

//       {/* Title + Add Button */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3 className="event-title text-center flex-grow-1">UPDATE EVENTS</h3>

//         {/* Add Event Button - Top Right */}
//          <Button 
//           variant="success" 
//           className="add-btn ms-3"
//           onClick={goToAdd}      // 👈 THIS OPENS AddEvents PAGE
//         >
//           ADD EVENT
//         </Button>
//       </div>

//       <table className="event-table">
//         <thead>
//           <tr>
//             <th>Event Name</th>
//             <th>Date</th>
//             <th>Place</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event, index) => (
//             <tr key={index}>
//               <td>{event.name}</td>
//               <td>{event.date}</td>
//               <td>{event.place}</td>
//               <td>
//                 <Button variant="outline-info" className="edit-btn" onClick={()=>handleDelete(event._id)}>
//                   DELETE
//                 </Button>
//                 <Button variant="outline-info" className="edit-btn ms-1" onClick={()=>handleEdit(event._id)}>
//                   Edit
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Event;

import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col, Image, Spinner } from "react-bootstrap";
import "./Event.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Event({ goToAdd }) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // 📸 Photo modal states
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    try {
      const res = await api.get("/event/allevents");
      console.log(res);
      
      setEvents(res.data.events || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= DELETE EVENT =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await api.delete(`/event/deleteEvents/${id}`);
      alert(res.data.message || "Deleted successfully");
      fetchEvents();
    } catch (e) {
      console.log(e);
    }
  };

  // ================= EDIT EVENT =================
  const handleEdit = (id) => {
    navigate(`/EditEvents/${id}`);
  };

  // ================= OPEN PHOTOS =================
  const openPhotos = async (event) => {
    setSelectedEvent(event);
    setShowPhotos(true);
    setPhotos([]);

    try {
      setLoading(true);
      const res = await api.get(`/event/events/${event._id}/photos`);
      setPhotos(res.data.photos || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPLOAD PHOTOS =================
  const handleUpload = async () => {
    if (!files.length || !selectedEvent) {
      return alert("Select images first");
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("photos", f));

    try {
      setUploading(true);
      const res = await api.post(
        `/event/events/${selectedEvent._id}/photos`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setPhotos(res.data.photos || []);
      setFiles([]);
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE PHOTO =================
  const deletePhoto = async (photoId) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      const res = await api.delete(
        `/event/events/${selectedEvent._id}/photos/${photoId}`
      );
      setPhotos(res.data.photos || []);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="event-container">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="event-title flex-grow-1 text-center">
          UPDATE EVENTS
        </h3>

        <Button variant="success" onClick={goToAdd}>
          ADD EVENT
        </Button>
      </div>

      {/* ===== EVENTS TABLE ===== */}
      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Place</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.place}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </Button>

                <Button
                  size="sm"
                  variant="outline-primary"
                  className="ms-2"
                  onClick={() => handleEdit(event._id)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline-success"
                  className="ms-2"
                  onClick={() => openPhotos(event)}
                >
                  Photos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= PHOTO MODAL ================= */}
      <Modal
        show={showPhotos}
        onHide={() => setShowPhotos(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Event Photos {selectedEvent && `- ${selectedEvent.name}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Upload */}
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles([...e.target.files])}
            />
          </Form.Group>

          <Button
            variant="success"
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? "Uploading..." : "Upload Photos"}
          </Button>

          <hr />

          {/* Gallery */}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : photos.length === 0 ? (
            <p className="text-muted">No photos uploaded</p>
          ) : (
            <Row xs={2} md={4} className="g-3">
              {photos.map((photo) => (
                <Col key={photo._id}>
                  <div className="border p-2 rounded text-center">
                    <Image
                      src={`http://localhost:8000${photo.url}`}
                      thumbnail
                      style={{
                        height: "120px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      className="mt-2"
                      onClick={() => deletePhoto(photo._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPhotos(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Event;
