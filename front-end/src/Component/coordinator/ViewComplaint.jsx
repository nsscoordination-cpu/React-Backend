import React from 'react'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ViewComplaint() {
  return (
   <div>
           <center><h1>
        Complaints

            </h1></center>
       
<div className='w-50 m-auto'>
             <FloatingLabel
        controlId="floatingTextarea"
        label="Event Type"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Complaints">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>

        <br></br>
        <Button variant="outline-info">Replay</Button>
        
    
        </div>
</div>
  )
}

export default ViewComplaint