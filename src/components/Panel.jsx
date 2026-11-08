export default function Panel({ open, onClose, children }) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />

      <aside
        className={`panel ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        aria-hidden={!open}
      >
        {children}
      </aside>
    </>
  );
}
