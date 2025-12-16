import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Event.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

function Event({goToAdd }) {

const[events,setevent]=useState([])
  const navigate= useNavigate()

    const fetchevents=async(req,res)=>{
    try{
      const res=await api.get("/event/allevents")
      console.log(res)
      setevent(res.data.events)
    }
    catch(e){
      console.log(e);
      
    }
  }

  const handleDelete=async(id)=>{
    try{
    const res=await api.delete(`/event/deleteEvents/${id}`)
    alert(res.data.message || "deleted successfully")
    fetchevents();
    }
    catch(e){
      console.log(e);
      
    }
    
  }
  // useEffect(()=>{fetchevents()},[])
  useEffect(() => { fetchevents(); }, []);
  // const events = [
  //   { name: "Children's Day", date: "Nov 14", place: "Mes College" },
  //   { name: "Annual Day", date: "Dec 25", place: "Main Auditorium" },
  // ];
const handleEdit=(id)=>{
  navigate(`/EditEvents/${id}`)
}
  return (
    <div className="event-container">

      {/* Title + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="event-title text-center flex-grow-1">UPDATE EVENTS</h3>

        {/* Add Event Button - Top Right */}
         <Button 
          variant="success" 
          className="add-btn ms-3"
          onClick={goToAdd}      // 👈 THIS OPENS AddEvents PAGE
        >
          ADD EVENT
        </Button>
      </div>

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
                <Button variant="outline-info" className="edit-btn" onClick={()=>handleDelete(event._id)}>
                  DELETE
                </Button>
                <Button variant="outline-info" className="edit-btn ms-1" onClick={()=>handleEdit(event._id)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Event;
