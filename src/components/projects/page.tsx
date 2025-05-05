// app/projects/page.tsx
import { ProjectCard } from "@/components/projects/project-card"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="heading-accent text-4xl font-bold text-center mb-10">
        Projects
      </h1>

      <div className="p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  )
}