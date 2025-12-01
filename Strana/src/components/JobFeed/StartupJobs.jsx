import React from 'react';
import './StartupJobs.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'

export default function StartupJobs() {
  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState({});
  const [showJobModal, setShowJobModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")

  const token = localStorage.getItem("token")
  
  useEffect(() => {
    if (!token) return;

    try{
      const decoded = jwtDecode(token);
      console.log(decoded)
      setUser({
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        desc: decoded.desc,
        email: decoded.email,
        phone: decoded.phone,
        skills: decoded.skills,
      })
    } catch (err) {
      console.log("fail");
    }
  }, [token]);

  useEffect(() => {
     if (!user || !user.id) return;

    const fetchOffers = async () => {
      try{
        const res = await fetch('http://localhost:1000/api/v1/jobs',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await res.json();
        console.log("Api response:", data);
        
        setOffers(data.data?.allJobs || []);
        console.log(data.data?.allJobs);
        
      }catch(err){
        console.log(err.message);
      }
    }
    fetchOffers();
  }, [user, token]
)
  
  return (
  <div>
  <div className="jobs-header-JoBs">
    <h2>Your Startup Jobs</h2>
  </div>
  <div className="jobs-grid-JoBs">
    {offers.map((offer) => (
      <div className="job-card-feed-JoBs" key={offer._id}>
        <div className="jobCardContent-JoBs">
          <img
            src={offer.companyId.logoUrl || "/placeholder-logo.png"}
            alt={offer.companyId.name}
            className="logo-img-JoBs"
          />
          <div className="job-info-JoBs">
            <span className="job-title-JoBs">{offer.title}</span>
            <span className="job-company-JoBs">{offer.companyId.name}</span>
            <span className="job-offer-JoBs">{offer.status}</span>
            <span className="job-desc-JoBs">{offer.description}</span>
            <button
              className="view-more-JoBs"
              onClick={() => {
                setSelectedJob(offer);
                setShowJobModal(true);
              }}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  {showJobModal && selectedJob && (
    <div className="modalBackdrop-JoBs">
      <div className="modal-JoBs">
        <span
          className="closeX-JoBs"
          onClick={() => {
            setShowJobModal(false);
            setSelectedJob(null);
          }}
        >
          &times;
        </span>
        <div className="modalHeader-JoBs">
          <img
            src={selectedJob.companyId.logoUrl || "/placeholder-logo.png"}
            alt={selectedJob.companyId.name}
            className="logo-img-JoBs"
          />
          <div>
            <div className="job-company-JoBs">{selectedJob.companyId.name}</div>
            <div className="job-title-JoBs">{selectedJob.title}</div>
          </div>
        </div>
        <div className="job-offer-JoBs">{selectedJob.status}</div>
        <p className="jobDescFull-JoBs">{selectedJob.description}</p>
        <strong>Skills required:</strong>{" "}
        {selectedJob.skillsRequired?.join(", ") || "Not specified"}
        <div style={{ marginTop: "24px" }}>
         {user?.role === "mentor" && (
  <button
    className="modalApplyBtn-JoBs"
    onClick={async () => {
      try {
        const res = await fetch("http://localhost:1000/api/v1/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: selectedJob._id,
            mentorId: user.id,                         
            companyId: selectedJob.companyId._id,     
            applicationType: "mentorToCompany",        
          }),
        });

        const data = await res.json();
        console.log("apply response:", data);

        if (res.ok) {
          alert("You have successfully applied for this job!");
          setSelectedJob(null);
          setShowJobModal(false);
        } else {
          alert(data.message || "Failed to apply for job");
        }
      } catch (err) {
        console.log("Apply job error:", err);
      }
    }}
  >
    Apply
  </button>
)}
        </div>
      </div>
    </div>
  )}
</div>


  );
}
