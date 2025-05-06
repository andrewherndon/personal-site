// app/contact/page.tsx
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { T } from "gt-next";

export default function ContactPage() {
	return (
		<T id="app.contact.page.0">
			<div className="space-y-10">
				<h1 className="heading-accent text-5xl font-bold text-center mb-12">
					Contact Me
				</h1>

				<div className="flex justify-center">

					<Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0 w-3/4 max-w-4xl">
						<CardContent className="bg-[var(--card-bg)] text-white pt-8">
							<div className="space-y-5">
								<Link
									href="mailto:aherndon33@gatech.edu"
									className="flex items-center p-4 hover:bg-background/50 rounded-xl transition-colors border border-transparent hover:border-gold/20"
								>
									<Mail className="h-7 w-7 mr-4 text-gold" />
									<div>
										<div className="font-medium text-lg text-gold">Email</div>
										<div className="text-sm text-white/80 mt-1">
											aherndon33@gatech.edu
										</div>
									</div>
								</Link>
								<Link
									href="https://github.com/andrewherndon"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center p-4 hover:bg-background/50 rounded-xl transition-colors border border-transparent hover:border-gold/20"
								>
									<Github className="h-7 w-7 mr-4 text-gold" />
									<div>
										<div className="font-medium text-lg text-gold">GitHub</div>
										<div className="text-sm text-white/80 mt-1">
											github.com/andrewherndon
										</div>
									</div>
								</Link>
								<Link
									href="https://www.linkedin.com/in/andrew-herndon-607304292"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center p-4 hover:bg-background/50 rounded-xl transition-colors border border-transparent hover:border-gold/20"
								>
									<Linkedin className="h-7 w-7 mr-4 text-gold" />
									<div>
										<div className="font-medium text-lg text-gold">
											LinkedIn
										</div>
										<div className="text-sm text-white/80 mt-1">
											www.linkedin.com/in/andrew-herndon-607304292
										</div>
									</div>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</T>
	);
}
