import "./Mentors.css"
import Logout from "../../components/LogOut";
import { FaStar } from "react-icons/fa"
import AiButton from "../../components/AiButton/AiButton";
import { useNavigate } from "react-router-dom";
import MentorsCards from "../../components/mentorsCards/mentorsCards";

const overviewData = {
  totalMentors: 12,
  totalJobs: 143,
  finishedJobs: 63
};




function Mentors(){
    const navigate = useNavigate();
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

        <div className="menu-item-mentors" onClick={() => navigate("/Jobs")}>
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
      <div className="company-profile-mentors">
        <img src="/Logo-Dash.jpg" alt="Logo" className="company-logo" />
        <span className="company-text-mentors">TechWave Innovations</span>
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