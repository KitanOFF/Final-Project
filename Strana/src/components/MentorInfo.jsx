import "./MentorInfo.css";

function MentorInfo() {
  return (
    <div className="mentor-profile-row-mentinf">
      {/* Left Card */}
      <div className="mentor-profile-card-mentinf">
        <img src="/avatar.jpg" alt="Kierra Press" className="mentor-avatar-mentinf" />
        <div className="mentor-profile-name-mentinf">
          Kierra Press
          <img src="/linkedin-icon.svg" alt="LinkedIn" style={{width: 15, height: 15, marginLeft: 6}}/>
        </div>
        <div className="mentor-profile-title-mentinf">Sales Representative</div>
        <div className="mentor-profile-contact-mentinf">
          <div className="mentor-profile-contact-row-mentinf">
            <img src="/mail-icon.svg" alt="" style={{width:15, height:15, opacity:.6}} />
            mentormail@mail.com
          </div>
          <div className="mentor-profile-contact-row">
            <img src="/phone-icon.svg" alt="" style={{width:15, height:15, opacity:.7}} />
            +389 77 663 234
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="mentor-info-card">
        <div className="mentor-info-header-row">
          <div>
            <span className="mentor-info-title">About Mentor</span>
            <div className="mentor-info-skills">
              <b>Skills:</b> Sales | Management | Problem-solving
            </div>
          </div>
          <button className="mentor-info-btn">
            <span>+</span> Offer New Job
          </button>
        </div>
        <div className="mentor-info-text">
          Lorem ipsum dolor sit amet consectetur. Suspendisse quis varius felis augue adipiscing.
          Sapien volutpat ac velit facilisis fermentum diam bibendum libero non. Semper morbi at
          congue pellentesque pharetra amet rhoncus elit quis. Lorem ipsum dolor sit amet
          consectetur. Suspendisse quis varius felis augue adipiscing. Sapien volutpat ac velit
          facilisis fermentum diam bibendum libero non. Semper morbi at congue pellentesque pharetra
          amet rhoncus elit quis. Lorem ipsum dolor sit amet consectetur...
        </div>
      </div>
    </div>
  );
}

export default MentorInfo;
