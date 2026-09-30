import PageHeroSection from "@/components/common/PageHeroSection";
import projectPageImg01 from "../assets/images/project-page-img-01.png";
import projectPageImg02 from "../assets/images/project-page-img-02.png";
import projectPageImg03 from "../assets/images/project-page-img-03.png";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import ProcessTimeline from "@/components/common/ProcessTimeline";
import TrustedSection from "@/components/sections/TrustedSection";
import CtaSection from "@/components/sections/CtaSection";
import ProjectHighlightSection from "@/components/sections/ProjectHighlightSection";
import { NavLink } from "react-router-dom";

const Projects = () => {
  return (
    <main>
      <Helmet>
        <title>BAA – Projects</title>
        <meta
          name="description"
          content="RadixTech's MEAL System simplifies monitoring and evaluation, delivering real-time insights to empower humanitarian aid organizations."
        />
      </Helmet>
      <PageHeroSection
        title="Explore Our Landmark Projects"
        description="From concept to completion, our projects reflect precision, performance, and partnership. Dive into our portfolio of successful executions across industries"
        benefits={[
          "40 years of combined experience",
          "Oil & Gas, Infrastructure & Energy",
        ]}
        slides={[
          {
            image: projectPageImg01,
            title: "Offshore Platform Installation",
            description:
              "Executed a full-scale offshore platform installation, ensuring structural integrity and safety compliance in deepwater conditions.",
          },
          {
            image: projectPageImg02,
            title: "Refinery Piping & Mechanical Works",
            description:
              "Delivered end-to-end piping, welding, and mechanical services for a leading refinery under strict HSE protocols.",
          },
          {
            image: projectPageImg03,
            title: "Gas Compression Facility Upgrade",
            description:
              "Upgraded a regional gas compression station with state-of-the-art automation and optimized throughput efficiency.",
          },
        ]}
      >
        <Button variant="dark" asChild>
          <NavLink to="/projects">View All Projects</NavLink>
        </Button>
        <Button asChild>
          <NavLink to="/contact">Contact Our Team</NavLink>
        </Button>
      </PageHeroSection>
      <div className="bg-[#F7F7F7]">
        <ProjectHighlightSection />
      </div>
      <div className="overflow-hidden bg-[#EFECEB]">
        <ProcessTimeline
          steps={[
            {
              hashId: "completed-projects",
              title: "Completed Projects",
              points: [
                "50MW gas turbine plant successfully commissioned",
                "Cross-country pipeline installation completed",
                "Refinery tank coating and inspection finalized",
                "Petrochemical plant structure erected",
                "Offshore automation system delivered",
                "Civil infrastructure for LNG terminal built",
              ],
            },
            {
              hashId: "ongoing-projects",
              title: "Ongoing Projects",
              points: [
                "Electrical systems installation in refinery underway",
                "Onshore fabrication and modular assembly in progress",
                "Fire-proofing and protective coating on-site",
                "Instrumentation and control setup active",
                "EPCM coordination with global suppliers ongoing",
                "QA/QC inspection for critical infrastructure underway",
              ],
            },
            {
              hashId: "project-highlights",
              title: "Project Highlights",
              points: [
                "30+ major contracts delivered across regions",
                "Zero LTI (Lost Time Incident) record maintained",
                "End-to-end EPCC handled in-house",
                "Automation integrated with mechanical works",
                "Industry-standard certifications achieved",
                "On-time delivery with agile project management",
              ],
            },
            {
              hashId: "",
              title: "Engineering Excellence",
              points: [
                "Structural, mechanical, and E&I engineering",
                "3D modeling and clash detection with BIM",
                "Process optimization studies conducted",
                "Tailored engineering for brownfield projects",
                "Skilled in FEED and detail engineering",
                "Expert review and documentation compliance",
              ],
            },
            {
              hashId: "",
              title: "Civil & Construction",
              points: [
                "Grading, excavation, and foundational works",
                "Structural steel and concrete erection",
                "Roads, culverts, and site development",
                "Boundary wall and drainage infrastructure",
                "Building construction and utility setup",
                "Compliance with local building codes",
              ],
            },
            {
              hashId: "",
              title: "Inspection & Testing",
              points: [
                "NDT (Non-Destructive Testing) services",
                "Hydrostatic and pneumatic pressure tests",
                "Coating and material quality assessments",
                "Instrument loop and function testing",
                "Welding inspection and radiographic testing",
                "Test report documentation and certification",
              ],
            },
          ]}
        />
      </div>
      <TrustedSection />
      <CtaSection />
    </main>
  );
};

export default Projects;
