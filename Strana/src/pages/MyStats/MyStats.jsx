import "./MyStats.css"
import MentorStats from "../../components/MentorStats";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StatsDashboardStDash from "../../components/StatsDashboard";
import AIChatPanel from "../../components/AI/Ai";
import AiButton from "../../components/AiButton/AiButton";
import Logout from "../../components/LogOut";
function MyStats() {

 const navigate = useNavigate();


  return(
    <div className="Main-Container-mystats">
<div className="sidebar-mystats">
      <div className="sidebar-header-mystats">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img-mystats"/>
        </div>
        <button className="collapse-btn-mystats">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left-mystats"/>
        </button>
      </div>

      <div className="sidebar-menu-mystats">
        <div className="menu-item-mystats" onClick={() => navigate("/DashBoardMentor")}>
          <img src="4koc.png" className="menu-icon-mystats" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item-mystats active" onClick={() => navigate("/MyStats")}>
          <img src="Frame.png" className="menu-icon-mystats" />
          <p>My Stats</p>
        </div>

        <div className="menu-item-mystats" onClick={() => navigate("/OpenJobs")}>
          <img src="disc.png" className="menu-icon-mystats" />
          <p>Jobs</p>
        </div>
        <div className="menu-item-mystats" >
          <AiButton/>
        </div>
      </div>
       
    <div className="sidebar-footer-mentor">
        <Logout/>
      </div>
    </div>
    {/* src */}
         <div className="Mentor-Container-mystats">
    <div className="header-container-mystats">
      <div className="search-wrapper-mystats">
        <input  type="text" className="search-input-mystats" placeholder="Search Mentor..." />
      </div>
      <div className="company-profile-mystats">
        <img src="/Logo-Dash.jpg" alt="Logo" className="company-logo" />
        <span className="company-text-mystats">TechWave Innovations</span>
      </div>
    </div>
      {/* d */}
      <MentorStats/>
      {/* stats  pod */}
     <StatsDashboardStDash/>
      </div>
  </div>
 )
}
export default MyStats;

