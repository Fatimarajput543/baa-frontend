import NavigationDropdown from "../common/NavigationDropdown";
import NavigationLink from "../common/NavigationLink";
import dropdownImg1 from "../../assets/images/dropdown-img-1.webm";
import dropdownImg2 from "../../assets/images/dropdown-img-2.webm";
import dropdownImg3 from "../../assets/images/dropdown-img-3.webm";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center gap-[3rem]">
        <li>
          <NavigationDropdown
            title="About"
            titleLink="/about"
            media={dropdownImg1}
            description="Discover who we are, how we work, and what we stand for."
            navItems={[
              {
                label: "Who We Are",
                link: "/about#who-we-are",
                description:
                  "Get to know the people, purpose, and experience behind BAA.",
              },
              {
                label: "Our Approach",
                link: "/about#our-approach",
                description:
                  "How we plan, execute, and deliver data-driven solutions that work in the real world.",
              },
              {
                label: "Our Commitment",
                link: "/about#our-commitment",
                description:
                  "Our promise to data integrity, quality, and long-term partnerships with every client.",
              },
              {
                label: "Key Policies",
                link: "/about#key-policies",
                description:
                  "Explore the principles that guide our work — transparency, reliability, and integrity.",
              },
              {
                label: "Careers",
                link: "/careers",
                description:
                  "Discover opportunities to grow with a team built on experience and trust.",
              },
            ]}
          />
        </li>
        <li>
          <NavigationDropdown
            title="Services"
            titleLink="/services"
            media={dropdownImg2}
            description="Explore the range of data and analytics solutions we provide for humanitarian and development work."
            navItems={[
              {
                label: "Data",
                link: "/services#data",
                description:
                  "End-to-end data collection, cleaning, and management for aid and development programs.",
              },
              {
                label: "Reporter",
                link: "/services#reporter",
                description:
                  "Automated reporting tools that turn raw field data into clear, shareable insights.",
              },
              {
                label: "ICT4D",
                link: "/services#ict4d",
                description:
                  "Technology solutions designed to support and scale development work in the field.",
              },
              {
                label: "Capacity Building",
                link: "/services#capacity-building",
                description:
                  "Training and support to help teams manage and use their own data systems confidently.",
              },
              {
                label: "GIS",
                link: "/services#gis",
                description:
                  "Geospatial mapping and analysis to guide operational and programmatic decisions.",
              },
              {
                label: "Machine Learning",
                link: "/services#machine-learning",
                description:
                  "Predictive models and automation that surface patterns in complex humanitarian data.",
              },
              {
                label: "Data Maturity Assessment",
                link: "/services#data-maturity-assessment",
                description:
                  "Evaluating an organization's current data practices to guide its next stage of growth.",
              },
            ]}
          />
        </li>
        <li>
          <NavigationDropdown
            title="Projects"
            titleLink="/projects"
            media={dropdownImg3}
            description="See how we deliver results across complex humanitarian and development environments."
            navItems={[
              {
                label: "Completed Projects",
                link: "/projects#completed-projects",
                description:
                  "A showcase of our successfully delivered data and analytics work.",
              },
              {
                label: "Ongoing Projects",
                link: "/projects#ongoing-projects",
                description:
                  "Explore current projects where our teams are actively working with partners.",
              },
              {
                label: "Project Highlights",
                link: "/projects#project-highlights",
                description:
                  "Key milestones, challenges, and achievements from select projects.",
              },
            ]}
          />
        </li>
        <li>
          <NavigationDropdown
            title="Resources"
            titleLink="/resources"
            media={dropdownImg1}
            description="Explore our knowledge base from expert insights to technical documents."
            navItems={[
              {
                label: "Blogs",
                link: "/blog",
                description:
                  "Insights and articles from the world of data analytics, MEAL, and humanitarian tech.",
              },
              {
                label: "Case Studies",
                link: "/resources#case-studies",
                description:
                  "Real-world examples of how BAA delivers results.",
              },
              {
                label: "News & Updates",
                link: "/resources#news-updates",
                description:
                  "The latest project launches, and company milestones from BAA.",
              },
              {
                label: "Whitepaper",
                link: "/resources#white-paper",
                description:
                  "In-depth technical papers and research on data analytics tailored for decision-makers.",
              },
            ]}
          />
        </li>
        <li>
          <NavigationLink link="/contact" label="Contact" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;