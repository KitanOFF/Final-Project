import React, { useState } from "react";
import "./MentorStats.css";

export default function MentorStats() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    "Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis."
  );

  return (
    <div className="mentor-stats-row">
      <div className="mentor-profile-card">
        <div className="mentor-profile-avatar-wrapper">
          <img
            className="mentor-profile-avatar"
            src="maya.png"
            alt="Kierra Press"
          />
          <span className="mentor-avatar-check">&#10003;</span>
        </div>
        <div className="mentor-profile-name">
          Kierra Press
          <img src="Social icon (1).png" alt="" className="profile-linkedin-icon" />
        </div>
        <div className="mentor-profile-role">Sales Representative</div>
        <div className="mentor-profile-contact">
          <div>
            <img src="mail-icon.png" className="icon" alt="" />
            mentormail@mail.com
          </div>
          <div>
            <img src="Phone.png" className="icon" alt="" />
            +389 77 663 234
          </div>
        </div>
      </div>
      <div className="mentor-info-card-mentinf">
        <button
          className="mentor-info-edit-btn"
          title="Edit About"
          onClick={() => setIsEditing(!isEditing)}
        >
          <img src="edit.png" alt="Edit"  />
        </button>
        <div className="mentor-info-title-row">
          <span className="mentor-info-title">About</span>
        </div>
        <div className="mentor-info-skills">
          <b>Skills: </b>Sales | Management | Problem-solving
        </div>
        <div className="mentor-info-text">
          {isEditing ? (
            <textarea
              value={aboutText}
              onChange={e => setAboutText(e.target.value)}
              className="mentor-about-textarea"
            />
          ) : (
            aboutText
          )}
        </div>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="mentor-info-save-btn"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
