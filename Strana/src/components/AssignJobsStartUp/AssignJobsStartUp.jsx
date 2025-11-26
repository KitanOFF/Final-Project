import React, { useState, useEffect } from "react";
import "./AssignedJobs.css";
import { jwtDecode } from "jwt-decode";

function AssignJobsStartUp() {
  const token = localStorage.getItem("token");
  const [jobsData, setJobsData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        desc: decoded.desc,
        email: decoded.email,
        phone: decoded.phone,
        photo: decoded.photo,
        skills: decoded.skills,
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [token]);

  console.log("User:", user);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) return;
      try {
        const res = await fetch(
          "http://localhost:1000/api/v1/startup/applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const text = await res.text();
        console.log("Response:", text);

        if (!res.ok) {
          throw new Error("Error fetching jobs");
        }

        const data = JSON.parse(text);
        console.log(data.data);
        setJobsData(data.data);
      } catch (err) {
        console.log("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [token]);

  const [filter, setFilter] = useState("ALL");
  const filteredJobs =
    filter === "ALL"
      ? jobsData
      : jobsData.filter((job) => {
          if (filter === "done") return job.acceptedStatus === "done";
          if (filter === "rejected") return job.acceptedStatus === "rejected";
          if (filter === "in progress")
            return job.acceptedStatus === "in progress";
          return true;
        });

  return (
    <div className="assigned-jobs-dashboard">
      <h2>Assigned Jobs</h2>

      <div className="tabs">
        {["all", "done", "rejected", "in progress"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="job-list">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-card">
            <span className="job-title">{job.jobId?.title}</span>
            <span
              className={`job-status status-${job.acceptedStatus
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {job.acceptedStatus.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignJobsStartUp;
