
import React, { useState } from "react";
import "./HomePage.css";
import ManageCordinators from "./ManageCordinators";
import Viewstudent from "./Viewstudent";
import StudentPerf from "./StudentPerf";
import ViewFeedback from "./ViewFeedback";
import AddCoordinator from "./AddCordinator";
import EditCordinator from "./EditCordinator";

// --- Pages ---
function DashboardPage() {

  return (
    <>
      <header className="topbar">
        <h1>Admin Dashboard</h1>
        <p className="signin">Signed in as <b>Admin</b></p>
      </header>

      <div className="cards">
        <div className="card"><h3>Total Students</h3><p>152</p></div>
        <div className="card"><h3>Total Coordinators</h3><p>12</p></div>
        <div className="card"><h3>Events Conducted</h3><p>34</p></div>
        <div className="card"><h3>Pending Complaints</h3><p>5</p></div>
      </div>

      <h2 className="section-title">Recent Activities</h2>
      <div className="activity-box">
        <ul>
          <li>✔ Student registration approved</li>
          <li>✔ Coordinator report submitted</li>
          <li>✔ New event added to schedule</li>
          <li>✔ Feedback received from user</li>
          <li>✔ Complaint marked as resolved</li>
        </ul>
      </div>
    </>
  );
}

function CoordinatorsPage() {
  return <h1>Coordinators Page</h1>;
}

function StudentsPage() {
  return <h1>Students Page</h1>;
}

function PerformancePage() {
  return <h1>Performance Page</h1>;
}

function FeedbackPage() {
  return <h1>Feedback Page</h1>;
}

function ComplaintsPage() {
  return <h1>Complaints Page</h1>;
}

// --- Main Component ---
function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
    const [pageData, setPageData] = useState(null);
  const goToPage = (page, data = null) => {
    setActivePage(page);
    setPageData(data);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <DashboardPage />;
    case "Coordinators":
        return <ManageCordinators goToPage={goToPage} />;

      case "AddCoordinator":
        return <AddCoordinator goToPage={goToPage} />;

      case "EditCoordinator":
        return <EditCordinator goToPage={goToPage} data={pageData} />;
      case "Students": return <Viewstudent />;
      case "Performance": return <StudentPerf />;
      case "Feedback": return <ViewFeedback />;
      // case "Complaints": return <ComplaintsPage />;
      default: return <DashboardPage />;
    }
  };

  const menuItems = [
    "Dashboard", "Coordinators", "Students", "Performance", "Feedback", "Complaints"
  ];

  return (
    <div className="layout">

      <aside className="sidebar">
        <h2 className="brand">NSS Coordination <br /><span>Admin Panel</span></h2>

        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <button className="logout-btn">Logout</button>
      </aside>

      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default AdminDashboard;
