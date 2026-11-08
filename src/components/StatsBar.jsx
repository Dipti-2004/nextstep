import { STATUSES } from "../utils/constants";

export default function StatsBar({ counts, active, onSelect }) {
  const tabs = ["All", ...STATUSES];

  return (
    <section className="stats">
      {tabs.map((s) => (
        <button
          key={s}
          className={`stat ${active === s ? "on" : ""} `}
          style={{ "--c": s === "All" ? "var(--accent)" : `var(--${s})` }}
          onClick={() => onSelect(s)}
        >
          <b>{counts[s]}</b>
          <small>{s === "All" ? "Total" : s}</small>
        </button>
      ))}
    </section>
  );
}
