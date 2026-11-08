import { useState, useEffect } from "react";
import { STATUSES } from "../utils/constants";
import { formatDate } from "../utils/helpers";

export default function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(timer);
  }, [confirming]);

  return (
    <article className="job" style={{ "--c": `var(--${job.status})` }}>
      <div className="job-top">
        <div>
          <h3>{job.company}</h3>

          <div className="meta">
            {job.role} · Applied {formatDate(job.date)}
          </div>
        </div>
        <span className="badge">{job.status}</span>
      </div>

      {job.notes && <p className="notes">{job.notes}</p>}

      <div className="acts">
        {job.link && (
          <a href={job.link} target="_blank" rel="noopener noreferrer">
            View posting ↗;
          </a>
        )}

        <select
          aria-label={`Chnage status for ${job.company}`}
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} values={s}>
              {s}
            </option>
          ))}
        </select>

        <button className="btn sm" onClick={() => onEdit(job)}>
          Edit
        </button>

        {confirming ? (
          <button className="btn sm danger" onClick={() => onDelete(job.id)}>
            Confirm Delete
          </button>
        ) : (
          <button className="btn sm danger" onClick={() => setConfirming(true)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
