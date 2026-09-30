// Frontend-only job store (localStorage). Swap the functions below for API
// calls (WordPress REST, Firebase, Supabase, ...) when a backend is ready.

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Volunteer";

export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Volunteer",
];

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  deadline: string; // yyyy-mm-dd, empty = open until filled
  description: string;
  apply: string; // email address or URL
  createdAt: number;
}

const KEY = "baa_jobs";

const SEED: Job[] = [
  {
    id: "seed-1",
    title: "Data Analyst",
    department: "Analytics",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    deadline: "",
    description:
      "Clean, analyse and visualise field data for humanitarian and development programmes, and support dashboard delivery for clients.",
    apply: "info@baaforimpact.com",
    createdAt: 1,
  },
];

export const loadJobs = (): Job[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Job[]) : SEED;
  } catch {
    return SEED;
  }
};

export const saveJobs = (jobs: Job[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(jobs));
    window.dispatchEvent(new Event("baa-jobs-changed"));
  } catch {
    /* storage unavailable */
  }
};

export const isExpired = (job: Job) =>
  !!job.deadline && new Date(job.deadline) < new Date(new Date().toDateString());
