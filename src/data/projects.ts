// data/projects.ts
export const projects = [
    {
      id: 1,
      title: "Roots Financial Platform",
      description: "Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.",
      date: "March 2025",
      technologies: ["Next.js", "React", "TailwindCSS", "Capital One Nessie API", "Gemini LLM", "Auth0"],
      highlights: [
        "Led frontend development for an award-winning financial platform, implementing responsive UI components with Next.js, React, and TailwindCSS.",
        "Collaborated in a cross-university team to create an intuitive interface leveraging Capital One's Nessie API for transaction simulation.",
        "Designed user experience focused on making complex financial concepts accessible through interactive visualizations and personalized recommendations.",
        "Won 'Best Financial Hack' at HackPrinceton Spring 2025."
      ],
      links: {
        github: "https://github.com/Roots-Finance",
        devpost: "https://devpost.com/software/roots-xk19te"
      }
    },
    {
      id: 2,
      title: "Georgia Tech RAG Chatbot",
      description: "Campus-wide chatbot enabling students to ask questions about Georgia Tech resources, courses, policies, and campus information.",
      date: "January 2025 - Present",
      technologies: ["Python", "LLM", "Vector Search", "NVIDIA", "Backend Development"],
      highlights: [
        "Contributing to an innovative campus-wide chatbot for Georgia Tech students to access information about campus resources and policies.",
        "Designed and implemented an efficient query processing system that ensures GT-focused responses while filtering out irrelevant queries.",
        "Collaborated with NVIDIA engineers through regular consultations to optimize vector search techniques and embedding models.",
        "Received technical guidance on performance optimization and system architecture from industry professionals."
      ],
      links: {
        github: "https://github.com/aigatech"
      }
    },
    {
      id: 3,
      title: "Linguality",
      description: "Language learning web application that helps users read books in 20+ languages while building vocabulary through interactive tools.",
      date: "November 2023 - Present",
      technologies: ["React", "TypeScript", "Firebase", "Flask", "Google Cloud Translate API", "SpaCy NLP"],
      highlights: [
        "Built a language learning web application using React, TypeScript, and Firebase that supports reading in over 20 languages.",
        "Engineered a Flask backend with NLP integration for context-aware translations of 90,000+ vocabulary items.",
        "Implemented spaced repetition algorithms to enhance language acquisition efficiency.",
        "Integrated Google Cloud Translate API and SpaCy NLP for accurate translations and natural language processing."
      ],
      links: {
        github: "https://github.com/andrewherndon/linguality",
        live: "https://linguality.app"
      }
    }
  ];