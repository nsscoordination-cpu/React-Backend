import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';


function EditEvents() {
  const[name,setname]=useState("")
  const[date,setdate]=useState("")
  const[time,settime]=useState("")
  const[place,setplace]=useState("")
  const[eid,seteid]=useState("")
  const navigate= useNavigate()
  const{id}=useParams();
  console.log(id);

  const getdetails=async(req,res)=>{
    try{
        const res=await api.get(`/event/fetchdetails/${id}`)
        console.log(res);
        setname(res.data.details.name)
        // setdate(res.data.details.date)
         const formattedDate = res.data.details.date ? res.data.details.date.split("T")[0] : "";
    setdate(formattedDate);
        settime(res.data.details.time)
        setplace(res.data.details.place)
        seteid(res.data.details._id)

        
    }
    catch(e){
    console.log(e);

    
    }
  }
  
  useEffect(()=>{getdetails();},[])
  console.log(name,date,time,place,eid);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   const res=   await api.put(`/event/update/${eid}`, {name,date,time,place});
        alert(res.data.message || "Event edited successfully")
        console.log(res);
        navigate("/coordinatorHome")
        

    } catch (error) {
      console.error('Error updating coordinator:', error);
    }
  };
  


  return (
<div className='w-50 m-auto mt-5'>
<h1 className='text-center'> Edit Event</h1>
    <Form className='bg-secondary p-5' onSubmit={handleSubmit}>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Event Name</Form.Label>
        <Form.Control type="text" placeholder="Event is...." onChange={(e)=>setname(e.target.value)} value={name}/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>date</Form.Label>
        <Form.Control type="date" placeholder="Date" onChange={(e)=>setdate(e.target.value)}   value={date} />
      </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Time</Form.Label>
        <Form.Control type="time" placeholder="time" onChange={(e)=>settime(e.target.value)} value={time} />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PLACE</Form.Label>
        <Form.Control type="text" placeholder="Place" onChange={(e)=>setplace(e.target.value)} value={place}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        save
      </Button>
    </Form>
    </div>
  );
}

export default EditEvents