// app/experience/page.tsx
"use client";
import { ExperienceCard } from "@/components/experience/experience-card";
import { DateTime, T } from "gt-next";
import { useGT } from "gt-next/client";

export default function ExperiencePage() {
    const t = useGT();
  return (
    <div className="space-y-10">
      <h1 className="heading-accent text-5xl font-bold text-center mb-12">
        <T id="app.experience.page.title">Work Experience</T>
      </h1>   
      <div className="p-10 rounded-2xl shadow-xl">
        {/* Cisco Systems Experience */}
          <ExperienceCard
            company="Cisco Systems, Inc."
            role={t("Software Engineering Intern")}
            location={t("San Jose, CA")}
            startDate={<DateTime>June 2024</DateTime>}
            endDate={<DateTime>August 2024</DateTime>}
            description={
              [
                t("Developed a Retrieval-Augmented Generation (RAG) agent using Ollama and LangChain to accelerate web page creation for internal teams."),
                t("Ensured that generated pages adhered to Cisco-specific styling and supported multiple front-end frameworks, maintaining consistency across projects."),
                t("Contributed to the agent's data set by creating reusable page templates and component structures in HTML, CSS, JavaScript, React, and Angular."),
                t("Significantly reduced the time required for internal teams to build UI pages, potentially cutting development time from hours to seconds.")
              ]
            }
            technologies={["React", "Angular", "Vue", "Ollama", "LangChain", "HTML", "CSS", "JavaScript"]}
          />
        
        {/* Effacita Experience */}
          <ExperienceCard
            company="Effacita"
            role={t("Founder & Digital Marketing Consultant")}
            location={t("Atlanta Metro Area, GA")}
            startDate={<DateTime>June 2022</DateTime>}
            endDate={<DateTime>March 2023</DateTime>}
            description={[
              t("Founded a digital marketing consultancy serving local businesses in the salon and beauty industry, creating targeted email campaigns to an audience of thousands."),
              t("Developed streamlined user registration systems for salon subscriptions and appointment scheduling, increasing user engagement and improving conversion rates."),
              t("Enhanced online presence for clients through review management systems, resulting in a 400% increase in Google reviews."),
              t("Achieved over 15% growth in customer interactions across multiple metrics.")
            ]}
            technologies={["Digital Marketing", "Email Campaigns", "User Registration Systems", "Review Management"]}
          />
      </div>
    </div>
  );
}