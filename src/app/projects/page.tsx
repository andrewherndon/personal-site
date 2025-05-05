// app/projects/page.tsx
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { Var, T } from "gt-next";

export default function ProjectsPage() {
	return (
		<T id="app.projects.page.0">
			<div className="space-y-10">
				<h1 className="heading-accent text-5xl font-bold text-center mb-12">
					Projects
				</h1>

				<div className="bg-background/98 p-10 rounded-2xl shadow-xl">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							{projects.map((project) => (
								<ProjectCard key={project.id} {...project} />
							))}
					</div>
				</div>
			</div>
		</T>
	);
}
