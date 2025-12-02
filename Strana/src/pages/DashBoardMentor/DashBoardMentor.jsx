import "./DashBoardMentor.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AiButton from "../../components/AiButton/AiButton";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AssignedJobs from "../../components/AssignJobsMentor.jsx/AssignedJobs";
import Logout from "../../components/LogOut";
import PendingJobsMentor from "../../components/pendingJobs.jsx/PendingJobsMentor";



function DashBoardMentor() {
const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);      
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

const BASE_URL = "http://localhost:1000";

  
  // ЕДЕН ефект за сè: token + fetch user
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          // ако нема token -> на loginv
          navigate("/loginv");
          return;
        }

        let decoded;
        try {
          decoded = jwtDecode(token);
          console.log("Decoded token in Dashboard:", decoded);
        } catch (e) {
          console.error("Token decoding failed:", e);
          localStorage.removeItem("token");
          navigate("/loginv");
          return;
        }

        const userId = decoded.id || decoded._id;
        if (!userId) {
          console.error("No id in token");
          localStorage.removeItem("token");
          navigate("/loginv");
          return;
        }

        setUser({
          id: userId,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          photo: decoded.photo,
        });

        // Fetch од backend
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
          navigate("/loginv");
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [navigate]);

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
            className="menu-item-mentor active"
            onClick={() => navigate("/DashBoardMentor")}
          >
            <img src="4koc.png" className="menu-icon-mentor" />
            <p>Dashboard</p>
          </div>
          <div
            className="menu-item-mentor "
            onClick={() => navigate("/MyStats")}
          >
            <img src="Frame 4 (1).PNG" className="menu-icon-mentor" />
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
          <Logout/>
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
                userData?.photo
                  ? `${BASE_URL}/uploads/${userData.photo}` 
                  : "maya.png"
              }
              alt="User"
              className="company-photo-mentor"
            />
            <div className="company-meta-mentor">
              <span className="company-text-mentor">{userData?.name || "Guest"}</span>
              <span className="user-role">
                {userData?.role ? `${userData.role}` : "No role"} 
              </span>
            </div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="parent-container">
          
          <AssignedJobs/>
          <div className="dashboard-mentor">
            {/* <h2>Pending Jobs</h2>
            <p>Jobs offered from your startup</p> */}
            <PendingJobsMentor/>
            <h2>Applications sent</h2>
            <p>Jobs you have applied to</p>
            {/* <div className="applications-sent">
              {jobs.map((job, id) => (
                <div className="job-row applied" key={id}>
                  <span className="job-title">{job.title}</span>
                  <span className="timer"></span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardMentor;
