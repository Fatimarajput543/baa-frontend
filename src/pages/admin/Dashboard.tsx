import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JOB_TYPES, isExpired, type Job, type JobType } from "@/lib/jobs";

type Draft = Omit<Job, "id" | "createdAt">;
const blank: Draft = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  deadline: "",
  description: "",
  apply: "",
};

const Dashboard = () => {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const { applications, deleteApplication } = useApplications();
  const [form, setForm] = useState<Draft>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const set =
    (k: keyof Draft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateJob(editingId, form);
      setNotice("Job updated.");
    } else {
      addJob(form);
      setNotice("Job published.");
    }
    setForm(blank);
    setEditingId(null);
  };

  const startEdit = (job: Job) => {
    const { id, createdAt, ...rest } = job;
    void createdAt;
    setForm(rest);
    setEditingId(id);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (job: Job) => {
    if (window.confirm(`Delete "${job.title}"? This can't be undone.`)) {
      deleteJob(job.id);
      setNotice("Job deleted.");
    }
  };

  return (
    <AdminLayout>
    <main className="px-[2rem] py-[4rem] md:px-[4rem]">
      <Helmet>
        <title>BAA – Admin Dashboard</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-[120rem]">
        <h1 className="text-[3rem] leading-[4rem] font-medium tracking-[-0.4px]">
          Dashboard
        </h1>
        <p className="mt-[.4rem] text-[1.6rem] font-extralight text-[#4F4F4F]">
          Post jobs, then review the people who apply.
        </p>

        <div className="mt-[3rem] grid grid-cols-1 gap-[1.6rem] sm:grid-cols-3">
          <Stat label="Open jobs" value={jobs.filter((j) => !isExpired(j)).length} />
          <Stat label="Closed jobs" value={jobs.filter(isExpired).length} />
          <Stat label="Applications" value={applications.length} />
        </div>

        <Tabs defaultValue="jobs" className="mt-[4rem] gap-[2rem]">
          <TabsList className="!justify-start !bg-transparent !p-0">
            <TabsTrigger value="jobs" className="!px-0">Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="applications" className="!px-0">Applications ({applications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
        <form
          onSubmit={submit}
          className="grid grid-cols-1 gap-[2rem] rounded-[1.2rem] border border-[#E3E8F0] bg-white p-[2rem] md:grid-cols-2 md:p-[3rem]"
        >
          <h2 className="text-[2.2rem] font-medium md:col-span-2">
            {editingId ? "Edit job" : "Post a new job"}
          </h2>
          <Field label="Job title" id="title">
            <Input id="title" required className="h-[4.4rem] bg-white" value={form.title} onChange={set("title")} />
          </Field>
          <Field label="Department" id="department">
            <Input id="department" required className="h-[4.4rem] bg-white" value={form.department} onChange={set("department")} />
          </Field>
          <Field label="Location" id="location">
            <Input id="location" required className="h-[4.4rem] bg-white" value={form.location} onChange={set("location")} />
          </Field>
          <Field label="Job type" id="type">
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as JobType })}>
              <SelectTrigger id="type" className="h-[4.4rem] w-full bg-white text-[1.4rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Application deadline (optional)" id="deadline">
            <Input id="deadline" type="date" className="h-[4.4rem] bg-white" value={form.deadline} onChange={set("deadline")} />
          </Field>
          <Field label="Apply via (email or link, optional)" id="apply">
            <Input id="apply" className="h-[4.4rem] bg-white" value={form.apply} onChange={set("apply")} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description" id="description">
              <Textarea id="description" required className="rounded-[.8rem] bg-white" value={form.description} onChange={set("description")} />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-[1rem] md:col-span-2">
            <Button type="submit">{editingId ? "Save changes" : "Publish job"}</Button>
            {editingId && (
              <Button
                type="button"
                variant="transparent"
                onClick={() => {
                  setForm(blank);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            )}
            {notice && (
              <span role="status" className="text-[1.4rem] text-green-700">
                {notice}
              </span>
            )}
          </div>
        </form>

        <h2 className="mt-[6rem] text-[2.6rem] leading-[3.4rem] font-medium">
          Published jobs ({jobs.length})
        </h2>

        {jobs.length === 0 && (
          <p className="mt-[2rem] rounded-[.8rem] border border-dashed border-[#C9C9C9] p-[2rem] text-[1.6rem]">
            No jobs yet. Use the form above to publish your first role.
          </p>
        )}

        <ul className="mt-[2rem] flex flex-col gap-[1.2rem]">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex flex-wrap items-center justify-between gap-[1.6rem] rounded-[.8rem] border border-[#E3E8F0] bg-white p-[2rem]"
            >
              <div>
                <h3 className="text-[2rem] leading-[2.8rem] font-medium">
                  {job.title}
                  {isExpired(job) && (
                    <span className="ml-[1rem] rounded-[50px] bg-[#EFECEB] px-[1rem] py-[.2rem] text-[1.2rem] font-light">
                      Closed
                    </span>
                  )}
                </h3>
                <p className="text-[1.4rem] font-light text-[#4F4F4F]">
                  {job.department} · {job.location} · {job.type}
                </p>
              </div>
              <div className="flex gap-[1rem]">
                <Button variant="dark" onClick={() => startEdit(job)}>Edit</Button>
                <Button
                  onClick={() => remove(job)}
                  className="!bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
          </TabsContent>

          <TabsContent value="applications">
            {applications.length === 0 ? (
              <p className="rounded-[.8rem] border border-dashed border-[#C9C9C9] bg-white p-[2rem] text-[1.6rem]">
                No applications yet. They appear here when candidates apply from the careers page.
              </p>
            ) : (
              <ul className="flex flex-col gap-[1.2rem]">
                {applications.map((a) => (
                  <li key={a.id} className="flex flex-col gap-[1rem] rounded-[.8rem] border border-[#E3E8F0] bg-white p-[2rem]">
                    <div className="flex flex-wrap items-start justify-between gap-[1rem]">
                      <div>
                        <h3 className="text-[2rem] leading-[2.8rem] font-medium">
                          {a.firstName} {a.lastName}
                        </h3>
                        <p className="text-[1.4rem] font-light text-[#4F4F4F]">
                          Applied for {a.jobTitle} on {new Date(a.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <Button
                        className="!bg-red-600"
                        onClick={() => {
                          if (window.confirm(`Delete the application from ${a.firstName} ${a.lastName}?`)) deleteApplication(a.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-x-[2rem] gap-y-[.4rem] text-[1.4rem]">
                      <a className="text-[#006BFF] hover:underline" href={`mailto:${a.email}`}>{a.email}</a>
                      <a className="text-[#006BFF] hover:underline" href={`tel:${a.phone}`}>{a.phone}</a>
                    </div>
                    <div className="flex flex-wrap gap-x-[2rem] gap-y-[.4rem] text-[1.4rem]">
                      {a.portfolio && <a className="text-[#006BFF] hover:underline" href={a.portfolio} target="_blank" rel="noreferrer">Portfolio</a>}
                      {a.github && <a className="text-[#006BFF] hover:underline" href={a.github} target="_blank" rel="noreferrer">GitHub</a>}
                      {a.linkedin && <a className="text-[#006BFF] hover:underline" href={a.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                    </div>
                    <p className="max-w-[80rem] text-[1.6rem] leading-[2.6rem] font-extralight whitespace-pre-line">
                      {a.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
    </AdminLayout>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-[1.2rem] border border-[#E3E8F0] bg-white p-[2.4rem]">
    <p className="text-[1.4rem] font-light text-[#4F4F4F]">{label}</p>
    <p className="mt-[.4rem] text-[4rem] leading-[4.8rem] font-medium text-[#0B3558]">
      {value}
    </p>
  </div>
);

const Field = ({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-[.8rem]">
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

export default Dashboard;
