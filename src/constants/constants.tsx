import Blog from "@/pages/Blog";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import {
  BadgeCheck,
  Ban,
  Car,
  FileText,
  Hand,
  Leaf,
  MessageCircleWarning,
  Scale,
  ShieldCheck,
  Database, BrainCircuit, MapPinned, TrendingUp
} from "lucide-react";
import archNova from "../assets/images/client-logo-1.webp"
import oxFam from "../assets/images/client-logo-2.webp"
import pakistanYouthChangesAdvocates from "../assets/images/client-logo-3.webp"
import saveTheChildren from "../assets/images/client-logo-4.webp"
import netTax from "../assets/images/client-logo-5.webp"
import riseEngineering from "../assets/images/client-logo-6.webp"
import teamImg01 from "../assets/images/1.webp";
import teamImg02 from "../assets/images/2.webp";
import teamImg03 from "../assets/images/3.webp";
import teamImg04 from "../assets/images/4.webp";
import teamImg05 from "../assets/images/5.webp";
import teamImg06 from "../assets/images/6.webp";
import teamImg07 from "../assets/images/7.webp"
import facebookIcon from "../assets/images/facebook-icon.svg";
import instagramIcon from "../assets/images/instagram-icon.svg";
import twitterIcon from "../assets/images/twitter-icon.svg";
import linkedinIcon from "../assets/images/linkedin-icon.svg";
import HI from "../assets/images/Hi.webp"
import HOP from "../assets/images/hop.webp"
import HARP from "../assets/images/HARP.webp"
import BAA from "../assets/images/BAA.webp"
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ProtectedRoute from "@/components/common/ProtectedRoute";

// Mobile Navigation Data

export const mobileNavigationLinkData = [
  {
    link: "/about",
    label: "About",
  },
  {
    link: "/",
    label: "Projects",
  },
  {
    link: "/blog",
    label: "Blogs",
  },
  {
    link: "/careers",
    label: "Careers",
  },
  {
    link: "/",
    label: "Contact",
  },
];

export const servicesAccordionData = [
  {
    label: "Data",
    link: "/services#data",
  },
  {
    label: "Reporter",
    link: "/services#reporter",
  },
  {
    label: "ICT4D",
    link: "/services#ict4d",
  },
  {
    label: "Capacity Building",
    link: "/services#capacity-building",
  },
  {
    label: "GIS",
    link: "/services#gis",
  },
  {
    label: "Machine Learning",
    link: "/services#machine-learning",
  },
  {
    label: "Data Maturity Assessment",
    link: "/services#data-maturity-assessment",
  },
];

// Page Routes
export const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <Post /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/projects", element: <Projects /> },
  { path: "/resources", element: <Resources /> },
  { path: "/contact", element: <Contact /> },
  { path: "/careers", element: <Careers /> },
  { path: "/admin/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

// Services Section Data

export const servicesData = [
  {
    hashId: "hi",
    image: HI,
    category: "Humanitarian Intelligence",
    title: "HI — Humanitarian Intelligence",
    description:
      "From hundreds of trusted sources to actionable insight. HI integrates humanitarian information, applies AI-powered analysis, and highlights emerging trends, needs, and risks.",
    button: "Explore HI",
  },
  {
    hashId: "hop",
    image: HOP,
    category: "Operations & Performance",
    title: "HOP — Humanitarian Operations & Performance",
    description:
      "Connect field activities with real-time program and performance visibility. HOP simplifies data collection, tracks beneficiaries and outputs, and monitors KPIs, budgets, and results.",
    button: "Explore HOP",
  },
  {
    hashId: "harp",
    image: HARP,
    category: "Alerts & Risk",
    title: "HARP — Humanitarian Alert & Risk Platform",
    description:
      "Stay ahead of emerging threats with automated alerts, localized risk monitoring, and action-oriented dashboards that help teams identify and manage critical risks.",
    button: "Explore HARP",
  },
  {
    hashId: "baa-ecosystem",
    image: BAA,
    category: "Integrated Intelligence",
    title: "The BAA Common Operational Picture",
    description:
      "Connect intelligence, operations, performance, funding, and risk information in one integrated environment—giving every level of the organization the information it needs to act.",
    button: "See How BAA Connects",
  },
];

// Experience Section Data

export const experienceData = [
  {
    icon: Database,
    title: "Trusted Data, One Operational Picture",
    description:
      "BAA brings together information from diverse and trusted sources to create a unified view of crises, programs, risks, and operational performance.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligence That Drives Decisions",
    description:
      "AI-powered analysis, dashboards, maps, and natural-language insights help decision-makers understand what matters without navigating fragmented reports.",
  },
  {
    icon: MapPinned,
    title: "Built for Field Operations",
    description:
      "From offline data collection to geo-mapped program monitoring, BAA connects field realities with management and strategic decision-making.",
  },
  {
    icon: TrendingUp,
    title: "Designed for Measurable Impact",
    description:
      "BAA helps organizations reduce reporting burdens, identify gaps, respond to risks earlier, and improve the effectiveness of humanitarian and development programs.",
  },
];

// Why Choose Section Data

export const whyChooseData = [
  {
    title: "Trusted & Connected Information",
    description:
      "Bring together verified information from UN agencies, governments, NGOs, media, and other trusted sources to create a reliable foundation for decision-making.",
  },
  {
    title: "From Field Data to Executive Insight",
    description:
      "Connect field teams, program managers, analysts, and senior leadership through a shared information environment—from data collection to strategic decision-making.",
  },
  {
    title: "Intelligence That Leads to Action",
    description:
      "Go beyond dashboards. Identify trends, detect risks, monitor performance, and turn information into clear actions and measurable outcomes.",
  },
];

// Trusted Section Data

export const partnersLogo = [
  { src: archNova, href: "https://arche-nova.org/en" },
  { src: oxFam, href: "https://www.oxfam.org/en" },
  { src: pakistanYouthChangesAdvocates, href: "https://pyca.org.pk/" },
  { src: saveTheChildren, href: "https://www.savethechildren.org/" },
  { src: riseEngineering, href: "https://risengineering.org/" },
  { src: netTax, href: "https://nettax.radixtech.org/" }
];

// Team Section Data

export const teamMembers = [
  {
    png: teamImg01,
    roles: ["Managing Director"],
  },
  {
    png: teamImg02,
    roles: ["Head of Field Operations"],
  },
  {
    png: teamImg03,
    roles: ["Lead Process Engineer"],
  },
  {
    png: teamImg04,
    roles: ["EPC Project Manager"],
  },
  {
    png: teamImg05,
    roles: ["HSE & Compliance Officer"],
  },
  {
    png: teamImg06,
    roles: ["Business Development Manager"],
  },{
    png: teamImg07,
    roles: ["Business Development Manager"],
  }
];

// Footer Data

export const aboutLinks = [
  {
    link: "/about#who-we-are",
    label: "Who We Are",
  },
  {
    link: "/about#our-approach",
    label: "Our Approach",
  },
  {
    link: "/about#our-commitment",
    label: "Our Commitment",
  },
  {
    link: "/about#key-policies",
    label: "Key Policies",
  },
  {
    link: "/careers",
    label: "Careers",
  },
];

export const servicesLinks = [
  {
    link: "/services#data",
    label: "Data",
  },
  {
    link: "/services#reporter",
    label: "Reporter",
  },
  {
    link: "/services#ict4d",
    label: "ICT4D",
  },
  {
    link: "/services#capacity-building",
    label: "Capacity Building",
  },
  {
    link: "/services#gis",
    label: "GIS",
  },
  {
    link: "/services#machine-learning",
    label: "Machine Learning",
  },
  {
    link: "/services#data-maturity-assessment",
    label: "Data Maturity Assessment",
  },
];

export const preojectsLinks = [
  {
    link: "/projects#completed-projects",
    label: "Completed Projects",
  },
  {
    link: "/projects#ongoing-projects",
    label: "Ongoing Projects",
  },
  {
    link: "/projects#project-highlights",
    label: "Project Highlights",
  },
];

export const resourcesLinks = [
  {
    link: "/blog",
    label: "Blogs",
  },
  {
    link: "/resources#case-studies",
    label: "Case Studies",
  },
  {
    link: "/resources#news-updates",
    label: "News & Updates",
  },
  {
    link: "/resources#white-paper",
    label: "Whitepaper",
  },
];

export const socialLinks = [
  {
    link: "#",
    icon: facebookIcon,
  },
  {
    link: "#",
    icon: instagramIcon,
  },
  {
    link: "#",
    icon: twitterIcon,
  },
  {
    link: "https://www.linkedin.com/company/baaforimpact/",
    icon: linkedinIcon,
  },
];


export const keyPoliciesData = [
  {
    icon: Ban,
    title: "Substance Abuse Policy",
    description:
      "We maintain a strict zero-tolerance policy towards the use of drugs and alcohol in the workplace. RISE Engineering prioritizes safety and productivity by promoting a substance-free environment across all operations.",
    link: "https://www.risengineering.org/documents/RISE-HSEQ-06_Sustainability_Policy.pdf",
    color: "#3A53A1",
  },
  {
    icon: Car,
    title: "Driving and Safety Policy",
    description:
      "All employees and contractors operating vehicles or machinery must adhere to strict safety protocols. We ensure that driving practices meet legal, operational, and environmental safety standards at all times.",
    link: "https://www.risengineering.org/documents/RISE-HSEQ-04_Driving_safety_Policy.pdf",
    color: "#63A079",
  },
  {
    icon: BadgeCheck,
    title: "Quality Policy",
    description:
      "RISE Engineering is committed to delivering consistent, high-quality outcomes across all projects. We follow industry best practices and continuous improvement models to meet and exceed client expectations.",
    link: "https://www.risengineering.org/documents/RISE-HSEQ-03_Quality_Policy.pdf",
    color: "#9B81B0",
  },
  {
    icon: ShieldCheck,
    title: "HSE Policy",
    description:
      "Our Health, Safety, and Environmental policy ensures that all activities are conducted with minimal risk to people, property, and the planet. Safety is ingrained in our culture and operations.",
    link: "https://www.risengineering.org/documents/RISE-HSEQ-02_HSE_Policy.pdf",
    color: "#719EB3",
  },
  {
    icon: MessageCircleWarning,
    title: "Grievance Handling and Conflict Resolution policy",
    description:
      "We promote an open and respectful workplace where employees can voice concerns without fear. Our policy ensures timely, fair, and confidential resolution of all grievances and conflicts.",
    link: "https://www.risengineering.org/documents/RISE-AHR-13_Grievance_handling_conflict_resolution_Policy.pdf",
    color: "#E68B30",
  },
  {
    icon: FileText,
    title: "Employee Code of Conduct",
    description:
      "All employees are expected to uphold the values of integrity, professionalism, and respect. This code outlines ethical behavior and accountability across all roles and responsibilities.",
    link: "https://www.risengineering.org/documents/RISE-AHR-12_Employee_Code_of_Conduct.pdf",
    color: "#8DB6B8",
  },
  {
    icon: Scale,
    title: "Equal Opportunity and Anti-Discrimination Policy",
    description:
      "We are committed to fostering an inclusive workplace where all individuals are treated fairly, regardless of race, gender, religion, or background. Equal opportunity is a cornerstone of our culture.",
    link: "https://www.risengineering.org/documents/RISE-AHR-11_Equal_Opportunity_anti_discrimination_policy.pdf",
    color: "#8DB6B8",
  },
  {
    icon: Hand,
    title: "Anti-Harassment and Bullying Policy",
    description:
      "RISE Engineering provides a safe and respectful work environment free from harassment, bullying, or intimidation. All reports are taken seriously and handled with sensitivity and discretion.",
    link: "https://www.risengineering.org/documents/RISE-AHR-10_Anti_Harassment_Bullying_policy.pdf",
    color: "#3A53A1",
  },
  {
    icon: Leaf,
    title: "Sustainability Policy",
    description:
      "We integrate sustainable practices into our engineering and construction processes. From resource optimization to eco-friendly materials, we aim to minimize our environmental footprint while maximizing value.",
    link: "https://www.risengineering.org/documents/Health-Policy.pdf",
    color: "#E68B30",
  },
];

// Faqs Accordion Data

export const faqsAccordionData = [
  {
    value: "item-1",
    title: "Who is BAA built for?",
    content: `BAA is built for humanitarian and development organizations — UN agencies, NGOs, government partners, and donors — who need to turn complex data into actionable intelligence and faster decisions.`,
  },
  {
    value: "item-2",
    title: "What is the BAA Common Operational Picture?",
    content: `The Common Operational Picture connects intelligence, operations, performance, funding, and risk information into one integrated environment, giving every level of the organization the information it needs to act.`,
  },
  {
    value: "item-3",
    title: "Can BAA integrate with our existing data sources and systems?",
    content: `Yes. BAA brings together information from diverse and trusted sources — including UN agencies, governments, NGOs, media, and internal systems — to create one unified operational view.`,
  },
  {
    value: "item-4",
    title: "How does BAA ensure data is trustworthy and reliable?",
    content: `BAA integrates and cross-references information from 200+ verified sources, applying AI-powered analysis to surface trends, needs, and risks with clear source attribution.`,
  },
  {
    value: "item-5",
    title: "Can BAA support field teams working offline or in low-connectivity areas?",
    content: `Yes. HOPE, our operations and performance platform, supports offline data collection and geo-mapped program monitoring, syncing field realities with management once connectivity is restored.`,
  },
  {
    value: "item-6",
    title: "How does BAA help identify and respond to emerging risks?",
    content: `HARP continuously monitors natural disasters, conflicts, epidemics, and other hazards, sending automated alerts and action-oriented dashboards so teams can respond before risks escalate.`,
  },
  {
    value: "item-7",
    title: "Does BAA support large-scale, multi-country humanitarian operations?",
    content: `Yes. BAA is designed to scale across complex, multi-partner humanitarian and development operations, connecting field data with strategic decision-making at every level of the organization.`,
  },
];
