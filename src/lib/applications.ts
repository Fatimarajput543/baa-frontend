// Frontend-only application store (localStorage). Replace with an API later.

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
  description: string;
  createdAt: number;
}

const KEY = "baa_applications";

export const loadApplications = (): Application[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Application[]) : [];
  } catch {
    return [];
  }
};

export const saveApplications = (list: Application[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("baa-applications-changed"));
  } catch {
    /* storage unavailable */
  }
};
