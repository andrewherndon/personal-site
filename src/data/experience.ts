// data/experience.ts
export const getExperiences = (t: (content: string) => string) => {
  return [
    {
      id: 1,
      company: t("Cisco Systems, Inc."),
      role: t("Software Engineering Intern"),
      location: t("San Jose, CA"),
      startDate: t("June 2024"),
      endDate: t("August 2024"),
      description: [
        t("Developed a Retrieval-Augmented Generation (RAG) agent using Ollama and LangChain to accelerate web page creation for internal teams."),
        t("Ensured that generated pages adhered to Cisco-specific styling and supported multiple front-end frameworks, maintaining consistency across projects."),
        t("Contributed to the agent's data set by creating reusable page templates and component structures in HTML, CSS, JavaScript, React, and Angular."),
        t("Significantly reduced the time required for internal teams to build UI pages, potentially cutting development time from hours to seconds.")
      ],
      technologies: [t("React"), t("Angular"), t("Vue"), t("Ollama"), t("LangChain"), t("HTML"), t("CSS"), t("JavaScript")]
    },
    {
      id: 2,
      company: t("Effacita"),
      role: t("Founder & Digital Marketing Consultant"),
      location: t("Atlanta Metro Area, GA"),
      startDate: t("June 2022"),
      endDate: t("March 2023"),
      description: [
        t("Founded a digital marketing consultancy serving local businesses in the salon and beauty industry, creating targeted email campaigns to an audience of thousands."),
        t("Developed streamlined user registration systems for salon subscriptions and appointment scheduling, increasing user engagement and improving conversion rates."),
        t("Enhanced online presence for clients through review management systems, resulting in a 400% increase in Google reviews."),
        t("Achieved over 15% growth in customer interactions across multiple metrics.")
      ],
      technologies: [t("Digital Marketing"), t("Email Campaigns"), t("User Registration Systems"), t("Review Management")]
    }
  ];
};