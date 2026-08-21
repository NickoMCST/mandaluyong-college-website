// Photography below is referenced from the public MCST site for this concept/demo
// only and is not owned by this project — it is not bundled locally because it
// isn't this project's asset to redistribute. Swap BASE for locally-owned or
// licensed photography before using this project as a live public portfolio piece.
export const BASE = "https://www.mandaluyongcollege.edu.ph/images";

// The seal below is an original placeholder graphic made for this concept —
// it is not the real MCST seal — bundled locally so the site doesn't depend
// on an external host for its own branding.
export const LOGO_URL = `${import.meta.env.BASE_URL}logo-placeholder.png`;

// Background theme played softly by <MusicPlayer /> (see layout/Root.tsx).
// Swap this file in public/audio/ to change the track.
export const MUSIC_URL = `${import.meta.env.BASE_URL}audio/campus-theme.mp3`;

export const BLUE = "#1565c0";
export const BLUE_DARK = "#0d47a1";
export const BLUE_DEEP = "#0a1628";
export const BLUE_MID = "#1976d2";
export const CREAM = "#f5f4f0";
export const CREAM_DARK = "#ece9e3";
export const INK = "#111827";
export const MUTED = "#6b7280";
export const WHITE = "#ffffff";

// Sentinel value used in nav/link data structures to mark an entry that
// should open the Student Portal demo-notice disclaimer instead of routing
// directly — see <PortalDisclaimerModal /> in layout/Root.tsx.
export const PORTAL_TRIGGER = "__student-portal__";

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Campus Life", to: "/campus" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export const PROGRAMS = [
  { code: "BACOM",  title: "Bachelor of Arts in Communication", dept: "College of Arts & Sciences",  img: `${BASE}/program_logo/bacom.jpg` },
  { code: "BSIS",   title: "BS Information Systems",            dept: "College of Computing",        img: `${BASE}/program_logo/bsis.png` },
  { code: "BSMATH", title: "BS Mathematics",                   dept: "College of Arts & Sciences",  img: `${BASE}/program_logo/bsmath.jpg` },
  { code: "BSN",    title: "BS Nursing",                       dept: "College of Health Sciences",   img: `${BASE}/program_logo/bsn.jpg` },
  { code: "BPED",   title: "Bachelor of Physical Education",   dept: "College of Education",        img: `${BASE}/program_logo/bped.jpg` },
  { code: "BPAD",   title: "Bachelor of Public Administration",dept: "College of Governance",       img: `${BASE}/program_logo/bpad.jpg` },
  { code: "BSC",    title: "BS Criminology",                   dept: "College of Criminal Justice", img: `${BASE}/bscrim.jpeg` },
  { code: "ECE",    title: "Early Childhood Education",        dept: "College of Education",        img: `${BASE}/bece.jpeg` },
  { code: "SNE",    title: "Special Needs Education",          dept: "College of Education",        img: `${BASE}/bsne.jpeg` },
];

export const DEPT_FILTERS = [
  { short: "All",             full: "All" },
  { short: "Arts & Sciences", full: "College of Arts & Sciences" },
  { short: "Computing",       full: "College of Computing" },
  { short: "Health",          full: "College of Health Sciences" },
  { short: "Education",       full: "College of Education" },
  { short: "Governance",      full: "College of Governance" },
  { short: "Justice",         full: "College of Criminal Justice" },
];

export const EVENTS = [
  { date: "Aug 28", year: "2026", tag: "Anniversary",  title: "MCST Foundation Day",          desc: "Cultural performances, academic honors recognition, and a special convocation marking our college anniversary.", img: `${BASE}/RecentEvents/1.jpeg` },
  { date: "Sep 5",  year: "2026", tag: "Seminar",      title: "Tech & Innovation Summit",     desc: "Industry mentors and alumni discuss emerging technology, public service, and the future of the digital economy.", img: `${BASE}/RecentEvents/2.jpeg` },
  { date: "Sep 20", year: "2026", tag: "Outreach",     title: "Community Service Week",       desc: "Students and faculty bring free health services, literacy programs, and skills workshops to Mandaluyong communities.", img: `${BASE}/RecentEvents/3.jpeg` },
  { date: "Oct 12", year: "2026", tag: "Ceremony",     title: "Recognition & Awarding",       desc: "Honoring the achievements of our scholars, leaders, and student organizations across every college.", img: `${BASE}/RecentEvents/4.jpeg` },
];

// Campus mosaic on the home page — each label matches the visible photo
export const MOSAIC = [
  { src: `${BASE}/slides/mcst-drone.png`, label: "The Campus",    span: "1 / 1 / 3 / 2" },
  { src: `${BASE}/slides/image6.jpg`,    label: "Student Life",  span: "1 / 2 / 2 / 3" },
  { src: `${BASE}/slides/image7.jpg`,    label: "Ceremonies",    span: "1 / 3 / 2 / 4" },
  { src: `${BASE}/slides/image10.jpeg`,  label: "Community",     span: "2 / 2 / 3 / 3" },
  { src: `${BASE}/slides/image24.jpeg`,  label: "Organizations", span: "2 / 3 / 3 / 4" },
];

export const ANNOUNCE = [
  "Admissions open for A.Y. 2026–2027",
  "MCST Foundation Day — August 28",
  "Community Service Week returns this September",
  "Now offering nine full degree programs",
];

export const UTILITY = [
  { label: "Students",          to: "/campus" },
  { label: "Faculty",           to: "/about" },
  { label: "Academic Calendar", to: "/events" },
  { label: "Program Finder",    to: "/programs" },
];

export const MENU = [
  {
    label: "Academics", to: "/programs",
    groups: [
      { title: "Programs", links: [
        { label: "All Degree Programs", to: "/programs", sub: "Browse our nine programs" },
        { label: "Arts & Sciences",     to: "/programs", sub: "Communication, Mathematics" },
        { label: "Computing",           to: "/programs", sub: "Information Systems" },
        { label: "Health Sciences",     to: "/programs", sub: "Nursing" },
      ]},
      { title: "Colleges", links: [
        { label: "College of Education",        to: "/programs", sub: "PE, ECE, SNE" },
        { label: "College of Governance",       to: "/programs", sub: "Public Administration" },
        { label: "College of Criminal Justice", to: "/programs", sub: "Criminology" },
      ]},
    ],
  },
  {
    label: "Admissions", to: "/contact",
    groups: [
      { title: "Apply", links: [
        { label: "Start an Application", to: "/contact", sub: "Begin your MCST journey" },
        { label: "Requirements",         to: "/contact", sub: "What you'll need" },
        { label: "Scholarships",         to: "/contact", sub: "Financial assistance" },
      ]},
      { title: "Guidance", links: [
        { label: "Program Finder",      to: "/programs", sub: "Find your fit" },
        { label: "Contact Admissions",  to: "/contact",  sub: "Talk to our office" },
      ]},
    ],
  },
  {
    label: "Campus Life", to: "/campus",
    groups: [
      { title: "Experience", links: [
        { label: "Life at MCST",           to: "/campus", sub: "Photos & moments" },
        { label: "Student Organizations",  to: "/campus", sub: "Get involved" },
        { label: "Events & Ceremonies",    to: "/events", sub: "What's happening" },
        { label: "Student Portal",         to: PORTAL_TRIGGER, sub: "Grades, schedule & documents" },
      ]},
    ],
  },
  {
    label: "About", to: "/about",
    groups: [
      { title: "The College", links: [
        { label: "Our Story",          to: "/about",   sub: "History & mission" },
        { label: "Institutional Values", to: "/about", sub: "What we stand for" },
        { label: "Contact Us",         to: "/contact", sub: "Reach the college" },
      ]},
    ],
  },
];

export const HERO_SLIDES = [
  {
    kicker: "Admissions · A.Y. 2026–2027",
    title: "Mandaluyong College",
    titleItalic: "of Science & Technology",
    body: "Educating principled graduates in science, technology, and public service — in the heart of Mandaluyong City.",
    img: `${BASE}/slides/mcst-drone.png`,
    ctaLabel: "View Programs", ctaTo: "/programs",
    altLabel: "Our Story",    altTo: "/about",
  },
  {
    kicker: "Now Enrolling",
    title: "Your future",
    titleItalic: "begins here",
    body: "Nine full degree programs rooted in rigorous standards and genuine community relevance. Applications are now open.",
    img: `${BASE}/slides/image1.jpg`,
    ctaLabel: "Apply Now",       ctaTo: "/contact",
    altLabel: "Explore Programs", altTo: "/programs",
  },
  {
    kicker: "Community & Service",
    title: "Learning that",
    titleItalic: "uplifts communities",
    body: "From health drives to literacy programs, our students carry their education into the city they call home.",
    img: `${BASE}/slides/image10.jpeg`,
    ctaLabel: "See Campus Life", ctaTo: "/campus",
    altLabel: "Recent Events",   altTo: "/events",
  },
];

export const QUICKLINKS = [
  { label: "Student Portal", desc: "Grades, schedule, documents & more", to: PORTAL_TRIGGER },
  { label: "Admissions",       desc: "Apply for A.Y. 2026–2027",      to: "/contact" },
  { label: "Program Finder",   desc: "Explore all nine programs",      to: "/programs" },
  { label: "Academic Calendar", desc: "Key dates & events",           to: "/events" },
];

// News images use photos distinct from the campus gallery to avoid repetition
export const NEWS = [
  { tag: "Announcement", date: "Aug 18, 2026", title: "Admissions for A.Y. 2026–2027 now open",      desc: "Applications are being accepted across all nine degree programs. Visit the admissions office to begin.",           img: `${BASE}/slides/image2.jpg` },
  { tag: "Research",     date: "Aug 10, 2026", title: "Student research showcased at city summit",    desc: "MCST scholars presented community-focused projects in technology and public service.",                           img: `${BASE}/slides/image4.jpeg` },
  { tag: "Community",    date: "Jul 28, 2026", title: "Outreach program reaches Mandaluyong barangays", desc: "Faculty and students delivered free health services and skills workshops citywide.",                         img: `${BASE}/slides/image9.jpeg` },
];
