import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApplications } from "@/hooks/useApplications";
import type { Job } from "@/lib/jobs";

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  portfolio: "",
  github: "",
  linkedin: "",
  description: "",
};

// Accepts "github.com/user", "https:/user" typos, etc. Returns the cleaned
// URL, "" when empty, or null when it can't be a real web address.
const cleanUrl = (value: string): string | null => {
  const v = value.trim();
  if (!v) return "";
  const withScheme = /^https?:\/+/i.test(v)
    ? v.replace(/^(https?):\/+/i, "$1://")
    : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
};

const LINK_LABELS = { portfolio: "Portfolio", github: "GitHub", linkedin: "LinkedIn" } as const;

const ApplyForm = ({ job }: { job: Job }) => {
  const { addApplication } = useApplications();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const change =
    (k: keyof typeof empty) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const fail = (message: string) => {
    setError(message);
    setStatus("error");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const links = {
      portfolio: cleanUrl(form.portfolio),
      github: cleanUrl(form.github),
      linkedin: cleanUrl(form.linkedin),
    };
    for (const k of Object.keys(links) as (keyof typeof links)[]) {
      if (links[k] === null)
        return fail(
          `The ${LINK_LABELS[k]} link doesn't look right. Use a full address such as https://github.com/username`,
        );
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey)
      return fail(
        "The email service key is missing. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file and restart npm run dev.",
      );

    setStatus("loading");
    let result: { success?: boolean; message?: string };
    try {
      // Same Web3Forms channel the Contact page uses, so the team gets an email.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Job application: ${job.title} - ${form.firstName} ${form.lastName}`,
          from_name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          job: job.title,
          portfolio: links.portfolio,
          github: links.github,
          linkedin: links.linkedin,
          message: form.description,
        }),
      });
      result = await res.json();
    } catch {
      return fail(
        "Couldn't reach the email service. Check your internet connection and try again.",
      );
    }

    if (!result.success)
      return fail(
        `The email service rejected the application: ${result.message ?? "unknown reason"}.`,
      );

    addApplication({
      ...form,
      portfolio: links.portfolio ?? "",
      github: links.github ?? "",
      linkedin: links.linkedin ?? "",
      jobId: job.id,
      jobTitle: job.title,
    });
    setForm(empty);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-[.8rem] bg-[#E6F0FF] p-[2rem] text-[1.6rem] text-[#0B3558]">
        Application sent. Thank you for applying for {job.title}. We'll be in touch if your profile is a match.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid w-full max-w-[80rem] grid-cols-1 gap-[1.6rem] rounded-[1.2rem] bg-[#FAFAFA] p-[2rem] md:grid-cols-2 md:p-[3rem]"
    >
      <h4 className="text-[2rem] font-medium md:col-span-2">
        Apply for {job.title}
      </h4>

      <Field label="First name" id={`fn-${job.id}`}>
        <Input id={`fn-${job.id}`} required className="h-[4.4rem] bg-white" value={form.firstName} onChange={change("firstName")} />
      </Field>
      <Field label="Last name" id={`ln-${job.id}`}>
        <Input id={`ln-${job.id}`} required className="h-[4.4rem] bg-white" value={form.lastName} onChange={change("lastName")} />
      </Field>
      <Field label="Email" id={`em-${job.id}`}>
        <Input id={`em-${job.id}`} type="email" required autoComplete="email" className="h-[4.4rem] bg-white" value={form.email} onChange={change("email")} />
      </Field>
      <Field label="Phone number" id={`ph-${job.id}`}>
        <Input id={`ph-${job.id}`} type="tel" required autoComplete="tel" placeholder="+92 300 1234567" className="h-[4.4rem] bg-white" value={form.phone} onChange={change("phone")} />
      </Field>
      <Field label="Portfolio link" id={`pf-${job.id}`}>
        <Input id={`pf-${job.id}`} type="text" inputMode="url" placeholder="https://" className="h-[4.4rem] bg-white" value={form.portfolio} onChange={change("portfolio")} />
      </Field>
      <Field label="GitHub link" id={`gh-${job.id}`}>
        <Input id={`gh-${job.id}`} type="text" inputMode="url" placeholder="https://github.com/" className="h-[4.4rem] bg-white" value={form.github} onChange={change("github")} />
      </Field>
      <div className="md:col-span-2">
        <Field label="LinkedIn link" id={`li-${job.id}`}>
          <Input id={`li-${job.id}`} type="text" inputMode="url" placeholder="https://linkedin.com/in/" className="h-[4.4rem] bg-white" value={form.linkedin} onChange={change("linkedin")} />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="Tell us about yourself" id={`ds-${job.id}`}>
          <Textarea id={`ds-${job.id}`} required className="rounded-[.8rem] bg-white" value={form.description} onChange={change("description")} />
        </Field>
      </div>

      <div className="flex flex-col gap-[1rem] md:col-span-2">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Submit application"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-[1.4rem] text-red-600">
            {error}
          </p>
        )}
      </div>
    </form>
  );
};

const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-[.8rem]">
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

export default ApplyForm;
