import React, { useState } from "react";
import "./HomepageCo.css";
import AddEvents from "./AddEvents";


// import Students from "./Students";
// import Performance from "./Performance";
import Event from "./Event";
// import Coordinators from "./Coordinators";
import GeneralPerformance from "./GeneralPerformance";
import ApproveStudent from "./ApproveStudents";
import Attendence from "./Attendence";


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

    return <></>;
  };

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
            className={activePage === "Performance" ? "active" : ""}
            onClick={() => setActivePage("Performance")}
          >
            Performance
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
        </ul>

        <button className="logout-btn">Logout</button>
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
