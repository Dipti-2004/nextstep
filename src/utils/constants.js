import { today } from "./helpers";

export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export const STORAGE_KEY = "nextstep.jobs.v1";
export const THEME_KEY = "nextstep.theme";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Company A-Z" },
];

export const SAMPLE_JOBS = [
  {
    id: "s1",
    company: "Acme Labs",
    role: "Frontend Developer Intern",
    status: "Applied",
    date: today(),
    link: "",
    notes: "Applied through the careers page. Follow up next week.",
  },
  {
    id: "s2",
    company: "Northwind Tech",
    role: "React Developer",
    status: "Interview",
    date: "2026-10-15",
    link: "",
    notes: "Technical round on Friday. Revise hooks.",
  },

  {
    id: "s3",
    company: "Globex Systems",
    role: "Junior Web Developer",
    status: "Offer",
    date: "2026-10-02",
    link: "",
    notes: "Offer received. Reply by month end.",
  },

  {
    id: "s4",
    company: "Initech",
    role: "UI Developer",
    status: "Rejected",
    date: "2026-09-26",
    link: "",
    notes: "Rejected after the first round. Ask for feedback.",
  },
];
