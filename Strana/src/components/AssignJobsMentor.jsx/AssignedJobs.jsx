import React, { useEffect, useState } from "react";
import "./AssignedJobs.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function AssignedJobs() {
  const token = localStorage.getItem("token");
  const [jobsData, setJobsData] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("ALL");


  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
setUser({
  name: decoded.name,
  photo: decoded.photo,
  role: decoded.role,      
  id: decoded._id || decoded.id, 
});

    } catch (err) {
      console.log("Failed to decode token");
    }
  }, [token]);

  
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/application/mentor/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const apps = res.data.data || [];
        setJobsData(apps);
        console.log("Apps:", apps);
      } catch (err) {
        console.log("Error fetching the data:", err.response || err.message);
      }
    };

    fetchData();
  }, [user, token]);

  
  const assignedJobs = jobsData.filter(
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

  return (
    <div className="assigned-jobs-mentor">
      <h2>Assigned Jobs</h2>

      
      <div className="tabs-mentor">
        {["ALL", "DONE", "REJECTED", "IN PROGRESS"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      
      <div className="job-list-mentor">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card-mentor">
            <span className="job-title-mentor">{job.jobId?.title}</span>
            <span
              className={`job-status-mentor status-${job.acceptedStatus
                ?.toLowerCase()
                .replace(" ", "-")}`}
            >
              {job.acceptedStatus.toUpperCase()}
            </span>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="no-jobs-text">No jobs found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default AssignedJobs;
