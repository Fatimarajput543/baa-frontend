import { useMemo, useState } from "react";
import ApplyForm from "@/components/common/ApplyForm";
import { Helmet } from "react-helmet-async";
import { MapPin, CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionLabel from "@/components/common/SectionLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobs } from "@/hooks/useJobs";
import { isExpired, type Job } from "@/lib/jobs";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const JobCard = ({ job }: { job: Job }) => {
  const [open, setOpen] = useState(false);
  const closed = isExpired(job);
  const [applying, setApplying] = useState(false);

  return (
    <li
      className={`rounded-[1.2rem] border border-[#e9e2da] bg-white ${closed ? "opacity-60" : ""}`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-[2rem] p-[2rem] text-left md:p-[3rem]"
      >
        <div className="flex flex-col gap-[1rem]">
          <SectionLabel label={job.type} />
          <h3 className="text-[2.2rem] leading-[3rem] font-medium md:text-[2.6rem]">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-x-[2rem] gap-y-[.4rem] text-[1.4rem] font-light text-[#4F4F4F]">
            <span>{job.department}</span>
            <span className="inline-flex items-center gap-[.4rem]">
              <MapPin className="size-[1.6rem]" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-[.4rem]">
              <CalendarDays className="size-[1.6rem]" />
              {closed
                ? "Closed"
                : job.deadline
                  ? `Apply by ${fmt(job.deadline)}`
                  : "Open until filled"}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`size-[2.4rem] shrink-0 text-[#0B3558] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="flex flex-col items-start gap-[2rem] border-t border-[#e9e2da] p-[2rem] md:p-[3rem]">
          <p className="max-w-[80rem] text-[1.8rem] leading-[2.8rem] font-extralight whitespace-pre-line">
            {job.description}
          </p>
          {!closed && !applying && (
            <Button onClick={() => setApplying(true)}>Apply for this role</Button>
          )}
          {!closed && applying && <ApplyForm job={job} />}
        </div>
      )}
    </li>
  );
};

const Careers = () => {
  const { jobs } = useJobs();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      jobs.filter((j) =>
        `${j.title} ${j.department} ${j.location}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [jobs, query],
  );

  // One tab per job type that actually has jobs, plus "All jobs"
  const types = useMemo(() => [...new Set(jobs.map((j) => j.type))], [jobs]);

  const list = (items: Job[]) =>
    items.length === 0 ? (
      <p className="rounded-[.8rem] border border-dashed border-[#C9C9C9] p-[2rem] text-[1.6rem]">
        No roles match your search. Clear the search box to see every opening.
      </p>
    ) : (
      <ul className="flex flex-col gap-[1.6rem]">
        {items.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </ul>
    );

  return (
    <main>
      <Helmet>
        <title>BAA – Careers</title>
        <meta
          name="description"
          content="Join BAA and help humanitarian and development teams turn data into decisions. Browse our open roles."
        />
      </Helmet>

      <section className="bg-[#EFECEB] px-[2rem] pt-[14rem] pb-[8rem] md:px-[4rem] md:pt-[16rem]">
        <div className="mx-auto flex max-w-[128rem] flex-col gap-[2rem] text-center lg:text-left">
          <h1 className="text-[3rem] leading-[4rem] font-medium tracking-[-0.4px] md:text-[4.8rem] md:leading-[5.4rem]">
            <span className="text-[#006BFF]">Build a future</span> where data
            drives change.
          </h1>
          <p className="max-w-[70rem] text-[1.8rem] font-extralight md:text-[2rem] md:leading-[3rem]">
            {jobs.length} open {jobs.length === 1 ? "role" : "roles"} at BAA.
            Join a team that turns scattered field data into clear, actionable
            intelligence.
          </p>
        </div>
      </section>

      <section className="px-[2rem] py-[6rem] md:px-[4rem] md:py-[8rem]">
        <div className="mx-auto max-w-[128rem]">
          <Input
            placeholder="Search by title, team or city"
            aria-label="Search jobs"
            className="mb-[3rem] h-[4.4rem] max-w-[46rem]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Tabs defaultValue="all" className="gap-[3rem]">
            <TabsList className="!justify-start !bg-transparent !p-0">
              <TabsTrigger value="all" className="!px-0">
                All jobs ({filtered.length})
              </TabsTrigger>
              {types.map((t) => (
                <TabsTrigger key={t} value={t} className="!px-0">
                  {t} ({filtered.filter((j) => j.type === t).length})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">{list(filtered)}</TabsContent>
            {types.map((t) => (
              <TabsContent key={t} value={t}>
                {list(filtered.filter((j) => j.type === t))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Careers;
