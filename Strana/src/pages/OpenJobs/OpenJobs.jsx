import "./OpenJobs.css"
import AssignedJobs from "../../components/AssignJobsMentor.jsx/AssignedJobs";
import { useNavigate } from "react-router-dom";
import React from "react";
import AiButton from "../../components/AiButton/AiButton";
import Logout from "../../components/LogOut";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import StartupJobs from "../../components/JobFeed/StartupJobs";
function OpenJobs(){
    const navigate = useNavigate();
 const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


const BASE_URL = "http://localhost:1000";

 useEffect(() => {
    
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");
     if (token) {
       try {
         const decodedUser = jwtDecode(token);
         setUser(decodedUser);
       } catch (e) {
         console.error("Token decoding failed:", e);
         localStorage.removeItem("token");
        navigate("/login");
        navigate("/LoginPage");
       }
     } else {
      navigate("/login");
      navigate("/LoginPage");
     }
   }, [navigate]);
  useEffect(() => {
    if (!user?.id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`${BASE_URL}/api/v1/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (res.data && res.data.user) {
          setUserData(res.data.user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err.response || err);
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);
      if (loading) {
        return <div className="loading,message">Authenticating user...</div>;
      }

    return(
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
            className="menu-item-mentor "
            onClick={() => navigate("/MyStats")}
          >
            <img src="Frame 4 (1).PNG" className="menu-icon-mentor" />
            <p>My Stats</p>
          </div>
          <div
            className="menu-item-mentor active"
            onClick={() => navigate("/OpenJobs")}
          >
            <img src="disc.png" className="menu-icon-mentor" />
            <p>Jobs</p>
          </div>
          <AiButton />
          <Logout />
        </div>
        </div>
        <div className="Mentor-Container-mystats">
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
        {/* nad serc bar */}
        <StartupJobs />
        </div>
        {error && <div className="error-message">{error}</div>}
        
        </div>

    )
}

export default OpenJobs;