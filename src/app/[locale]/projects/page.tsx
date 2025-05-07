// app/projects/page.tsx
"use client";
import { ProjectCard } from "@/components/projects/project-card";
import { DateTime, T } from "gt-next";
import { useGT } from "gt-next/client";

export default function ProjectsPage() {
    const t = useGT();
    return (
    <div className="space-y-10">
      <h1 className="heading-accent text-5xl font-bold text-center mb-12">
        <T id="app.projects.page.title">Projects</T>
      </h1>

      <div className="bg-background/98 p-10 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Roots Financial Platform */}
          <T id="app.projects.page.roots">
            <ProjectCard 
              title="Roots Financial Platform"
              description={t("Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.")}
              date={<DateTime>27 March 2025</DateTime>}
              technologies={["Next.js", "React", "TailwindCSS", "Capital One Nessie API", "Gemini LLM", "Auth0"]}
              highlights={[
                t("Led frontend development for an award-winning financial platform, implementing responsive UI components with Next.js, React, and TailwindCSS."),
                t("Collaborated in a cross-university team to create an intuitive interface leveraging Capital One's Nessie API for transaction simulation."),
                t("Designed user experience focused on making complex financial concepts accessible through interactive visualizations and personalized recommendations."),
                t("Won 'Best Financial Hack' at HackPrinceton Spring 2025.")
              ]}
              links={{
                github: "https://github.com/Roots-Finance",
                live: "https://devpost.com/software/roots-xk19te"
              }}
            />
          </T>

          {/* Georgia Tech RAG Chatbot */}
          <T id="app.projects.page.chatbot">
            <ProjectCard 
              title="Georgia Tech RAG Chatbot"
              description={t("Campus-wide chatbot enabling students to ask questions about Georgia Tech resources, courses, policies, and campus information.")}
              date={t("January 2025 - Present")}
              technologies={["Python", "LLM", "Vector Search", "NVIDIA", "Backend Development"]}
              highlights={[
                t("Contributing to an innovative campus-wide chatbot for Georgia Tech students to access information about campus resources and policies."),
                t("Designed and implemented an efficient query processing system that ensures GT-focused responses while filtering out irrelevant queries."),
                t("Collaborated with NVIDIA engineers through regular consultations to optimize vector search techniques and embedding models."),
                t("Received technical guidance on performance optimization and system architecture from industry professionals.")
              ]}
              links={{
                github: "https://github.com/aigatech"
              }}
            />
          </T>

          {/* Linguality */}
          <T id="app.projects.page.linguality">
            <ProjectCard 
              title="Linguality"
              description={t("Language learning web application that helps users read books in 20+ languages while building vocabulary through interactive tools.")}
              date={t("November 2023 - Present")}
              technologies={["React", "TypeScript", "Firebase", "Flask", "Google Cloud Translate API", "SpaCy NLP"]}
              highlights={[
                t("Built a language learning web application using React, TypeScript, and Firebase that supports reading in over 20 languages."),
                t("Engineered a Flask backend with NLP integration for context-aware translations of 90,000+ vocabulary items."),
                t("Implemented spaced repetition algorithms to enhance language acquisition efficiency."),
                t("Integrated Google Cloud Translate API and SpaCy NLP for accurate translations and natural language processing.")
              ]}
              links={{
                github: "https://github.com/andrewherndon/linguality",
                live: "https://linguality.app"
              }}
            />
          </T>
        </div>
      </div>
    </div>
  );
}