import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./MentorsCards.css";

function MentorsCardsCarDs() {
  const [user, setUser] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCards = 3; // Колку да се видливи

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

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const resMentors = await axios.get(
          "http://localhost:1000/api/v1/getMentors",
          { headers }
        );
        const list = resMentors?.data?.data || [];
        setMentors(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Error fetching mentors", err);
      }
    };
    if (token) fetchMentors();
  }, [token]);

  const handleViewMentor = (mentorId) => {
    navigate(`/startup/mentors/${mentorId}`);
  };

  const scrollUp = () => {
    setScrollIndex(Math.max(0, scrollIndex - visibleCards));
  };

  const scrollDown = () => {
    setScrollIndex(Math.min(mentors.length - visibleCards, scrollIndex + visibleCards));
  };

  return (
    <div className="mentors-cards-carousel-col-CarDs">
      <button className="carousel-btn-col-CarDs" onClick={scrollUp} disabled={scrollIndex === 0}>▲</button>
      <div className="mentors-personal-cards-col-CarDs">
        {mentors.slice(scrollIndex, scrollIndex + visibleCards).map(mentor => (
          <div className="mentors-personal-card-col-CarDs" key={mentor?._id}>
            <img
              src={mentor?.image || "/mentors1.svg"}
              alt=""
              className="mentors-personal-img-col-CarDs"
            />
            <div className="mentors-personal-info-col-CarDs">
              <h3 className="mentors-name-col-CarDs">{mentor?.name}</h3>
              <div className="mentors-stars-col-CarDs">
                {'★'.repeat(Math.round(mentor?.rating || 3)) +
                  '☆'.repeat(5 - Math.round(mentor?.rating || 3))}
                <span className="mentors-kpi-col-CarDs">
                  {mentor?.kpi || "KPI based"}
                </span>
              </div>
              <div className="mentors-skills-col-CarDs">
                Skills: {mentor?.skills?.join(" | ")}
              </div>
              <div className="mentors-desc-col-CarDs">
                {mentor?.desc || "No description"}
              </div>
              <button
                className="view-mentor-btn-col-CarDs"
                onClick={() => handleViewMentor(mentor._id)}
              >
                View Mentor
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-btn-col-CarDs"
        onClick={scrollDown}
        disabled={scrollIndex + visibleCards >= mentors.length}
      >▼</button>
    </div>
  );
}
export default MentorsCardsCarDs;
