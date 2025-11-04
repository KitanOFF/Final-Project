




import { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [accountType, setAccountType] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
  const [inviteEmails, setInviteEmails] = useState("")
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
 

function handleProfilePicChange(e) {
  const file = e.target.files[0];
  if (file) {
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  }
}

 const handleSend = async (e) => {
  e.preventDefault();
  setError("");

  const payload = {
    email,
    password,
    role: accountType,
    name,
    address,
    photo: profilePic,
    ...(accountType === "mentor"
      ? { phone, skills: skills.split(",").map(s => s.trim()) }
      : { representative })
  };

  console.log("Signup payload", payload);

  try {
    const res = await fetch("http://localhost:1000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status === 201 || data.message === "New user created") {
      navigate("/LoginPage");
    } else {
      if(res.status === 201 || data.message === "New user created"){
        if (accountType === "startup") {
          navigate("/DashBoard");
        }else{
          navigate("/LoginPage")
        }
      }else{
        setError(data.message || "Error creating new user!");
      }
    }
  } catch (err) {
    console.error(err);
    setError("Server error!");
  }
};


const [logoPreview, setLogoPreview] = useState(null);

function handleLogoChange(e) {
  const file = e.target.files[0];
  if (file) {
    setLogoPreview(URL.createObjectURL(file));
    
  }
}


  return (
    <div className="signup">
      <div className="left-side">
            <div className="left-panel">
  
  <img src="logo-3.1.png" className="full-bg" alt="Background" />
</div>
      </div>
      <div className="rocket-img">
        <img src="vetary-rocket.svg" alt="" />
      </div>
      {step === 1 && (
        
      <div className="signup-signup">
  <div className="right-side-signup">
    <div className="mentor-logo-title-signup">
      <img src="small-logo.png" alt="" />
    </div>
    <h3 className="choose-title-signup">CHOOSE ACCOUNT TYPE</h3>
    <div className="account-type-toggle-signup">
      <button
        type="button"
        value="startup"
        className={accountType === "startup" ? "active-signup" : ""}
        onClick={() => setAccountType("startup")}
      >
        Startup
      </button>
      <button
        type="button"
        value="mentor"
        className={accountType === "mentor" ? "active-signup" : ""}
        onClick={() => setAccountType("mentor")}
      >
        Mentor
      </button>
    </div>
    <form className="signup-form-signup">
      <label className="input-label-signup"></label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="input-email-signup"
      />
      <label className="input-label-signup"></label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="input-password-signup"
      />
      <ul className="password-rules-signup">
        <li>Password Strength: Weak</li>
        <li>Cannot contain your name or email address</li>
        <li>At least 8 characters</li>
        <li>Contains a number or symbol</li>
      </ul>
      <button
        type="button"
        className="continue-btn-signup"
        onClick={() => setStep(2)}
      >
        Continue
      </button>
    </form>
    <p className="login-link-signup">
      Already have account? <Link to="/login">Login</Link>
    </p>
  </div>
</div>


      )}
      {step === 2 && accountType === "mentor" && (
        
    <div className="signup-root">
  
  <form onSubmit={handleSend} className="mentor-signup-form modern-signup" method="POST">
    <div className="form-container">
      <div className="mentor-logo-title">
        <div className="logo-upload-circle">
  {profilePicPreview ? (
    <img src={profilePicPreview} alt="Mentor Profile" />
  ) : (
    <span className="camera-icon">📷</span>
  )}
  <input
    type="file"
    accept="image/*"
    name="profilePic"
    onChange={handleProfilePicChange}
    className="logo-upload-input"
  />
</div>
      </div>
      <div className="paragraph-above-form">
        <h3>SETUP MENTOR ACCOUNT</h3>
      </div>
      <div className="right-side-inputs">
        <label>Name and surname</label>
        <input
          type="text"
          name="name"
          placeholder="Name and surname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Skills</label>
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <button className="register-btn" type="submit">Register</button>
      </div>
    </div>
    <div className="terms-note">
      By signing up to create an account I accept Company’s <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
    </div>
  </form>
</div>

          )}
          {step === 2 && accountType === "startup" && (
              <form onSubmit={handleSend} className="mentor-signup-form modern-signup" method="POST" encType="multipart/form-data">
  <div className="form-container">
    <div className="mentor-logo-title">
      {/* Show a placeholder or preview */}
      <div className="logo-upload-circle">
        {logoPreview ? (
          <img src={logoPreview} alt="Startup Logo" className="startup-logo" />
        ) : (
          <span className="camera-icon">📷</span>
        )}
        <input
          type="file"
          accept="image/*"
          name="logo"
          onChange={handleLogoChange}
          className="logo-upload-input"
        />
      </div>
    </div>
    <h3>SETUP STARTUP ACCOUNT</h3>

    <div className="right-side-inputs">
      <label>Startup Name</label>
      <input
        type="text"
        name="name"
        placeholder="My Startup Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Legal Representative *</label>
      <input
        type="text"
        name="representative"
        placeholder="Name and surname"
        value={representative}
        onChange={(e) => setRepresentative(e.target.value)}
        required
      />

      <label>Registered Business Address *</label>
      <input
        type="text"
        name="address"
        placeholder="Registered Business Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <label>Invite Mentors via email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email address to invite mentor"
        value={inviteEmails}
        onChange={(e) => setInviteEmails(e.target.value)}
        required
      />
      
      <button type="button" onClick={handleSend}>Register</button>

    </div>
    <div className="terms-note">
      By signing up to create an account I accept Company’s <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
    </div>
  </div>
</form>

          )}
    </div>
  );
}
