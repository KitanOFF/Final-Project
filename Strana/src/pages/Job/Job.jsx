import "./Job.css"
import AiButton from "../../components/AiButton/AiButton";
import Logout from "../../components/LogOut";
import { useNavigate } from "react-router-dom";






const jobs = [
  {
    companyLogo: "https://placehold.co/48x48?text=Logo",
    company: "TechWave Innovations",
    applicants: [
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/women/19.jpg",
      "https://randomuser.me/api/portraits/men/25.jpg"
    ]
  },
  {
    companyLogo: "https://placehold.co/48x48?text=Logo",
    company: "TechWave Innovations",
    applicants: [
      "https://randomuser.me/api/portraits/men/20.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
      "https://randomuser.me/api/portraits/men/26.jpg"
    ]
  },
  {
    companyLogo: "https://placehold.co/48x48?text=Logo",
    company: "TechWave Innovations",
    applicants: [
      "https://randomuser.me/api/portraits/men/27.jpg",
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/men/28.jpg"
    ]
  },
  {
    companyLogo: "https://placehold.co/48x48?text=Logo",
    company: "TechWave Innovations",
    applicants: [
      "https://randomuser.me/api/portraits/men/29.jpg",
      "https://randomuser.me/api/portraits/women/23.jpg",
      "https://randomuser.me/api/portraits/men/30.jpg"
    ]
  }
];


function Job(){
  const navigate = useNavigate();
    return(
   <div className="Main-Container-Job">
 <div className="sidebar-Job">
      <div className="sidebar-header-Job">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img-Job"/>
        </div>
        <button className="collapse-btn-Job">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left-Job"/>
        </button>
      </div>

      <div className="sidebar-menu-Job">
        <div className="menu-item-Job" onClick={() => navigate("/DashBoard")}>
          <img src="4koc.png" className="menu-icon-Job" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item-Job active" onClick={() => navigate("/MyStats")}>
          <img src="Frame.png" className="menu-icon-Job" />
          <p>My Stats</p>
        </div>

        <div className="menu-item-Job" onClick={() => navigate("/Job")}>
          <img src="disc.png" className="menu-icon-Job" />
          <p>Jobs</p>
        </div>
        <AiButton/>
      </div>

      <div className="sidebar-footer-Job">
        <Logout/>
      </div>
    </div>
      {/* src */}
       <div className="Mentor-Container-Job">
    <div className="header-container-Job">
      <div className="search-wrapper-Job">
        <input  type="text" className="search-input-Job" placeholder="Search Job..." />
      </div>
      <div className="company-profile-Job">
        <img src="/Logo-Dash.jpg" alt="Logo" className="company-logo" />
        <span className="company-text-Job">TechWave Innovations</span>
      </div>
    </div>
    {/* pod */}
    <div className="jobs-dashboard">
      <div className="jobs-header-row">
        <div className="jobs-title">Your Startup Jobs</div>
        <button className="create-job-btn">+ Create New Job</button>
      </div>
      <div className="job-cards-row">
        {jobs.map((job, idx) => (
          <div className="joB-card" key={idx}>
            <div className="job-company-row">
              <img src={job.companyLogo} alt="logo" className="company-logo" />
              <div className="company-details">
                <div className="company-name">{job.company}</div>
              </div>
            </div>
            <div className="job-offer-title">New Job Offer</div>
            <div className="job-desc">
              Lorem Ipsum Dolor Sit Amet Consectetur. Facilisis Nunc Ut Tellus Augue A Aliquam Arcu. Libero Imperdiet Odio Sed Morbi Quis Felis Proin.
            </div>
            <div className="job-card-bottom-row">
              <div className="job-applicants">
                {job.applicants.map((a, i) => (
                  <img src={a} key={i} alt="applicant" className="applicant-avatar" />
                ))}
                <span className="applicant-ct">3+ Applicants</span>
              </div>
              <button className="job-view-btn">View More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    </div>
    )
}

export default Job;