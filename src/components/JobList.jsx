import JobCard from "./JobCard";

export default function JobList({
  jobs,
  hasAny,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (jobs.length === 0) {
    return (
      <div className="empty">
        {hasAny
          ? "No applications match your search or filter."
          : 'No applications yet. Click "Add application" to start tracking.'}
      </div>
    );
  }

  return (
    <section className="list">
      {jobs.map((j) => (
        <JobCard
          key={j.id}
          job={j}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}

     
    </section>
  );
}
