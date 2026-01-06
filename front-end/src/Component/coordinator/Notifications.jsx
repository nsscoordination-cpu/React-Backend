// import React, { useEffect, useState } from "react";
// import { Form, Button, Alert, Card } from "react-bootstrap";
// import api from "../../api";

// function Notifications() {
//   const [selectedBatches, setSelectedBatches] = useState([]);
//   const [message, setMessage] = useState("");
//   const [Notification, setNotification] = useState("");
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

//   const currentYear = new Date().getFullYear();

//   // ✅ Toggle batch selection
//   const handleBatchToggle = (year) => {
//     setSelectedBatches((prev) =>
//       prev.includes(year)
//         ? prev.filter((y) => y !== year)
//         : [...prev, year]
//     );
//   };

//   // ✅ Send notification
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedBatches.length === 0 || !message.trim()) {
//       setAlert({
//         show: true,
//         message: "Please select at least one batch and enter a message.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       const res = await api.post("/coordinator/sendnotification", {
//         batches: selectedBatches,
//         message,
//       });

//       setAlert({
//         show: true,
//         message: "Notification sent successfully ✅",
//         variant: "success",
//       });
//       setMessage("");
//       setSelectedBatches([]);
//     } catch (err) {
//       console.error(err);
//       setAlert({
//         show: true,
//         message: "Failed to send notification ❌",
//         variant: "danger",
//       });
//     }
//   };
// const viewNoti = async ()=>{
//     try{
//         const res =await api.get("/coordinator/ViewAllnoti")
//         console.log(res);
//         setNotification(res.data.notification)
//     }
//     catch(e){
//         console.log(e);
//         alert("failed to get noti")
        
//     }
// }
//   useEffect(() => { viewNoti(); }, []);
//   return (
//     <div>
//     <Card className="p-4 shadow-sm bg-white">
//       <h5 className="text-primary fw-semibold mb-3">Send Notifications</h5>
//       <p>Send important updates or activity reminders to selected batches of students.</p>
//       <hr />

//       {alert.show && (
//         <Alert
//           variant={alert.variant}
//           dismissible
//           onClose={() => setAlert({ show: false })}
//         >
//           {alert.message}
//         </Alert>
//       )}

//       <Form onSubmit={handleSubmit}>
//         {/* 🔹 Select Batches */}
//         <Form.Group className="mb-3">
//           <Form.Label className="fw-semibold">Select Batches (Registration Year)</Form.Label>
//           <div className="d-flex flex-wrap gap-2">
//             {Array.from({ length: 4 }).map((_, i) => {
//               const year = currentYear - i;
//               const selected = selectedBatches.includes(String(year));
//               return (
//                 <Button
//                   key={year}
//                   variant={selected ? "primary" : "outline-primary"}
//                   onClick={() => handleBatchToggle(String(year))}
//                   className="rounded-pill"
//                   size="sm"
//                 >
//                   {year}
//                 </Button>
//               );
//             })}
//           </div>
//         </Form.Group>

//         {/* 🔹 Message Box */}
//         <Form.Group className="mb-3">
//           <Form.Label className="fw-semibold">Notification Message</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             placeholder="Type your message here..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </Form.Group>

//         {/* 🔹 Submit */}
//         <Button variant="success" type="submit">
//           Send Notification
//         </Button>
//       </Form>
//     </Card>
//     </div>
//   );
// }

// export default Notifications;

import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Card, Badge } from "react-bootstrap";
import api from "../../api";

function Notifications() {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const currentYear = new Date().getFullYear();

  // ✅ Toggle batch selection
  const handleBatchToggle = (year) => {
    setSelectedBatches((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year]
    );
  };

  // ✅ Send notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBatches.length === 0 || !message.trim()) {
      setAlert({
        show: true,
        message: "Please select at least one batch and enter a message.",
        variant: "warning",
      });
      return;
    }

    try {
      await api.post("/coordinator/sendnotification", {
        batches: selectedBatches,
        message,
      });

      setAlert({
        show: true,
        message: "Notification sent successfully ✅",
        variant: "success",
      });

      setMessage("");
      setSelectedBatches([]);
      viewNoti(); // 🔄 refresh list
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        message: "Failed to send notification ❌",
        variant: "danger",
      });
    }
  };

  // ✅ View last 10 notifications
  const viewNoti = async () => {
    try {
      const res = await api.get("/coordinator/ViewAllnoti");
      setNotifications(res.data.notification || []);
    } catch (e) {
      console.log(e);
      alert("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    viewNoti();
  }, []);

  return (
    <div className="container mt-4">
      {/* ================= SEND NOTIFICATION ================= */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="text-primary fw-semibold mb-2">
          Send Notifications
        </h5>
        <p className="text-muted">
          Send important updates or reminders to selected batches.
        </p>
        <hr />

        {alert.show && (
          <Alert
            variant={alert.variant}
            dismissible
            onClose={() => setAlert({ show: false })}
          >
            {alert.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* 🔹 Select Batches */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Select Batches (Registration Year)
            </Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => {
                const year = currentYear - i;
                const selected = selectedBatches.includes(String(year));
                return (
                  <Button
                    key={year}
                    variant={selected ? "primary" : "outline-primary"}
                    onClick={() => handleBatchToggle(String(year))}
                    className="rounded-pill"
                    size="sm"
                  >
                    {year}
                  </Button>
                );
              })}
            </div>
          </Form.Group>

          {/* 🔹 Message */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Notification Message
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Send Notification
          </Button>
        </Form>
      </Card>

      {/* ================= VIEW NOTIFICATIONS ================= */}
      <Card className="p-4 shadow-sm">
        <h5 className="text-primary fw-semibold mb-3">
          Recent Notifications
        </h5>

        {notifications.length === 0 ? (
          <p className="text-muted">No notifications available.</p>
        ) : (
          notifications.slice(0, 10).map((noti, index) => (
            <Card key={index} className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Text className="mb-2">
                      {noti.message}
                    </Card.Text>

                    {noti.batches?.length > 0 && (
                      <div className="mb-1">
                        {noti.batches.map((b, i) => (
                          <Badge
                            key={i}
                            bg="secondary"
                            className="me-1"
                          >
                            {b}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <small className="text-muted">
                    {new Date(noti.createdAt).toLocaleString()}
                  </small>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Card>
    </div>
  );
}

export default Notifications;
