// =========================================================================
// PORTFOLIO CONFIGURATION DATA - SAURABH KUMAR
// =========================================================================

export interface Project {
  title: string;
  category?: string;
  tools?: string;
  description?: string;
  image: string;
  link?: string;
  video?: string;
}

export interface CareerExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  shortName: string;
  location: string;
  period: string;
  degree: string;
  department?: string;
  note?: string;
  score?: string;
  tag: string;
  current?: boolean;
}

export interface WhatIDoItem {
  title: string;
  description: string;
  skills: string[];
}

export interface PortfolioData {
  personal: {
    firstName: string;
    lastName: string;
    nativeName: string;
    age: number;
    title: string;
    tagline: string;
    educationSubtitle: string;
    role1: string;
    role2: string;
    email: string;
    phone: string;
    location: string;
    copyrightYear: string;
  };
  about: {
    title: string;
    description: string;
  };
  education: EducationItem[];
  career: CareerExperience[];
  whatIDo: {
    develop: WhatIDoItem;
    design: WhatIDoItem;
  };
  projects: Project[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    resumeUrl: string;
  };
  navbar: {
    logoText: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    firstName: "SAURABH",
    lastName: "KUMAR",
    nativeName: "सौरव कुमार",
    age: 18,
    title: "Physics Major at DTU & Digital Business and Entrepreneurship at IIM Bangalore",
    tagline: "Physics and Digital Business Entrepreneurship Student",
    educationSubtitle: "Pursuing Digital Business & Entrepreneurship from IIM Bangalore along with being a Physics student at DTU",
    role1: "DTU Delhi",
    role2: "IIM Bangalore",
    email: "saurabh.kumar126@iimb.ac.in",
    phone: "+91 92625 06391",
    location: "Delhi, India",
    copyrightYear: "2026",
  },

  about: {
    title: "About Me",
    description:
      "I am an 18-year-old student pursuing a dual track: majoring in Physics at Delhi Technological University (DTU) while concurrently pursuing Digital Business and Entrepreneurship from IIM Bangalore (IIMB). Originally from Ranchi and currently based in Delhi, I combine a rigorous quantitative foundation with national-level achievements in Physics and Mathematics Olympiads, hands-on experience in unmanned systems engineering, case-competition strategy, and a long-term interest in quantitative finance.",
  },

  education: [
    {
      institution: "Delhi Technological University (DTU)",
      shortName: "DTU Delhi",
      location: "Delhi, India",
      period: "2025 – Present",
      degree: "BS-MS in Physics",
      department: "Department of Applied Physics",
      tag: "Dual Degree Track",
      current: true,
    },
    {
      institution: "Indian Institute of Management (IIM) Bangalore",
      shortName: "IIM Bangalore",
      location: "Bangalore, India",
      period: "2025 – Present",
      degree: "BBA in Digital Business & Entrepreneurship",
      department: "Online Dual Degree Program",
      tag: "Concurrent Degree",
      current: true,
    },
    {
      institution: "Indian Institute of Science (IISc), Bangalore",
      shortName: "IISc Bangalore",
      location: "Bangalore, India",
      period: "2025 (One Semester)",
      degree: "Bachelor of Science (Research)",
      department:
        "Intended Major: Earth & Environmental Science | Intended Minor: Materials Science",
      note: "Withdrew after the first semester to pursue Physics at DTU alongside the IIM Bangalore BBA.",
      tag: "Research Scholar",
    },
    {
      institution: "Kairali School, Dhurwa",
      shortName: "Kairali School",
      location: "Ranchi, Jharkhand",
      period: "2025",
      degree: "12th Grade (CBSE)",
      department: "Physics, Chemistry, Mathematics + Computer Science",
      score: "84.46%",
      tag: "Senior Secondary",
    },
    {
      institution: "PM SHRI Kendriya Vidyalaya, Hinoo (1st Shift)",
      shortName: "KV Hinoo",
      location: "Ranchi, Jharkhand",
      period: "Secondary School",
      degree: "10th Grade (CBSE)",
      department: "Core Foundations in Sciences & Mathematics",
      score: "91.2%",
      tag: "Secondary School",
    },
  ],

  career: [
    {
      role: "IISER Aptitude Test (IAT)",
      company: "National Science & Research Entrance",
      period: "AIR 24",
      description:
        "● All India Rank 24.\n● Qualified for premier BS-MS research admissions across IISERs and Indian Institute of Science (IISc), Bangalore.",
    },
    {
      role: "National Olympiads (NSEP & NSEA)",
      company: "Indian Association of Physics Teachers (IAPT)",
      period: "Qualified",
      description:
        "● Qualified both national-level Olympiads: National Standard Examination in Physics (NSEP) and National Standard Examination in Astronomy (NSEA).",
    },
    {
      role: "American Invitational Mathematics Exam (AIME)",
      company: "Art of Problem Solving (AoPS) / MAA",
      period: "Qualified",
      description:
        "● Qualified for the American Invitational Mathematics Examination (AIME) via the international AMC pathway (Art of Problem Solving).",
    },
    {
      role: "National Defence Academy (NDA) Exam",
      company: "Union Public Service Commission (UPSC)",
      period: "2026",
      description:
        "● Qualified the National Defence Academy (NDA) Examination (2026).",
    },
    {
      role: "SOF National Olympiads",
      company: "Science Olympiad Foundation",
      period: "Gold Medal",
      description:
        "● State-rank holder and Gold Medalist across English, Science, and Mathematics Olympiads.",
    },
    {
      role: "Autonomous Vehicles & Robotics",
      company: "Delhi Technological University (DTU)",
      period: "DTU",
      description:
        "● Made Unmanned Ground Vehicle (UGV) at DTU.\n● Made Autonomous Underwater Vehicle (AUV) at DTU.",
    },
    {
      role: "Sports & Athletics Distinctions",
      company: "State & District Championships",
      period: "Champion",
      description:
        "● Blue belt in Taekwondo.\n● Ranchi state champion in cricket.\n● Silver medalist in district game of horse riding.\n● Kendriya Vidyalaya chess winner.",
    },
  ],

  whatIDo: {
    develop: {
      title: "PHYSICS & TECH",
      description:
        "SOLIDWORKS, CAD, NODE JS, PYTHON, REACT, CSS, HTML, JAVASCRIPT, TYPESCRIPT, LaTeX, Monte Carlo simulations, Curve fitting, circuit design, Quantum mechanics.",
      skills: [
        "SOLIDWORKS",
        "CAD",
        "Node.js",
        "Python",
        "React",
        "CSS",
        "HTML",
        "JavaScript",
        "TypeScript",
        "LaTeX",
        "Monte Carlo Simulations",
        "Curve Fitting",
        "Circuit Design",
        "Quantum Mechanics",
      ],
    },
    design: {
      title: "FINANCIAL SKILLS",
      description:
        "Excel, financial modelling, Statistics, Strong verbal communication and public speaking; case analysis and strategic presentation.",
      skills: [
        "Excel",
        "Financial Modelling",
        "Statistics",
        "Strong Verbal Communication",
        "Public Speaking",
        "Case Analysis",
        "Strategic Presentation",
      ],
    },
  },

  projects: [
    {
      title: "UGV DTU vehicle",
      description:
        "I along with my teammates made this Autonomous Vehicle and my team won various competitions such as Teknofest, UGVC.",
      image: "/images/ugv-dtu-vehicle.jpg",
      link: "mailto:saurabh.kumar126@iimb.ac.in",
    },
    {
      title: "AUV DTU vehicle",
      description:
        "I along with my teammates made this Autonomous Underwater Vehicle that goes up to 8m deep and my team won various competitions. I was handling the mechanical framework of this vehicle.",
      image: "/images/auv-dtu-vehicle.jpg",
      link: "mailto:saurabh.kumar126@iimb.ac.in",
    },
    {
      title: "IIMB CDPG Case Comp",
      description:
        "Participated in the IIM Bangalore CDPG (Centre for Digital Public Policy and Governance) DigiYatra Case Competition under Track 2 – Policy & Regulation as part of Team Sovereign Architectz.",
      image: "/images/iimb-cdpg-case-comp.jpg",
      link: "mailto:saurabh.kumar126@iimb.ac.in",
    },
    {
      title: "SEVA Rule Book",
      category: "Innovation Competition – DTU & Delhi Government",
      description:
        "I made the rule book of the SEVA innovation competition to be conducted by DTU along with the Delhi Government, featuring a whopping winning prize of ₹2 Crore.",
      image: "/images/seva-rulebook.jpg",
      link: "mailto:saurabh.kumar126@iimb.ac.in",
    },
    {
      title: "Metaverse Dog",
      category: "Crypto & NFT Startup – Indonesia",
      description:
        "I worked for a Crypto and NFT Indonesia-based startup under my advertisement agency and provided them their full website lookthrough, advertisement videos, and many more.",
      image: "/images/metaverse-dog.jpg",
      link: "mailto:saurabh.kumar126@iimb.ac.in",
    },
    {
      title: "Theory of Animate",
      category: "Digital Advertisement & Video Creation Agency",
      description:
        "I created a digital advertisement and video creation agency with a team of 3 other members with deliverables such as SEO management, advertisement video creation which may be animated (2D/3D), and all types of promo videos.",
      image: "/images/theory-of-animate.jpg",
      link: "https://www.fiverr.com/s/GdbY3Dx",
    },
  ],

  social: {
    github: "https://github.com/saurabhkeyboard69basher",
    linkedin: "https://www.linkedin.com",
    twitter: "https://x.com",
    instagram: "https://www.instagram.com",
    resumeUrl: "#",
  },

  navbar: {
    logoText: "SAURABH",
  },
};

export default portfolioData;
