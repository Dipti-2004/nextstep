import { useState } from "react";
import { STATUSES } from "../utils/constants";
import { today, uid, validateJob } from "../utils/helpers";

const EMPTY = {
  company: "",
  role: "",
  status: "Applied",
  date: today(),
  link: "",
  notes: "",
};

export default function JobForm({ job, onSave, onCancel }) {
  const [values, setValues] = useState(job ?? EMPTY);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((re) => ({ ...errors, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateJob(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSave({
      ...values,
      company: values.company.trim(),
      role: values.role.trim(),
      link: values.link.trim(),
      notes: values.notes.trim(),
      id: values.id ?? uid(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 id="panel-title">
        {isEdit ? "Edit application" : "New application"}
      </h2>

      <div className="field">
        <label htmlFor="company">Company*</label>

        <input
          id="company"
          name="company"
          value={values.company}
          onChange={handleChange}
          placeholder="e.g. Acme Labs"
          autoFocus
        ></input>

        {errors.company && <span className="err">{errors.company}</span>}
      </div>

      <div className="field">
        <label htmlFor="role">Role*</label>

        <input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
        ></input>

        {errors.role && <span className="err">{errors.role}</span>}
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="date">Date applied*</label>

        <input
          id="date"
          name="date"
          type="date"
          value={values.date}
          onChange={handleChange}
        ></input>

        {errors.date && <span className="err">{errors.date}</span>}
      </div>

      <div className="field">
        <label htmlFor="link">Job link</label>

        <input
          id="link"
          name="link"
          value={values.link}
          onChange={handleChange}
          placeholder="https://..."
        ></input>

        {errors.link && <span className="err">{errors.link}</span>}
      </div>

      <div className="field">
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          placeholder="Contacts, interview dates, reminders..."
        ></textarea>
      </div>

      <div className="row">
        <button type="submit" className="btn primary">
          {isEdit ? "Save changes" : "Add application"}
        </button>

        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
