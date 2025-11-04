
import './footer.css';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
// import logo from '../assets/Group 8626.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
       
        <div>
          <div className="logo">
         <img src="./Group 8626.png" alt="" />
          </div>
          <p>
            With Mentor Token, every failure<br />
            transforms into an opportunity for<br />
            growth.
          </p>
        </div>

       
        <div>
          <h3>Pages</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact US</a></li>
          </ul>
        </div>

       
        <div>
          <h3>Contact</h3>
          <ul>
            <li>info@mentortoken.com</li>
            <li>+ (389) 123 456 789</li>
          </ul>
        </div>

       
        <div>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><Linkedin size={16} /></a>
            <a href="#"><Twitter size={16} /></a>
            <a href="#"><Facebook size={16} /></a>
          </div>
        </div>
      
      </div>

      <div className="footer-line"><hr /></div>

      <div className="token">
        ©2024 Mentor Token. All right reserved.
      </div>
    </footer>
  );
};

export default Footer;
