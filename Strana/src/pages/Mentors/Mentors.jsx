import "./Mentors.css"
import Logout from "../../components/LogOut";
import { FaStar } from "react-icons/fa"
import AiButton from "../../components/AiButton/AiButton";
import { useNavigate } from "react-router-dom";
const mentors = [
  {
    name: "Kierra Press",
    image: "d",
    rating: 2,
    ratingAvg: "2.54",
    skills: ["Sales", "Management", "Problem-solving"],
    desc: "Field sales training. 5+ years in an outside sales position"
  },
  {
    name: "Alison Vetrovs",
    image: "d",
    rating: 5,
    ratingAvg: "4.92",
    skills: ["Sales", "Management", "Problem-solving"],
    desc: "The sales representative position is an OR based sales role with uncapped commission..."
  },
  {
    name: "Marcus Carder",
    image: "d",
    rating: 3,
    ratingAvg: "3.56",
    skills: ["Lidership", "Management", "Product sales"],
    desc: "Field sales training. 5+ years in an outside sales position"
  }
];

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
      <div className="mentor-list-mentorS">
        {mentors.map((mentor, idx) => (
          <div className="mentor-card-mentorS" key={idx}>
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-img-mentorS"
            />
            <div className="mentor-main-mentorS">
              <div className="mentor-header-mentorS">
                <span className="mentor-name-mentorS">{mentor.name}</span>
                <img src="./Social icon (1).png" className="linkedin-icon-mentorS" alt="LinkedIn"/>
              </div>
              <div className="mentor-rating-mentorS">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FaStar
                    key={n}
                    color={n <= mentor.rating ? "#7B61FF" : "#E6E6E6"}
                  />
                ))}
                <span className="avg-rating-mentorS">
                  {mentor.ratingAvg} average based on KPI success rate.
                </span>
              </div>
              <div className="mentor-skills-mentorS">
                {mentor.skills.map((s, i) => (
                  <b key={s}>
                    {s}
                    {i < mentor.skills.length - 1 && " | "}
                  </b>
                ))}
              </div>
              <div className="mentor-desc-mentorS">{mentor.desc}</div>
            </div>
            <button className="view-mentor-btn-mentorS">View Mentor</button>
          </div>
        ))}
      </div>
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