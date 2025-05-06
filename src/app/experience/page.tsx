// app/experience/page.tsx
import { ExperienceCard } from "@/components/experience/experience-card";
import { experiences } from "@/data/experience";
import { T, Var } from "gt-next";

export default function ExperiencePage() {
	return (
		<T id="app.experience.page.0">
			<div className="space-y-10">
				<h1 className="heading-accent text-5xl font-bold text-center mb-12">
					Work Experience
				</h1>   
				<div className=" p-10 rounded-2xl shadow-xl">
                    <Var>
                        {experiences.map((exp) => (
                            <ExperienceCard key={exp.id} {...exp} />
                        ))}
                    </Var>
				</div>
			</div>
		</T>
	);
}
