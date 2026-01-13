
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ManageCordinators from "./ManageCordinators";
import Viewstudent from "./Viewstudent";
import StudentPerf from "./StudentPerf";
import ViewFeedback from "./ViewFeedback";
import AddCoordinator from "./AddCordinator";
import EditCordinator from "./EditCordinator";
import { useNavigate } from "react-router-dom";
import ViewComplaint from "./ViewComplaint";
import api from "../../api";

// --- Pages ---
function DashboardPage({tstudents,te,tc,pc}) {

  

  return (
    <>
      <header className="topbar">
        <h1>Admin Dashboard</h1>
        <p className="signin">Signed in as <b>Admin</b></p>
      </header>

      <div className="cards">
        <div className="card"><h3>Total Students</h3><p>{tstudents}</p></div>
        <div className="card"><h3>Total Coordinators</h3><p>{tc}</p></div>
        <div className="card"><h3>Events Conducted</h3><p>{te}</p></div>
        <div className="card"><h3>Pending Complaints</h3><p>{pc}</p></div>
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

// function CoordinatorsPage() {
//   return <h1>Coordinators Page</h1>;
// }

// function StudentsPage() {
//   return <h1>Students Page</h1>;
// }

// function PerformancePage() {
//   return <h1>Performance Page</h1>;
// }

// function FeedbackPage() {
//   return <h1>Feedback Page</h1>;
// }

// function ComplaintsPage() {
//   return <h1>Complaints Page</h1>;
// }

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
      case "Dashboard": return <DashboardPage tstudents={Tstd} te={Tevent} tc={Tcord} pc={Pendingcmt}/>;
    case "Coordinators":
        return <ManageCordinators goToPage={goToPage} />;

      case "AddCoordinator":
        return <AddCoordinator goToPage={goToPage} />;

      case "EditCoordinator":
        return <EditCordinator goToPage={goToPage} data={pageData} />;
      case "Students": return <Viewstudent />;
      case "Performance": return <StudentPerf />;
      case "Feedback": return <ViewFeedback />;
      case "Complaints": return <ViewComplaint />;
      default: return <DashboardPage />;
    }
  };

  const menuItems = [
    "Dashboard", "Coordinators", "Students", "Performance", "Feedback", "Complaints"
  ];

    const navigate=useNavigate()

  const logout=async()=>{ 
navigate("/")
localStorage.clear()
  } 
  const [Tstd,setTstd] = useState("")
  const [Tevent,setTevent] = useState("")
  const [Tcord,setTcord] = useState("")
  const [Pendingcmt,setPendingcmt] = useState("")
    const admindashboardstats = async()=>{
        try{
        const res = await api.get("/admin/stats")
        console.log(res);
        setTstd(res.data.allstudents)
        setTevent(res.data.allEvents)
        setTcord(res.data.allcoordinators)
        setPendingcmt(res.data.pendingcomplaints)

        }
        catch(e){
          console.log(e);
          
        }
        
      }
      useEffect(()=>{admindashboardstats()},[])

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

        <button className="logout-btn" onClick={()=>logout()}>Logout</button>
      </aside>

      <main className="content">
        {renderPage()}
      </main>
    </div>
  );
}

export default AdminDashboard;
