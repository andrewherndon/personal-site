// components/experience/experience-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ExperienceProps = {
  company: string;
  role: string;
  location: string;
  startDate: React.ReactNode;
  endDate: React.ReactNode;
  description: string[];
  technologies: string[];
}

export function ExperienceCard({
  company,
  role,
  location,
  startDate,
  endDate,
  description,
  technologies
}: ExperienceProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] mb-10 border-0 transform transition-all duration-300 hover:translate-y-[-3px]">
      <CardHeader className="bg-background pb-4">
        <CardTitle className="heading-accent text-2xl">{company}</CardTitle>
        <div className="text-white font-medium mt-1">{role}</div>
        <div className="text-white text-sm opacity-90 mt-1">{location} | {startDate} - {endDate}</div>
      </CardHeader>
      <CardContent className="bg-[var(--card-bg)] text-white pt-6">
        <ul className="list-disc pl-5 mb-6 space-y-3">
          {description.map((item, index) => (
            <li key={index} className="leading-relaxed">{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-5">
          {technologies.map((tech, index) => (
            <Badge key={index} className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}