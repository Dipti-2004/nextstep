import { STATUSES, SORT_OPTIONS } from "../utils/constants";

export default function Toolbar({
  query,
  onQuery,
  filter,
  onFilter,
  sort,
  onSort,
}) {
  return (
    <section className="tools">
      <input
        type="search"
        placeholder="Search company, role or notes..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Search applications"
      ></input>

      <select
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        aria-label="Filter by status"
      >
        <option value="All">All</option>
        {STATUSES.map((s) => (
          <option key={s} values={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        aria-label="Sort applications"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </section>
  );
}
