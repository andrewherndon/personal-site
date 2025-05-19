// app/projects/page.tsx
"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";


export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <h1 className="heading-accent text-5xl font-bold text-center mb-12">
        Projects
      </h1>

      <div className="bg-background/98 p-10 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Roots Financial Platform */}
          <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0 h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-5px]">
            <CardHeader className="bg-background pb-4">
              <CardTitle className="heading-accent text-2xl">Roots Financial Platform</CardTitle>
              <div className="text-white text-sm opacity-90 mt-1">27 March 2025</div>
            </CardHeader>
            <CardContent className="bg-[var(--card-bg)] text-white pt-6 flex-grow">
              <p className="mb-5">Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.</p>
              <div className="mb-5">
                <h4 className="font-semibold mb-3 text-gold">Highlights:</h4>
                <ul className="list-disc pl-5 space-y-2 text-white/90">
                  <li>Led frontend development for an award-winning financial platform, implementing responsive UI components with Next.js, React, and TailwindCSS.</li>
                  <li>Collaborated in a cross-university team to create an intuitive interface leveraging Capital One's Nessie API for transaction simulation.</li>
                  <li>Designed user experience focused on making complex financial concepts accessible through interactive visualizations and personalized recommendations.</li>
                  <li>Won 'Best Financial Hack' at HackPrinceton Spring 2025.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Next.js", "React", "TailwindCSS", "Capital One Nessie API", "Gemini LLM", "Auth0"].map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-[var(--card-bg)] border-t border-background/20 p-4">
              <div className="flex gap-3 justify-end w-full">
                <Link
                  href="https://github.com/Roots-Finance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="rounded-lg">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link
                  href="https://devpost.com/software/roots-xk19te"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="rounded-lg">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Site
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Georgia Tech RAG Chatbot */}
          <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0 h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-5px]">
            <CardHeader className="bg-background pb-4">
              <CardTitle className="heading-accent text-2xl">Georgia Tech RAG Chatbot</CardTitle>
              <div className="text-white text-sm opacity-90 mt-1">January 2025 - Present</div>
            </CardHeader>
            <CardContent className="bg-[var(--card-bg)] text-white pt-6 flex-grow">
              <p className="mb-5">Campus-wide chatbot enabling students to ask questions about Georgia Tech resources, courses, policies, and campus information.</p>
              <div className="mb-5">
                <h4 className="font-semibold mb-3 text-gold">Highlights:</h4>
                <ul className="list-disc pl-5 space-y-2 text-white/90">
                  <li>Contributing to an innovative campus-wide chatbot for Georgia Tech students to access information about campus resources and policies.</li>
                  <li>Designed and implemented an efficient query processing system that ensures GT-focused responses while filtering out irrelevant queries.</li>
                  <li>Collaborated with NVIDIA engineers through regular consultations to optimize vector search techniques and embedding models.</li>
                  <li>Received technical guidance on performance optimization and system architecture from industry professionals.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {["Python", "LLM", "Vector Search", "NVIDIA", "Backend Development"].map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-[var(--card-bg)] border-t border-background/20 p-4">
              <div className="flex gap-3 justify-end w-full">
                <Link
                  href="https://github.com/aigatech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="rounded-lg">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Linguality */}
          <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0 h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-5px]">
            <CardHeader className="bg-background pb-4">
              <CardTitle className="heading-accent text-2xl">Linguality</CardTitle>
              <div className="text-white text-sm opacity-90 mt-1">November 2023 - Present</div>
            </CardHeader>
            <CardContent className="bg-[var(--card-bg)] text-white pt-6 flex-grow">
              <p className="mb-5">Language learning web application that helps users read books in 20+ languages while building vocabulary through interactive tools.</p>
              <div className="mb-5">
                <h4 className="font-semibold mb-3 text-gold">Highlights:</h4>
                <ul className="list-disc pl-5 space-y-2 text-white/90">
                  <li>Built a language learning web application using React, TypeScript, and Firebase that supports reading in over 20 languages.</li>
                  <li>Engineered a Flask backend with NLP integration for context-aware translations of 90,000+ vocabulary items.</li>
                  <li>Implemented spaced repetition algorithms to enhance language acquisition efficiency.</li>
                  <li>Integrated Google Cloud Translate API and SpaCy NLP for accurate translations and natural language processing.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {["React", "TypeScript", "Firebase", "Flask", "Google Cloud Translate API", "SpaCy NLP"].map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-[var(--card-bg)] border-t border-background/20 p-4">
              <div className="flex gap-3 justify-end w-full">
                <Link
                  href="https://github.com/andrewherndon/linguality"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="rounded-lg">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link
                  href="https://linguality.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="rounded-lg">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Site
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}