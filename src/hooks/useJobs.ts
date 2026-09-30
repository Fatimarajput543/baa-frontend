import { useCallback, useEffect, useState } from "react";
import { loadJobs, saveJobs, type Job } from "@/lib/jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(loadJobs);

  useEffect(() => {
    const sync = () => setJobs(loadJobs());
    window.addEventListener("baa-jobs-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("baa-jobs-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addJob = useCallback((data: Omit<Job, "id" | "createdAt">) => {
    saveJobs([{ ...data, id: String(Date.now()), createdAt: Date.now() }, ...loadJobs()]);
  }, []);

  const updateJob = useCallback((id: string, data: Omit<Job, "id" | "createdAt">) => {
    saveJobs(loadJobs().map((j) => (j.id === id ? { ...j, ...data } : j)));
  }, []);

  const deleteJob = useCallback((id: string) => {
    saveJobs(loadJobs().filter((j) => j.id !== id));
  }, []);

  return { jobs, addJob, updateJob, deleteJob };
};
