
import "./DashBoard.css";
import React, { useState } from "react";
import StatisticsCard from "../components/StatisticsCard";
import { useNavigate } from "react-router-dom";
import Logout from "../components/LogOut";
import AiButton from "../components/AiButton/AiButton";
import AssignJobsStartUp from "../components/AssignJobsStartUp/AssignJobsStartUp";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);        // од token
  const [userData, setUserData] = useState(null); // од backend
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const BASE_URL = "http://localhost:1000";

  const filteredJobs =
    filter === "ALL"
      ? jobsData
      : jobsData.filter((job) => {
          if (filter === "DONE") return job.status === "DONE";
          if (filter === "REJECTED") return job.status === "REJECTED";
          if (filter === "IN PROGRESS") return job.status === "IN PROGRESS";
          return true;
        });

  // ЕДЕН useEffect: чита token, го декодира и влече user од backend
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          // ако нема token -> на login (овде претпоставувам дека Login ти е на "/")
          navigate("/");
          return;
        }

        let decoded;
        try {
          decoded = jwtDecode(token);
          console.log("Decoded token in Dashboard:", decoded);
        } catch (e) {
          console.error("Token decoding failed:", e);
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const userId = decoded.id || decoded._id;
        if (!userId) {
          console.error("No id in token");
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        setUser({
          id: userId,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          photo: decoded.photo,
        });

        // Fetch од backend (ако ти требаат повеќе детали)
        const res = await axios.get(`${BASE_URL}/api/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.user) {
          setUserData(res.data.user);
          setError("");
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user");

        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        // НАЈБИТНО: ова секогаш се вика → повеќе нема да виси на "Authenticating user..."
        setLoading(false);
      }
    };

    run();
  }, [navigate]);

  if (loading) {
    return <div className="loading-message">Authenticating user...</div>;
  }

  return (
    <div>
      <div className="Main-Container">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <img src="./Group 8626.png" alt="" className="img" />
            </div>
            <button className="collapse-btn">
              <img
                src="small-arrow-left.png"
                alt="small arrow"
                className="small-arrow-left"
              />
            </button>
          </div>

          <div className="sidebar-menu">
            <div className="menu-item active" onClick={() => navigate("/dashboard")}>
              <img src="profile.svg" className="menu-icon" />
              <p>Dashboard</p>
            </div>

            <div className="menu-item" onClick={() => navigate("/mentors")}>
              <img src="4koc.png" className="menu-icon" />
              <p>Mentors</p>
            </div>

            <div className="menu-item" onClick={() => navigate("/job")}>
              <img src="disc.png" className="menu-icon" />
              <p>Jobs</p>
            </div>

            <AiButton />
          </div>

          <Logout />
        </div>

        {/* MAIN CONTENT */}
        <div className="Mentor-Container">
          {/* header: search + user profile */}
          <div className="header-container">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search Mentor..."
              />
            </div>

            <div className="company-profile-mentor">
              <img
                src={
                  userData?.photo
                    ? `${BASE_URL}/uploads/${userData.photo}`
                    : "maya.png"
                }
                alt="User"
                className="company-photo-mentor"
              />
              <div className="company-meta-mentor">
                <span className="company-text-mentor">
                  {userData?.name || "Guest"}
                </span>
                <span className="user-role">
                  {userData?.role ? `${userData.role}` : "No role"}
                </span>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="dashboard-content">
            <div className="jobs-section card-box">
              <AssignJobsStartUp />
            </div>

            <div className="mentors-section">
              <div className="card-box">
                <div className="mentor-section">
                  <h3 className="mentor-title">Best Performing Mentors</h3>
                  <div className="mentor-card">
                    {mentors.map((mentor) => (
                      <div className="mentor-row" key={mentor.name}>
                        <div className="mentor-avatar-wrap">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="mentor-avatar"
                          />
                        </div>
                        <div className="mentor-details">
                          <div className="mentor-name">{mentor.name}</div>
                          <div className="mentor-label">Achieved Jobs</div>
                        </div>
                        <div className="mentor-jobs">
                          <span className="mentor-jobs-count">
                            {mentor.jobs}
                          </span>
                        </div>
                        <div className="mentor-icon">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M14 7l5 5-5 5M19 12H5"
                              stroke="#9e9dcc"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="statistics-section card-box">
                <StatisticsCard />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;