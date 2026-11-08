export const today = () => new Date().toISOString().slice(0, 10);

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export const formatDate = (dateString) =>
  new Date(dateString + "T00:00").toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";

export const sorters = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  az: (a, b) => a.company.localeCompare(b.company),
};

export const validateJob = (v) => {
  const errors = {};

  if (!v.company.trim()) errors.company = "Company is required";
  if (!v.role.trim()) errors.role = "Role is required";
  if (!v.date) errors.date = "Pick the date you applied";

  if (v.link.trim()) {
    try {
      const url = new URL(v.link.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.link = "Enter a valid URL starting with http:// or https://";
    }
  }
  return errors;
};
