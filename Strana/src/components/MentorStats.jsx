
import './MentorStats.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function MentorStats() {
  const [user, setUser] = useState(null);
const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
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
console.log("Photo filename:", userData?.photo);

    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 
        console.log("Fetching user with ID:", user.id);
        console.log("Using token:", token);
        console.log("Request URL:", `${BASE_URL}/api/v1/user/${user.id}`);
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
    return <div className="loading-message">Authenticating user...</div>;
  }


  return (
    <div className="mentor-stats-row">
  
  <div className="mentor-profile-card">
    <div className="mentor-profile-avatar-wrapper">
      <img
  src={userData?.photo ? `${BASE_URL}/uploads/${userData.photo}` : "maya.png"}
  alt="User"
/>

      <span className="mentor-avatar-check">&#10003;</span>
    </div>
    <div className="mentor-profile-name">
      {user?.name}
      
    </div>
    <div className="mentor-profile-role">{user?.role}</div>
    <div className="mentor-profile-contact">
      <div>
        <img src="mail-icon.png" className="icon" alt="Mail" />
        {userData?.email}
      </div>
      <div>
    <img src="Phone.png" className="icon" alt="Phone" />
    {userData?.phone || "No phone"}
  </div>
    </div>
  </div>
  <div className="mentor-info-card-mentinf">
    <button
      className="mentor-info-edit-btn"
      title="Edit About"
    >
      <img src="edit.png" alt="Edit" />
    </button>
    <div className="mentor-info-title-row">
      <span className="mentor-info-title">About Mentor</span>
    </div>
    <div className="mentor-info-skills">
      <b>
        {userData?.skills ? `Skills: ${userData.skills.join(" | ")}` : "No skills"}
      </b>
    </div>
    <div className="mentor-info-text">
    </div>
  </div>
</div>

  );
}

export default MentorStats;
