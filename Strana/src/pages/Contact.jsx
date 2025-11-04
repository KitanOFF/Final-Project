import { useState } from "react";
import "./Contact.css";
import Navbar from '../components/navbar'
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
        <Navbar/>
      <div className="contact-container">
        <div className="contact-box">
          <h2>Let’s Talk!</h2>
          <p>
            We’re thrilled to connect with you! Whether you have a question,
            need assistance, or want to discuss a potential project, we’re here
            to listen and help. Fill out the form below, and one of our team
            members will get back to you as soon as possible. <br />
            <strong>Let’s create something amazing together!</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="contact-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;