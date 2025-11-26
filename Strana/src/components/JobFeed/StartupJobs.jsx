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
      <div className="jobs-header">
        <h2>Your Startup Jobs</h2>
      </div>
      <div className="jobs-grid">
        {offers.map((offer) => {
          return(
          <div className="job-card-feed" key={offer._id}>
            <div className="job-logo">{offer.title}
            <h3 className="job-company">{offer.companyId.name}</h3>
            </div>
            <div className="job-offer">{offer.status}</div>
            <div className="job-desc">
              {offer.description}
            </div>
            <button className="view-more" onClick={() => {
                setSelectedJob(offer);
                setShowJobModal(true);
              }}>View More</button>
          </div>
          )
        }
        )}
      </div>
      {showJobModal && selectedJob && (
  <div className="modalBackdrop">
    <div className="modal">
      <span
        className="closeX"
        onClick={() => setShowJobModal(false) && setSelectedJob(null)} 
      >
        &times;
      </span>
      <h3>{selectedJob.title}</h3>
      <p className="jobDescFull">{selectedJob.description}</p>
      <strong>Skills required:</strong>{" "}
      {selectedJob.skillsRequired?.join(", ") || "Not specified"}
      <div>
              {user?.role === "mentor" && (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        "http://localhost:10000/api/v1/application",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            jobId: selectedJob._id,
                          }),
                        }
                      );

                      const data = await res.json();
                      if (res.ok) {
                        alert("You have successfully applied for this job!");
                        setSelectedJob(null);
                      } else {
                        alert(data.message || "Failed to apply for job");
                      }
                    } catch (err) {
                      console.log("Apply job error:", err);
                    }
                  }}
                >
                  Apply for Job
                </button>
              )}
            </div>
    </div>
  </div>
)}
    </div>
  );
}
