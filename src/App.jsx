import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";

import Toolbar from "./components/Toolbar";
import JobList from "./components/JobList";

import Panel from "./components/Panel";
import JobForm from "./components/JobForm";

import StatsBar from "./components/StatsBar";
import useLocalStorage from "./hooks/useLocalStorage";

import { systemTheme, sorters } from "./utils/helpers";
import {
  SAMPLE_JOBS,
  STATUSES,
  STORAGE_KEY,
  THEME_KEY,
} from "./utils/constants";

export default function App() {
  const [jobs, setJobs] = useLocalStorage(STORAGE_KEY, SAMPLE_JOBS);

  const [theme, setTheme] = useLocalStorage(THEME_KEY, systemTheme());

  const [filter, setFilter] = useState("All");

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const [panel, setPanel] = useState({ open: false, target: null, n: 0 });

  const openPanel = (target) =>
    setPanel((p) => ({ open: true, target, n: p.n + 1 }));
  const closePanel = () => setPanel((p) => ({ ...p, open: false }));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onKey = (e) =>
      e.key === "Escape" && setPanel((p) => ({ ...p, open: false }));

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const deleteJob = (id) => setJobs((list) => list.filter((j) => j.id !== id));

  const changeStatus = (id, status) =>
    setJobs((list) => list.map((j) => (j.id === id ? { ...j, status } : j)));

  const saveJob = (job) => {
    setJobs((list) =>
      list.some((j) => j.id === job.id)
        ? list.map((j) => (j.id === job.id ? job : j))
        : [job, ...list],
    );
    closePanel();
  };

  const counts = useMemo(() => {
    const c = { All: jobs.length };
    STATUSES.forEach((s) => {
      c[s] = jobs.filter((j) => j.status === s).length;
    });
    return c;
  }, [jobs]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return jobs
      .filter((j) => filter === "All" || j.status === filter)
      .filter(
        (j) =>
          !term ||
          `${j.company} ${j.role} ${j.notes}`.toLowerCase().includes(term),
      )
      .sort(sorters[sort]);
  }, [jobs, filter, query, sort]);

  return (
    <div className="wrap">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onAdd={() => openPanel("new")}
      />

      <StatsBar counts={counts} active={filter} onSelect={setFilter} />

      <Toolbar
        query={query}
        onQuery={setQuery}
        filter={filter}
        onFilter={setFilter}
        sort={sort}
        onSort={setSort}
      />

      <JobList
        jobs={visible}
        hasAny={jobs.length > 0}
        onEdit={openPanel}
        onDelete={deleteJob}
        onStatusChange={changeStatus}
      />

      <Panel open={panel.open} onClose={closePanel}>
        {panel.target !== null && (
          <JobForm
            key={panel.n}
            job={panel.target === "new" ? null : panel.target}
            onSave={saveJob}
            onCancel={closePanel}
          />
        )}
      </Panel>
    </div>
  );
}
