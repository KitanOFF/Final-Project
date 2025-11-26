import React, { useEffect, useState } from "react";
import "./AssignedJobs.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function AssignedJobs() {
  const token = localStorage.getItem("token");

  const [jobsData, setJobsData] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // 1) Декодирање на JWT и сетирање на user
  useEffect(() => {
    if (!token) {
      console.log("No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      setUser({
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.role,
        // зависи што враќа backend-от (_id или id)
        id: decoded._id || decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token:", err.message);
      setLoading(false);
    }
  }, [token]);

  // 2) Влечење на applications за mentor
  useEffect(() => {
    if (!token) return;
    if (!user || !user.id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/application/mentor/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Full response:", res.data);

        // Очекуван shape: { status, data: { applications: [...] } }
        const apps =
          res.data?.data?.applications ??
          res.data?.data ??
          [];

        setJobsData(apps);
        console.log("Apps:", apps);
      } catch (err) {
        console.log(
          "Error fetching the data:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  // 3) Филтрирање на assigned jobs
  // status од моделот: ['pending', 'approved', 'rejected']
  const assignedJobs = jobsData.filter(
    (app) =>
      app.status === "approved" && // ако во базата ти е друго, смени тука
      app.applicationType === "companyToMentor" &&
      app.acceptedStatus &&
      ["in progress", "done", "rejected"].includes(app.acceptedStatus)
  );

  // 4) Филтер табови
  const filteredJobs =
    filter === "ALL"
      ? assignedJobs
      : assignedJobs.filter((job) => {
          if (filter === "DONE") return job.acceptedStatus === "done";
          if (filter === "REJECTED") return job.acceptedStatus === "rejected";
          if (filter === "IN PROGRESS")
            return job.acceptedStatus === "in progress";
          return true;
        });

  if (loading) {
    return (
      <div className="assigned-jobs-mentor">
        <h2>Assigned Jobs</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="assigned-jobs-mentor">
      <h2>Assigned Jobs</h2>

      {/* Tabs */}
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

      {/* Job list */}
      <div className="job-list-mentor">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-card-mentor">
            <span className="job-title-mentor">
              {job.jobId?.title || "Untitled job"}
            </span>

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
