// app/experience/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export default function ExperiencePage() {
  return (
    <div className="space-y-10">
      <h1 className="heading-accent text-5xl font-bold text-center mb-12">
        Work Experience
      </h1>   
      <div className="p-10 rounded-2xl shadow-xl">
        {/* Cisco Systems Experience */}
        <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] mb-10 border-0 transform transition-all duration-300 hover:translate-y-[-3px]">
          <CardHeader className="bg-background pb-4">
            <CardTitle className="heading-accent text-2xl">Cisco Systems, Inc.</CardTitle>
            <div className="text-white font-medium mt-1">Software Engineering Intern</div>
            <div className="text-white text-sm opacity-90 mt-1">San Jose, CA | 1 June 2024 - 1 August 2024</div>
          </CardHeader>
          <CardContent className="bg-[var(--card-bg)] text-white pt-6">
            <ul className="list-disc pl-5 mb-6 space-y-3">
              <li className="leading-relaxed">Developed a Retrieval-Augmented Generation (RAG) agent using Ollama and LangChain to accelerate web page creation for internal teams.</li>
              <li className="leading-relaxed">Ensured that generated pages adhered to Cisco-specific styling and supported multiple front-end frameworks, maintaining consistency across projects.</li>
              <li className="leading-relaxed">Contributed to the agent's data set by creating reusable page templates and component structures in HTML, CSS, JavaScript, React, and Angular.</li>
              <li className="leading-relaxed">Significantly reduced the time required for internal teams to build UI pages, potentially cutting development time from hours to seconds.</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {["React", "Angular", "Vue", "Ollama", "LangChain", "HTML", "CSS", "JavaScript"].map((tech, index) => (
                <Badge key={index} className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Effacita Experience */}
        <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] mb-10 border-0 transform transition-all duration-300 hover:translate-y-[-3px]">
          <CardHeader className="bg-background pb-4">
            <CardTitle className="heading-accent text-2xl">Effacita</CardTitle>
            <div className="text-white font-medium mt-1">Founder & Digital Marketing Consultant</div>
            <div className="text-white text-sm opacity-90 mt-1">Atlanta Metro Area, GA | 1 June 2022 - 1 March 2023</div>
          </CardHeader>
          <CardContent className="bg-[var(--card-bg)] text-white pt-6">
            <ul className="list-disc pl-5 mb-6 space-y-3">
              <li className="leading-relaxed">Founded a digital marketing consultancy serving local businesses in the salon and beauty industry, creating targeted email campaigns to an audience of thousands.</li>
              <li className="leading-relaxed">Developed streamlined user registration systems for salon subscriptions and appointment scheduling, increasing user engagement and improving conversion rates.</li>
              <li className="leading-relaxed">Enhanced online presence for clients through review management systems, resulting in a 400% increase in Google reviews.</li>
              <li className="leading-relaxed">Achieved over 15% growth in customer interactions across multiple metrics.</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Digital Marketing", "Email Campaigns", "User Registration Systems", "Review Management"].map((tech, index) => (
                <Badge key={index} className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}