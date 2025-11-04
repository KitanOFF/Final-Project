
import "./Stats.css"



function Stats (){
return(
  <div className="Main-Container"> 
  {/* Dashbord-------------------- */}
           <div className="main-left-side">
            <div className="mentor-token-icon">
              <span className="mentor-token-logo">
                <img src="Group8626.svg" alt="" />
              </span>
              <span>
                <img src="" alt="" />
              </span>
            </div>
            <div className="list-pages">
              <ul className="list-pages-links">
                <li className="list-dashboard">
                  <i>
                    <img src="dashboard.svg" alt="" />
                  </i>
                  Dashboard
                </li>
                <li className="list-dashboard">
                  <i>
                    <img src="mentors.svg" alt="" />
                  </i>
                  My Stats
                </li>
                <li className="list-dashboard">
                  <i>
                    <img src="tokens.svg" alt="" />
                  </i>
                  Job Feed
                </li>
              </ul>
            </div>
            <div className="logout">
                <img src="logout.svg" alt="" />
              <button className='left-side-button' >
                Logout
              </button>
            </div>
          </div>
          {/* ------------------------------------------- */}
          <div className="Mentor-Container">
          {/* Search Bar------ */}
          <div className="search-header-container">
              <input
                className="search-bar"
                type="text"
                placeholder="Search Startup, KPI, Mentor..."
              />
              <div className="company-info">
                <img
                  className="company-logo"
                  
                  alt="TechWave Innovations Logo"
                />
                <div className="company-name">
                  <span>TechWave</span>
                  <br />
                  <span>Innovations</span>
                </div>
              </div>
            </div>
          {/* ----------------- */}
          <div className="mentor-profile-container">
    <div className="profile-card">
      <img className="profile-image" src="/images/image.jpg" alt="Profile" />
      <div className="profile-details">
        <div className="profile-name-row">
          <span className="mentor-name">Kierra Press</span>
          <span className="linkedin-icon">
            <svg viewBox="0 0 16 16" width="16"><path fill="#3f76c3" d="M2 2h12v12H2z"/><path fill="#fff" d="M5.25 8H4v4h1.25V8zM4.62 7.1a.72.72 0 1 1 0-1.44.71.71 0 0 1 0 1.43zM13 12h-1.25v-2c0-.75-.43-1.09-.99-1.09-.56 0-.93.36-.93 1.11v1.98H8.25V8H9.5v.56c.19-.29.54-.56 1.13-.56C12 8 13 9.09 13 11v1z"/></svg>
          </span>
        </div>
        <span className="mentor-title">Sales Representative</span>
        <div className="mentor-contact">
          <span>
            <svg viewBox="0 0 16 16" width="15"><path fill="#3f76c3" d="M2 2h12v12H2z"/><circle cx="8" cy="8" r="6" fill="#f0f0f0"/><path d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8zm6-2.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z" fill="#3f76c3"/></svg>
            mentormail@mail.com
          </span>
          <span>
            <svg viewBox="0 0 16 16" width="15"><path fill="#3f76c3" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0z"/><circle cx="8" cy="8" r="6" fill="#f0f0f0"/><path d="M4.7 8a3.3 3.3 0 1 1 6.6 0a3.3 3.3 0 0 1-6.6 0z" fill="#3f76c3"/></svg>
            +389 77 663 234
          </span>
        </div>
      </div>
    </div>
    <div className="mentor-details-card">
      <div className="details-header">About Mentor</div>
      <div className="details-skills">
        <b>Skills:</b> Sales | Management | Problem-solving
      </div>
      <div className="details-description">
        Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra amet rhoncus elit quis.
      </div>
      <button className="offer-job-btn">+ Offer New Job</button>
    </div>
  </div>
          </div>
          </div>
)
}

export default Stats;