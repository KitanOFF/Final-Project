import "./MentorInfo.css";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AiButton from "../../components/AiButton/AiButton";
import Logout from "../../components/LogOut"; 
import { useNavigate } from "react-router-dom";



function MentorInfo() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return;
    }
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded user in StartupDashboard:", decoded);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.role,
        id: decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token");
    }
  }, [token]);
  console.log(user);
  useEffect(() => {
    if (!token) return;

const fetchMentorDetails = async () => {
  try {
    const res = await axios.get(
      `http://localhost:1000/api/v1/startup/mentordetailsforstartup/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = res.data.data;
    setMentor(data.mentor);

    const combinedJobs = [
      ...(data.assignedJobs || []),
      ...(data.pendingJobs || []),
      ...(data.doneJobs || []),
      ...(data.inProgressJobs || []),
      ...(data.rejectedJobs || []),
    ];

    const uniqueJobs = Array.from(
      new Map(combinedJobs.map((job) => [job._id, job])).values()
    );

    const pending = (data.pendingJobs || []).filter(
      (job) => job.acceptedStatus !== "rejected"
    );

    setAllJobs(uniqueJobs);
    setPendingJobs(pending);
  } catch (err) {
    console.error("Error fetching mentor details:", err);
  }
};

    fetchMentorDetails();
  }, [id, token]);

  const handleOfferJob = async () => {
    if (!jobTitle.trim() || !jobDesc.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/application",
        {
          mentorId: mentor._id,
          jobData: { title: jobTitle, description: jobDesc },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Offer job response:", res);
      if (res.status === 200) {
        alert("Job offer sent successfully!");
        const newJob = {
          applicationId: res.data.data.newApp._id,
          _id: res.data.data.newApp.jobId,
          title: jobTitle,
          status: "pending",
        };
        console.log(newJob);

        setPendingJobs((prev) => [...prev, newJob]);
        setShowOfferModal(false);
        setJobTitle("");
        setJobDesc("");
      } else {
        alert(res.data.message || "Failed to offer job");
      }
    } catch (err) {
  console.error("Offer job error:", err);
  if (err.response) {
    console.error("Backend response:", err.response.data);
    console.error("Status code:", err.response.status);
  } else {
    console.error("No response received:", err.message);
  }
}
  };

  const assignedJobs = allJobs.filter(
    (app) =>
      app.status === "assigned" &&
      app.applicationType === "companyToMentor" &&
      app.acceptedStatus &&
      ["in progress", "done", "rejected"].includes(app.acceptedStatus)
  );

  const filteredJobs =
    filter === "ALL"
      ? assignedJobs
      : assignedJobs.filter((job) => {
          if (filter === "done") return job.acceptedStatus === "done";
          if (filter === "rejected") return job.acceptedStatus === "rejected";
          if (filter === "in progress")
            return job.acceptedStatus === "in progress";
          return true;
        });

        console.log("Filtered jobs:", filteredJobs);
        

  const handleCancelOffer = async (applicationId) => {
  if (!window.confirm("Cancel this job offer?")) return;

  try {
    const res = await axios.patch(
      `http://localhost:1000/api/v1/application/${applicationId}`,
      { acceptedStatus: "rejected" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.status === 200) {
      setPendingJobs(prev => prev.filter(job => job.applicationId !== applicationId));
    }
  } catch (err) {
    console.error("Cancel offer error:", err);
    alert("Something went wrong while cancelling the offer.");
  }
};

  return (
    <div className="Main-Container">
      <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="./Group 8626.png" alt="" className="img"/>
        </div>
        <button className="collapse-btn">
          <img src="small-arrow-left.png" alt="small arrow" className="small-arrow-left"/>
        </button>
      </div>

      <div className="sidebar-menu">
        <div className="menu-item" onClick={() => navigate("/dashboard")}>
          <img src="profile.svg" className="menu-icon" />
          <p>Dashboard</p>
        </div>

        <div className="menu-item active" onClick={() => navigate("/mentors")}>
          <img src="4koc.png" className="menu-icon" />
          <p>Mentors</p>
        </div>

        <div className="menu-item" onClick={() => navigate("/Job")}>
          <img src="disc.png" className="menu-icon" />
          <p>Jobs</p>
        </div>
        <AiButton/>
      </div>

      <Logout/>
    </div>
      <div className="dashboard-center">
       
        <div className="dashboard-main-mentors">
          <div className="mentor-profile-row">
            <div className="mentor-profile-card">
              <img
                src="/kierra.png"
                alt="Kierra Press"
                className="mentor-avatar"
              />
              <div className="mentor-profile-name">
                {mentor?.name}
                <img
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  style={{ width: 15, height: 15, marginLeft: 6 }}
                />
              </div>
              <div className="mentor-profile-title">Sales Representative</div>
              <div className="mentor-profile-contact">
                <div className="mentor-profile-contact-row">
                  <img
                    src="/mail-icon.svg"
                    alt=""
                    style={{ width: 15, height: 15, opacity: 0.6 }}
                  />
                  {mentor?.email}
                </div>
                <div className="mentor-profile-contact-row">
                  <img
                    src="/phone-icon.svg"
                    alt=""
                    style={{ width: 15, height: 15, opacity: 0.7 }}
                  />
                  {mentor?.phone}
                </div>
              </div>
            </div>

            <div className="mentor-info-card">
              <div className="mentor-info-header-row">
                <div>
                  <span className="mentor-info-title">About Mentor</span>
                  <div className="mentor-info-skills">
                    <b>Skills:</b>
                    {mentor?.skills?.join(" | " || "No skills")}
                  </div>
                </div>
                <button
                  className="mentor-info-btn"
                  onClick={() => setShowOfferModal(true)}
                >
                  <span>+</span> Offer New Job
                </button>
              </div>
              {showOfferModal && (
                <>
                  <div
                    className="modalBackdrop"
                    onClick={() => setShowOfferModal(false)}
                  />

                  <div className="modalWrapper">
                    <div className="modal">
                      <button
                        className="closeBtn"
                        onClick={() => setShowOfferModal(false)}
                      >
                        &times;
                      </button>

                      <h3>Offer New Job</h3>

                      <input
                        type="text"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="input"
                      />

                      <textarea
                        placeholder="Job Description"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        className="textarea"
                      />

                      <div className="modalActions">
                        <button className="submitBtn" onClick={handleOfferJob}>
                          Send Offer
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="mentor-info-text">
                {mentor?.desc || "No description"}
              </div>
            </div>
            
          </div>
          <div className="jobs-startup-mentors">
            <div className="assigned-jobs">
              <h2>Assigned Jobs</h2>
              <div className="tabs">
                {["all", "done", "rejected", "in progress"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${filter === tab ? "active" : ""}`}
                    onClick={() => setFilter(tab)}
                  >
                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
              <div className="job-list">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <span className="job-title">{job?.title}</span>
                    <span
                        className={`job-status status-${job.acceptedStatus
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {job?.acceptedStatus.toUpperCase()}
                      </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pending-offers-section">
            <h3>Pending Job Offers</h3>
            {pendingJobs.length === 0 ? (
              <p>No pending offers</p>
            ) : (
              pendingJobs.map((job) => (
                  <div className="pending-offers-list">
                      <div className="pending-offer-card" key={job.applicationId}>
                        <span className="pending-offer-title">
                          {job.title}
                        </span>
                        <button className="pending-offer-btn" onClick={() => handleCancelOffer(job.applicationId)}>
                          Cancel Offer
                        </button>
                      </div>
                  </div>
              ))
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorInfo;