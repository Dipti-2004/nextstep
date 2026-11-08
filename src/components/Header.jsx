export default function Header({ theme, onToggleTheme, onAdd }) {
  return (
    <header className="header">
      <div>
        <h1>
          Next<span>Step</span>
        </h1>

        <p className="sub">
          Track every application, from first apply to final offer.
        </p>
      </div>

      <div className="row">
        <button
          className="btn"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button className="btn primary" onClick={onAdd}>
          + Add application
        </button>
      </div>
    </header>
  );
}
