import React, { useEffect, useState } from "react";
import "./PendingJobsMentor.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingJobsMentor() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Decode token once
  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.userType, // make sure your backend calls it the same
      });
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.log("Failed to decode token:", err);
    }
  }, [token]);

  // Fetch applications when user is ready
  useEffect(() => {
    if (!user?.id) return; // wait until user.id exists

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/application/mentor/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // ensures cookies/JWTs if needed
          }
        );

        const apps = res.data.data || [];
        setApplications(apps);
      } catch (err) {
        console.log("Error fetching the data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, [user?.id, token]);

  const handleAcceptOffer = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:1000/api/v1/application/${id}`,
        { status: "assigned", acceptedStatus: "in progress" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedApp = res.data.data;
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApp : app))
      );
      alert("Job offer accepted successfully!");
    } catch (err) {
      console.error("Error accepting offer:", err.response?.data || err.message);
      alert("Failed to accept offer.");
    }
  };

  const handleRejectOffer = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:1000/api/v1/application/${id}`,
        { acceptedStatus: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedApp = res.data.data;
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApp : app))
      );
      alert("Job offer rejected.");
    } catch (err) {
      console.error("Error rejecting offer:", err.response?.data || err.message);
      alert("Failed to reject offer.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/application/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Error deleting app:", err.response?.data || err.message);
    }
  };

  const pendingJobs = applications.filter(
    (app) =>
      app.applicationType === "companyToMentor" &&
      app.acceptedStatus === "in progress"
  );

  console.log(pendingJobs, "Pending jobs");
  console.log("Applications:", applications);

  return (
    <div className="pending-jobs-mentor">
      <h2>Pending Jobs</h2>
      <p className="jobs-offered">Jobs offered from your startup</p>
      <div className="jobs-list">
        {pendingJobs.map((job) => (
          <div className="job-item" key={job._id}>
            <span className="job-name">{job.jobId?.title}</span>
            {job.companyId && <p>From: {job.companyId.name}</p>}
            {job.jobId?.description && <p>{job.jobId.description}</p>}
            <div className="job-actions">
              <button className="accept-btn" onClick={() => handleAcceptOffer(job._id)}>
                Accept
              </button>
              <button className="reject-btn" onClick={() => handleRejectOffer(job._id)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingJobsMentor;
