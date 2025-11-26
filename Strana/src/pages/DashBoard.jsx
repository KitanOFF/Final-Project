
import "./DashBoard.css";
import React, { useState } from "react";
import StatisticsCard from "../components/StatisticsCard";
import { useNavigate } from "react-router-dom";
import Logout from "../components/LogOut";
import AiButton from "../components/AiButton/AiButton";
import AssignJobsStartUp from "../components/AssignJobsStartUp/AssignJobsStartUp";

const jobsData = [
  { id: 1, title: "Revenue per rate", status: "DONE" },
  { id: 2, title: "ARPU (Average revenue per use)", status: "REJECTED" },
  { id: 3, title: "CAC (Custom Acquisition Cost)", status: "IN PROGRESS" },
  { id: 4, title: "Churn Rate", status: "DONE" },
  { id: 5, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 6, title: "Operation Efficiency", status: "DONE" },
  { id: 7, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 8, title: "Operation Efficiency", status: "DONE" },
  { id: 9, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 10, title: "Operation Efficiency", status: "DONE" },
];


const mentors = [
  {
    name: "Lucie Weber",
    image: "lucie.png", 
    jobs: 18,
  },
  {
    name: "Crystal Porter",
    image: "./crystal.png",
    jobs: 51,
  },
  {
    name: "Thomas Rose",
    image: "./thomas.png",
    jobs: 22,
  },
];
// mentori ove nad 


function DashBoard() {

    const navigate = useNavigate();

    const [filter, setFilter] = useState("ALL");

  const filteredJobs =
    filter === "ALL" ? jobsData : jobsData.filter((job) => {
      if (filter === "DONE") return job.status === "DONE";
      if (filter === "REJECTED") return job.status === "REJECTED";
      if (filter === "IN PROGRESS") return job.status === "IN PROGRESS";
      return true;
    });



  return(
  <div>
    <div className="Main-Container">
    {/* LEEV DASH */}
   <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img"/>
        </div>
        <button className="collapse-btn">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left"/>
        </button>
      </div>

      <div className="sidebar-menu">
        <div className="menu-item" onClick={() => navigate("/dashboard")}>
          <img src="profile.svg" className="menu-icon" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item active" onClick={() => navigate("/mentors")}>
          <img src="4koc.png" className="menu-icon" />
          <p>Mentors</p>
        </div>

        <div className="menu-item" onClick={() => navigate("/Job")}>
          <img src="disc.png" className="menu-icon" />
          <p>Jobs</p>
        </div>
        <AiButton/>
      </div>

      <Logout/>
    </div>
    {/* LEVDASH  nagore*/}
    <div className="Mentor-Container">
      {/* search bar */}
      <div className="header-container">
      <div className="search-wrapper">
        <input  type="text" className="search-input" placeholder="Search Mentor..." />
      </div>
      <div className="company-profile">
        <img src="/Logo-Dash.jpg" alt="Logo" className="company-logo" />
        <span className="company-text">TechWave Innovations</span>
      </div>
    </div>
      {/* seradc */}
    <div className="dashboard-content">
  <div className="jobs-section card-box">
    {/* Assigned Jobs */}
    {/* <div className="assigned-jobs">
      <h2>Assigned Jobs</h2>
      <div className="tabs">
        {["ALL", "DONE", "REJECTED", "IN PROGRESS"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="job-list">
  {filteredJobs.map((job) => (
    <div key={job.id} className="job-card">
      <span className="job-title">{job.title}</span>
      <span className={`job-status status-${job.status.toLowerCase().replace(" ", "-")}`}>
        {job.status}
      </span>
    </div>
  ))}
</div>

    </div> */}
    <AssignJobsStartUp/>
    {/* jobssssssssss */}
  </div>
  <div className="mentors-section">
    <div className="card-box">
      {/* Best Performing Mentors */}
      <div className="mentor-section">
      <h3 className="mentor-title">Best Performing Mentors</h3>
      <div className="mentor-card">
        {mentors.map((mentor, i) => (
          <div className="mentor-row" key={mentor.name}>
            <div className="mentor-avatar-wrap">
              <img src={mentor.image} alt={mentor.name} className="mentor-avatar"/>
            </div>
            <div className="mentor-details">
              <div className="mentor-name">{mentor.name}</div>
              <div className="mentor-label">Achieved Jobs</div>
            </div>
            <div className="mentor-jobs">
              <span className="mentor-jobs-count">{mentor.jobs}</span>
            </div>
            <div className="mentor-icon">
              {/* SVG for arrow */}
              <svg width="24" height="24" fill="none">
                <path d="M14 7l5 5-5 5M19 12H5" stroke="#9e9dcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* mentori */}
    </div>
    <div className="statistics-section card-box">
      {/* Graph/statistics */}
      
      <StatisticsCard/>
    </div>
  </div>
</div>

      {/* mentori */}
    </div>
    </div>
  </div>
 )
}
export default DashBoard;
