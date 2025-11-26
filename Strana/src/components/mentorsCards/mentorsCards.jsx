import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function MentorsCards() {
const [user, setUser] = useState(null);
const [mentors, setMentors] = useState([]);

const token = localStorage.getItem("token");
const navigate = useNavigate();

useEffect(() => {
  if (!token) return;
  try {
    const decoded = jwtDecode(token);
    setUser({
      name: decoded.name,
      role: decoded.role,
      id: decoded.id,
    });
  } catch (err) {
    console.warn("Failed to decode token", err);
  }
}, [token]);

const handleViewMentor = (mentorId) => {
  navigate(`/startup/mentors/${mentorId}`);
};

useEffect(() => {
  const fetchMentors = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const resMentors = await axios.get(
        "http://localhost:1000/api/v1/getMentors",
        { headers }
      );

      const list = resMentors?.data?.data || [];
      console.log("Mentors fetched:", list);
      setMentors(Array.isArray(list) ? list : []);
      console.log("Mentors:", mentors);

      const resApps = await axios.get(
        "http://localhost:1000/api/v1/startup/applications",
        { headers }
      );

      const applications = resApps?.data?.data || [];
      console.log(applications);

    } catch (err) {
      console.error("Error fetching mentors or jobs", err);
    }
  };

  if (token) fetchMentors();
}, [token]);

  return (
<div className="mentors-personal-cards">
  {mentors.map((mentor) => (
    <div className="mentors-personal-card" key={mentor?._id}>
      <img
        src="/mentors1.svg"
        alt=""
        className="mentors-personal-img"
      />
      <div className="mentors-personal-info">
        <h3 className="mentors-name">{mentor?.name}</h3>
        
        <div>★ ★ ★ ★ ☆</div>
        <div>•</div>
        <div>KPI-based</div>

        <h4>
          <b>Skills: {mentor?.skills?.join(" | ")}</b>
        </h4>

        <span className="view-mentor-flex">
          <h5>
            {mentor?.desc || "No description"}
          </h5>

          <button
            className="view-mentor-btn"
            onClick={() => {
              handleViewMentor(mentor._id);
            }}
          >
            View Mentor
          </button>
        </span>
      </div>
    </div>
  ))}
</div>
  );

}   
export default MentorsCards;