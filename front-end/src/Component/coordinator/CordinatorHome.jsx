import React, { useState } from "react";
import "./HomepageCo.css";
import AddEvents from "./AddEvents";


// import Students from "./Students";
// import Performance from "./Performance";
import Event from "./Event";
// import Coordinators from "./Coordinators";
// import GeneralPerformance from "./GeneralPerformance";
import ApproveStudent from "./ApproveStudents";
import Attendence from "./Attendence";
import { useNavigate } from "react-router-dom";
import ViewStudentPerformanceCORD from "./ViewStudentPerformanceCORD";
import StudentPerformanceCORD from "./StudentPerformanceCORD";
import Notifications from "./Notifications";
import ViewFeedback from "../Admin/ViewFeedback";


function CoordinatorHome() {
  const [activePage, setActivePage] = useState("Dashboard"); // DEFAULT

  const renderPage = () => {
    
    if (activePage === "Dashboard") {
  return (
    <div className="dashboard">

      <h2 className="dash-title">Coordinator Dashboard Overview</h2>

      {/* Statistic Cards */}
      <div className="dash-cards">

        <div className="dash-card">
          <div className="card-icon students">👥</div>
          <div className="card-info">
            <p>Total Students</p>
            <h3>120</h3>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-icon volunteers">⭐</div>
          <div className="card-info">
            <p>Active Volunteers</p>
            <h3>85</h3>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-icon complaints">⚠️</div>
          <div className="card-info">
            <p>Pending Complaints</p>
            <h3>3</h3>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-icon events">📅</div>
          <div className="card-info">
            <p>Upcoming Events</p>
            <h3>2</h3>
          </div>
        </div>

      </div>

      {/* Recent Section */}
      <div className="recent-section">
        <h3>Recent Activities</h3>
        
        <ul className="recent-list">
          <li>✔ Volunteer registration updated</li>
          <li>✔ Complaint #12 resolved</li>
          <li>✔ Event “Blood Donation Camp” scheduled</li>
          <li>✔ New coordinator assigned to Commerce Dept</li>
        </ul>
      </div>

    </div>
  );
}


    // if (activePage === "Students") return <Students />;
    if (activePage === "Performance") return <GeneralPerformance />;
    // if (activePage === "Coordinators") return <Coordinators/>;
if (activePage === "Event") 
    return <Event goToAdd={() => setActivePage("AddEvent")} />;

if (activePage === "AddEvent") return <AddEvents />;
if (activePage === "Students") 
    return <ApproveStudent></ApproveStudent>;

if(activePage ==="Attendence") return <Attendence />;
if(activePage ==="ViewPerformance") return <ViewStudentPerformanceCORD />
if(activePage ==="AddPerformance") return <StudentPerformanceCORD />
if(activePage ==="SentNotifications") return <Notifications />
if(activePage ==="ViewFeedback") return <ViewFeedback />
    return <></>;
  };


  
    const navigate=useNavigate()
    
      const logout=async()=>{ 
    navigate("/")
    localStorage.clear()
      } 
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">
          NSS Coordination <br />
          <span>Coordinator Panel</span>
        </h2>

        <ul className="menu">
          <li
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activePage === "Students" ? "active" : ""}
            onClick={() => setActivePage("Students")}
          >
            Students
          </li>

          <li
            className={activePage === "AddPerformance" ? "active" : ""}
            onClick={() => setActivePage("AddPerformance")}
          >
           Add Performance
          </li>
          <li
            className={activePage === "Event" ? "active" : ""}
            onClick={() => setActivePage("Event")}
          >
            Events
          </li>

          <li
            className={activePage === "Attendence" ? "active" : ""}
            onClick={() => setActivePage("Attendence")}
          >
            Attendence

          </li>
           <li
            className={activePage === "ViewPerformance" ? "active" : ""}
            onClick={() => setActivePage("ViewPerformance")}
          >
            View Performance

          </li>
           <li
            className={activePage === "SentNotifications" ? "active" : ""}
            onClick={() => setActivePage("SentNotifications")}
          >
             Sent Notifications

          </li>
          <li
            className={activePage === "ViewFeedback" ? "active" : ""}
            onClick={() => setActivePage("ViewFeedback")}
          >
             View Feedback

          </li>
          
        </ul>

        <button className="logout-btn"  onClick={()=>logout()}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">
          <h1>{activePage}</h1>
        </header>

        {renderPage()} {/* 👈 Default = Dashboard */}
      </main>
    </div>
  );
}

export default CoordinatorHome;
