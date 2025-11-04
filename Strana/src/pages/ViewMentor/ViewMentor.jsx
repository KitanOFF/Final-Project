import "./ViewMentor.css"
import MentorInfo from "../../components/MentorInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const jobsData = [
  { id: 1, title: "Revenue per rate", status: "DONE" },
  { id: 2, title: "ARPU (Average revenue per use)", status: "REJECTED" },
  { id: 3, title: "CAC (Custom Acquisition Cost)", status: "IN PROGRESS" },
  { id: 4, title: "Churn Rate", status: "DONE" },
  { id: 5, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 6, title: "Operation Efficiency", status: "DONE" },
];



const jobOffers = [
  { title: "Revenue per rate" },
  { title: "ARPU (Average revenue per use)" },
  { title: "CAC (Custom Acquisition Cost)" }
];


function ViewMentor(){
    const navigate = useNavigate();
    const [filter, setFilter] = useState("ALL");
  
    const filteredJobs =
      filter === "ALL" ? jobsData : jobsData.filter((job) => {
        if (filter === "DONE") return job.status === "DONE";
        if (filter === "REJECTED") return job.status === "REJECTED";
        if (filter === "IN PROGRESS") return job.status === "IN PROGRESS";
        return true;
      });
  
    return(
               <div className="Main-Container-viewmentor">
 <div className="sidebar-viewmentor">
      <div className="sidebar-header-viewmentor">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img-viewmentor"/>
        </div>
        <button className="collapse-btn-viewmentor">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left-viewmentor"/>
        </button>
      </div>

      <div className="sidebar-menu-viewmentor">
        <div className="menu-item-viewmentor" onClick={() => navigate("/dashboard")}>
          <img src="4koc.png" className="menu-icon-viewmentor" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item-viewmentor active" onClick={() => navigate("/viewmentors")}>
          <img src="profile.svg" className="menu-icon-viewmentor" />
          <p>Mentors</p>
        </div>

        <div className="menu-item-viewmentor" onClick={() => navigate("/Jobs")}>
          <img src="disc.png" className="menu-icon-viewmentor" />
          <p>Jobs</p>
        </div>
      </div>

      <div className="sidebar-footer-mentor">
        <Logout/>
      </div>
    </div>
    {/* src */}
       <div className="Mentor-Container-viewmentor">
    <div className="header-container-viewmentor">
      <div className="search-wrapper-viewmentor">
        <input  type="text" className="search-input-viewmentor" placeholder="Search viewMentor..." />
      </div>
      <div className="company-profile-viewmentor">
        <img src="/Logo-Dash.jpg" alt="Logo" className="company-logo" />
        <span className="company-text-viewmentor">TechWave Innovations</span>
      </div>
    </div>
      {/* seradc */}
      <div className="mentor-top-row-viewmentor">
      <div className="mentor-card small-card-viewmentor">
        <img src="image.jpg" alt="Profile" className="profile-image-viewmentor" />
        <div className="mentor-info-viewmentor">
          <h2 className="mentor-name-viewmentor">Kierra Press</h2>
          <h3 className="mentor-role-viewmentor">Sales Representative</h3>
          <div className="mentor-contact-viewmentor">
            <span>mentormail@mail.com</span>
            <span>+389 77 663 234</span>
          </div>
        </div>
      </div>
      <div className="mentor-card-viewmentor large-card-viewmentor">
        <div className="large-card-header-viewmentor">
          <button className="offer-btn-viewmentor">+ Offer New Job</button>
        </div>
        <div className="mentor-about-viewmentor">
          <span className="about-title-viewmentor">About Mentor</span>
          <span className="about-skills-viewmentor">
            <b>Skills:</b> Sales | Management | Problem-solving
          </span>
          <p className="about-description-viewmentor">
            Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis.
          </p>
        </div>
      </div>
    </div>
    {/* jobs */}
    <div className="jobs-offers-row-viewmentor">
    <div className="assigned-jobs-mentor-viewmentor">
      <h2>Assigned Jobs</h2>
      <div className="tabs-mentor-viewmentor">
        {["ALL", "DONE", "REJECTED", "IN PROGRESS"].map((tab) => (
          <button
            key={tab}
            className={`tab-button-viewmentor ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="job-list-mentor-viewmentor">
  {filteredJobs.map((job) => (
    <div key={job.id} className="job-card-mentor-viewmentor">
      <span className="job-title-mentor-viewmentor">{job.title}</span>
      <span className={`job-status-mentor-viewmentor status-${job.status.toLowerCase().replace(" ", "-")}`}>
        {job.status}
      </span>
    </div>
  ))}
</div>

    </div>
    {/* ove */}
    <div className="pending-job-offers-container">
      <h2>Pending Job Offers</h2>
      {jobOffers.map((offer, index) => (
        <div className="offer-card" key={index}>
          <span className="offer-title">{offer.title}</span>
          <button className="cancel-offer-btn">Cancel Offer</button>
        </div>
      ))}
    </div>
    </div>
      </div>

        </div>
    )
}

export default ViewMentor;