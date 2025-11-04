import React, { useState } from "react";

const jobsData = [
  { id: 1, title: "Revenue per rate", status: "DONE" },
  { id: 2, title: "ARPU (Average revenue per use)", status: "REJECTED" },
  { id: 3, title: "CAC (Custom Acquisition Cost)", status: "IN PROGRESS" },
  { id: 4, title: "Churn Rate", status: "DONE" },
  { id: 5, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 6, title: "Operation Efficiency", status: "DONE" },
  { id: 7, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 8, title: "Operation Efficiency", status: "DONE" },
  { id: 9, title: "Burn Rate", status: "IN PROGRESS" },
  { id: 10, title: "Operation Efficiency", status: "DONE" },
];

const PAGE_SIZE = 6;

function AssignedJobs() {
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredJobs =
    filter === "ALL"
      ? jobsData
      : jobsData.filter((job) => {
          if (filter === "DONE") return job.status === "DONE";
          if (filter === "REJECTED") return job.status === "REJECTED";
          if (filter === "IN PROGRESS") return job.status === "IN PROGRESS";
          return true;
        });

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

  const paginatedJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset page to 1 when filter changes
  React.useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="assigned-jobs">
      <h2>Assigned Jobs</h2>
      <div className="tabs">
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

      <div className="job-list">
        {paginatedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <span className="job-title">{job.title}</span>
            <span
              className={`job-status status-${job.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          &lt; Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default AssignedJobs;