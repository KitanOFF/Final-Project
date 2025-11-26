import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Navbar from './components/navbar'
import Home  from './pages/home'
import Contact from './pages/Contact'
import MentorLandingPage from './pages/MentorLandingPage'
import LoginPage from './pages/LoginPage'
import DashBoard from './pages/DashBoard'
import Stats from './pages/Stats'
import MyStats from './pages/MyStats/MyStats'
import Signup from './pages/Signup'
import DashBoardMentor from './pages/DashBoardMentor/DashBoardMentor'
import Job from './pages/Job/Job'
import OpenJobs from './pages/OpenJobs/OpenJobs'
import JobsMentor from './pages/JobsMentor/JobsMentor'
import Mentors from './pages/Mentors/Mentors'
import ViewMentor from './pages/ViewMentor/ViewMentor'
import AIChatPanel from './components/AI/Ai'
import MentorInfo from './pages/Mentor/MentorInfo.jsx'  
function App() {

  return (
    <>
   <div className="wrapper">
      {/* <Navbar /> */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MentorPage" element={<MentorLandingPage />} /> {/* sredeno */}
          <Route path="/Contacts" element={<Contact />} />{/* sredeno */}
          <Route path="/LoginPage" element={<LoginPage/>}/>{/* sredeno */}
          <Route path="/DashBoard" element={<DashBoard/>}/>{/* sredeno */}
          <Route path='/Stats' element={<Stats/>}/>{/* DUPLIKAT BRISI */}
          <Route path='/MyStats' element={<MyStats/>}/>{/* sredeno */}
          <Route path='/Signup' element={<Signup/>}/> {/*Sredeno */}
          <Route path='/DashBoardMentor' element={<DashBoardMentor/>}/> {/* sredeno */}
          <Route path='/Job' element={<Job/>}/>{/* */}
          <Route path='/OpenJobs' element={<OpenJobs/>}/>{/* */}
          <Route path='/JobsMentor' element={<JobsMentor/>}/>{/* */}
          <Route path='/Mentors' element={<Mentors/>}/>{/* */}
          <Route path='/ViewMentor' element={<ViewMentor/>}/> {/* Sredeno  */}
          <Route path='/Ai' element={<AIChatPanel/>}/>
          <Route path='/MentorInfo' element={<MentorInfo/>}/>
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
    </>
  )
}


export default App
