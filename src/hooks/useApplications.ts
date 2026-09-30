import { useCallback, useEffect, useState } from "react";
import {
  loadApplications,
  saveApplications,
  type Application,
} from "@/lib/applications";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>(loadApplications);

  useEffect(() => {
    const sync = () => setApplications(loadApplications());
    window.addEventListener("baa-applications-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("baa-applications-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addApplication = useCallback(
    (data: Omit<Application, "id" | "createdAt">) => {
      saveApplications([
        { ...data, id: String(Date.now()), createdAt: Date.now() },
        ...loadApplications(),
      ]);
    },
    [],
  );

  const deleteApplication = useCallback((id: string) => {
    saveApplications(loadApplications().filter((a) => a.id !== id));
  }, []);

  return { applications, addApplication, deleteApplication };
};
