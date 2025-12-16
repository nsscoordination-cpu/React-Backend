import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import api from '../../api';


function AddEvents() {
  const[name,setname]=useState("")
  const[date,setdate]=useState("")
  const[time,settime]=useState("")
  const[place,setplace]=useState("")
  const navigate= useNavigate()
  const handlesubmit=async (e)=>{
    e.preventDefault();
    const  body = {name,date,time,place}
    console.log(body);
    try{

     const response=await api.post("/event",body)
     console.log(response);
      alert(response.data.message || "added successfully")
      // navigate("/Events")
      window.location.reload();

      


    }
    catch(e){
      console.log(e);
      alert(e.response.data.message)
      
    }

    
  }



  return (
<div className='w-50 m-auto mt-5'>
<h1 className='text-center'> Add Event</h1>
    <Form className='bg-secondary p-5' onSubmit={handlesubmit}>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Event Name</Form.Label>
        <Form.Control type="text" placeholder="Event is...." onChange={(e)=>setname(e.target.value)} />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>date</Form.Label>
        <Form.Control type="date" placeholder="Date" onChange={(e)=>setdate(e.target.value)} />
      </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Time</Form.Label>
        <Form.Control type="time" placeholder="time" onChange={(e)=>settime(e.target.value)} />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PLACE</Form.Label>
        <Form.Control type="text" placeholder="Place" onChange={(e)=>setplace(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        save
      </Button>
    </Form>
    </div>
  );
}

export default AddEvents