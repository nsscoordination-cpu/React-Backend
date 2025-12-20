import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './Component/LoginPage'
import Viewstudent from './Component/Admin/Viewstudent'
import { Route, Routes } from 'react-router-dom'
import Attendence from './Component/coordinator/Attendence'
import AddCordinator from './Component/Admin/AddCordinator'
import StudentPerf from './Component/Admin/StudentPerf'
import ManageCordinators from './Component/Admin/ManageCordinators'
import Event from './Component/coordinator/Event'
import AddEvents from './Component/coordinator/AddEvents'
// import ViewComplaint from './Component/coordinator/ViewComplaint'
import ViewFeedback from './Component/Admin/ViewFeedback'
import ApproveStudent from './Component/coordinator/ApproveStudents'
import GeneralPerformance from './Component/coordinator/GeneralPerformance'
import HomePage from './Component/Admin/HomePage'
import CordinatorHome from './Component/coordinator/CordinatorHome'
import EditCordinator from './Component/Admin/EditCordinator'
import EditEvents from './Component/coordinator/EditEvents'
import ViewComplaint from './Component/Admin/ViewComplaint'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          cohhhhj {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      
      {/* <LoginPage/> */}
      {/* <Viewstudent></Viewstudent> */}
        <Routes>
          <Route path='/' element={<LoginPage></LoginPage>}/>
          <Route path='/Studentview' element={<Viewstudent></Viewstudent>} />
          <Route path='/attendence' element={<Attendence></Attendence>}/>
          <Route path='/AddCordinator' element={<AddCordinator></AddCordinator>}/>
          <Route path='/viewPerformance' element={<StudentPerf/>}/>
          <Route path='/Managecordinator' element={<ManageCordinators></ManageCordinators>}/>
          <Route path='/Events' element={<Event/>}/>
          <Route path='/AddEvents' element={<AddEvents></AddEvents>}/>   
          <Route path='/ViewComplaint' element={<ViewComplaint></ViewComplaint>}/>
          <Route path='/ViewFeedback' element={<ViewFeedback></ViewFeedback>}/>
          <Route path='/StudentApproval' element={<ApproveStudent></ApproveStudent>}/>
          {/* <Route path='/GeneralPerformance' element={<GeneralPerformance></GeneralPerformance>}/> */}
          <Route path='/rr' element={<GeneralPerformance/>}/>
          <Route path='/adminHomepage' element={<HomePage/>}/>
          <Route path='/coordinatorHome' element={<CordinatorHome/>}/>
          <Route path='/Edit' element={<EditCordinator/>}/>
          <Route path='/EditEvents/:id' element={<EditEvents/>}/>
          <Route path='/Notifications' element={<Notification></Notification>}/>
          <Route path='/AdminComplaint' element={<ViewComplaint></ViewComplaint>}/>
          



        </Routes>
       

    </>
  )
}

export default App
