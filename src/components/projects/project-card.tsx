// components/projects/project-card.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

type ProjectProps = {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
  }
}

export function ProjectCard({
  title,
  description,
  date,
  technologies,
  highlights,
  links
}: ProjectProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0 h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-5px]">
      <CardHeader className="bg-background pb-4">
        <CardTitle className="heading-accent text-2xl">{title}</CardTitle>
        <div className="text-white text-sm opacity-90 mt-1">{date}</div>
      </CardHeader>
      <CardContent className="bg-[var(--card-bg)] text-white pt-6 flex-grow">
        <p className="mb-5">{description}</p>
        <div className="mb-5">
          <h4 className="font-semibold mb-3 text-gold">Highlights:</h4>
          <ul className="list-disc pl-5 space-y-2 text-white/90">
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {technologies.map((tech, index) => (
            <Badge key={index} className="bg-gold text-background hover:bg-gold/90 rounded-full px-3 py-1 font-medium">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-[var(--card-bg)] border-t border-background/20 p-4">
        <div className="flex gap-3 justify-end w-full">
          {links.github && (
            <Link href={links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-lg">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          )}
          {links.live && (
            <Link href={links.live} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Site
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}