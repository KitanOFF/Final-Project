import "./MentorLandingPage.css";
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

function About() {
  
  
  return (
    <div>
        
        <Navbar/>
    <div className="about">
      <div className="about-header">
        <h1>Meet our team members</h1>
        <p>
          We Focus on the details of everything we do. All to help businesses
          around the world <br /> <br />
          Focus on what's most important to them.
        </p>
        <button className="ButtonStart"> ➔ Get in touch</button>
      </div>
      <div className="about-main">
        <div className="about-card-top">
          <div className="about-card">
            <img src="ian.png" alt="" />
            <h5>Ian Sorell</h5>
            <span>CEO</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
            <div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
          </div>
          <div className="about-card">
            <img src="maya.png" alt="" />
            <h5>Maya Matt</h5>
            <span>Founder</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
            <div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
          </div>
          <div className="about-card">
            <img src="alex.png" alt="" />
            <h5>Alex Jensen</h5>
            <span>CTO</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
<div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
          </div>
          <div className="about-card">
            <img src="kaira.png" alt="" />
            <h5>Keira Battye</h5>
            <span>Product Designer</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
            <div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
          </div>
        </div>
        <div className="about-card-bottom">
          <div className="about-card">
            <img src="dominic.png" alt="" />
            <h5>Dominic Game</h5>
            <span>3D Artist</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
            <div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
          </div>
          <div className="about-card">
            <img src="james.png" alt="" />
            <h5>James Vial</h5>
            <span>Head of Front-End</span>
            <p>
              Enjoys adventurous travel, seeks new cultures and offbeat
              destinations
            </p>
            <div className="about-socials">
              <img src="Social icon.png" alt="" />
              <img src="Icon.png" alt="" />
              <img src="Social icon (1).png" alt="" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
    
    <Footer/>
    </div>
  );
}

export default About;



