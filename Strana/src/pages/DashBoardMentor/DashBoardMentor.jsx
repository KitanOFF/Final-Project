import "./DashBoardMentor.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AiButton from "../../components/AiButton/AiButton";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

const jobsData = [
  { id: 1, title: "Revenue per rate", status: "DONE" },
  { id: 2, title: "ARPU (Average revenue per use)", status: "REJECTED" },
  { id: 3, title: "CAC (Custom Acquisition Cost)", status: "IN PROGRESS" },
  { id: 4, title: "Churn Rate", status: "DONE" },
  { id: 5, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 6, title: "Operation Efficiency", status: "DONE" },
];

function DashBoardMentor() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [filter, setFilter] = useState("ALL");
  const [jobs, setJobs] = useState(jobsData); 
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        
        setUser(decodedUser);
      } catch (e) {
        console.error("Token decoding failed:", e);
    
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
    
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);


  useEffect(() => {
    setFilteredJobs(
      filter === "ALL"
        ? jobs
        : jobs.filter(job => job.status === filter)
    );
  }, [filter, jobs]);


  if (loading) {
    return <div className="loading-message">Authenticating user...</div>;
  }
  
  return (
    <div className="Main-Container-mentor">
      <div className="sidebar-mentor">
        <div className="sidebar-header-mentor">
          <div className="logo">
            <img src="./Group 8626.png" alt="" className="img-mentor" />
          </div>
          <button className="collapse-btn-mentor">
            <img
              src="small-arrow-left.png"
              alt="small arrow"
              className="small-arrow-left-mentor"
            />
          </button>
        </div>
        <div className="sidebar-menu-mentor">
          <div
            className="menu-item-mentor"
            onClick={() => navigate("/DashBoardMentor")}
          >
            <img src="4koc.png" className="menu-icon-mentor" />
            <p>Dashboard</p>
          </div>
          <div
            className="menu-item-mentor active"
            onClick={() => navigate("/MyStats")}
          >
            <img src="Frame.png" className="menu-icon-mentor" />
            <p>My Stats</p>
          </div>
          <div
            className="menu-item-mentor"
            onClick={() => navigate("/OpenJobs")}
          >
            <img src="disc.png" className="menu-icon-mentor" />
            <p>Jobs</p>
          </div>
          <AiButton />
        </div>
        <div className="sidebar-footer-mentor"></div>
      </div>
      <div className="Mentor-Container-mentor">
        <div className="header-container-mentor">
          <div className="search-wrapper-mentor">
            <input
              type="text"
              className="search-input-mentor"
              placeholder="Search Mentor..."
            />
          </div>
          <div className="company-profile-mentor">
            <img
              src={
                user?.photo
                  ? `${BASE_URL}/uploads/${user.photo}`
                  : "profile.svg"
              }
              alt="User"
              className="company-photo-mentor"
            />
            <div className="company-meta-mentor">
              <span className="company-text-mentor">{user?.name || "Guest"}</span>
              <span className="photo-filename-mentor">
                {/* {user?.photo ? `Photo: ${user.photo}` : "No photo uploaded"} */}
              </span>
              <span className="user-role">
                {user?.role ? ` ${user.role}` : "No role"}
              </span>
            </div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="parent-container">
          <div className="assigned-jobs-mentor">
            <h2>Assigned Jobs</h2>
            <div className="tabs-mentor">
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
            <div className="job-list-mentor">
              {filteredJobs.map((job) => (
                <div key={job.id} className="job-card-mentor">
                  <span className="job-title-mentor">{job.title}</span>
                  <span
                    className={`job-status-mentor status-${job.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-mentor">
            <h2>Pending Jobs</h2>
            <p>Jobs offered from your startup</p>
            <div className="pending-jobs">
              {jobs.map((job, idx) => (
                <div className="job-row" key={idx}>
                  <span className="job-title">{job.title}</span>
                  <button className="accept">Accept</button>
                  <button className="reject">Reject</button>
                </div>
              ))}
            </div>
            <h2>Applications sent</h2>
            <p>Jobs you have applied to</p>
            <div className="applications-sent">
              {jobs.map((job, id) => (
                <div className="job-row applied" key={id}>
                  <span className="job-title">{job.title}</span>
                  <span className="timer"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardMentor;
