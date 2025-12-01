import "./Mentors.css"
import Logout from "../../components/LogOut";
import { FaStar } from "react-icons/fa"
import AiButton from "../../components/AiButton/AiButton";
import { useNavigate } from "react-router-dom";
import MentorsCards from "../../components/mentorsCards/MentorsCards";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const overviewData = {
  totalMentors: 12,
  totalJobs: 143,
  finishedJobs: 63
};




function Mentors(){

    const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);      
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

const BASE_URL = "http://localhost:1000";

  

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
       
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
    return(
        <div className="Main-Container-mentors">
 <div className="sidebar-mentors">
      <div className="sidebar-header-mentors">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img-mentors"/>
        </div>
        <button className="collapse-btn-mentors">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left-mentors"/>
        </button>
      </div>

      <div className="sidebar-menu-mentors">
        <div className="menu-item-mentors" onClick={() => navigate("/DashBoard")}>
          <img src="4koc.png" className="menu-icon-mentors" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item-mentors active" onClick={() => navigate("/mentors")}>
          <img src="Frame.png" className="menu-icon-mentors" />
          <p>Mentors</p>
        </div>

        <div className="menu-item-mentors" onClick={() => navigate("/job")}>
          <img src="disc.png" className="menu-icon-mentors" />
          <p>Jobs</p>
        </div>
        <AiButton/>
      </div>
     <div className="sidebar-footer-mentor">
        <Logout/>
      </div>
    </div>
<div className="Mentor-Container-mentors">
    <div className="header-container-mentors">
      <div className="search-wrapper-mentors">
        <input  type="text" className="search-input-mentors" placeholder="Search Mentors..." />
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
    {/* pod */}
    <div className="dashboard-mentorS">
    <MentorsCards/>
      <div className="sidebar-mentorS">
        <div className="sidebar-title-mentorS">Quick Overview</div>
        <div className="sidebar-label-mentorS">In the last month</div>
        <div className="sidebar-item-mentorS">
          <div>Total Mentors</div>
          <div className="sidebar-number-mentorS">{overviewData.totalMentors}</div>
        </div>
        <div className="sidebar-item-mentorS">
          <div>Total Assigned Jobs</div>
          <div className="sidebar-number-mentorS">{overviewData.totalJobs}</div>
        </div>
        <div className="sidebar-item-mentorS highlight-mentorS">
          <div>Finished Jobs</div>
          <div className="sidebar-number-mentorS">{overviewData.finishedJobs}</div>
        </div>
      </div>
    </div>
    </div>
        </div>
    )
}
export default Mentors;