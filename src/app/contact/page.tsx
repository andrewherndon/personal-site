// app/contact/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0">
						<CardHeader className="bg-background pb-4">
							<CardTitle className="heading-accent text-2xl">
								Get In Touch
							</CardTitle>
							<CardDescription className="text-white mt-2">
								Fill out the form and I'll get back to you as soon as possible.
							</CardDescription>
						</CardHeader>
						<CardContent className="bg-[var(--card-bg)] text-white pt-8">
							<form className="space-y-5">
								<div>
									<label
										className="block text-white text-sm font-medium mb-2"
										htmlFor="name"
									>
										Name
									</label>
									<Input
										id="name"
										placeholder="Your name"
										className="rounded-lg border-gold/20 focus:border-gold focus:ring focus:ring-gold/20"
									/>
								</div>
								<div>
									<label
										className="block text-white text-sm font-medium mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<Input
										id="email"
										type="email"
										placeholder="your.email@example.com"
										className="rounded-lg border-gold/20 focus:border-gold focus:ring focus:ring-gold/20"
									/>
								</div>
								<div>
									<label
										className="block text-white text-sm font-medium mb-2"
										htmlFor="message"
									>
										Message
									</label>
									<Textarea
										id="message"
										placeholder="Your message..."
										className="min-h-[150px] rounded-lg border-gold/20 focus:border-gold focus:ring focus:ring-gold/20"
									/>
								</div>
								<Button
									type="submit"
									className="w-full bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow py-6 font-medium text-lg"
								>
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>

					<Card className="rounded-xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-0">
						<CardHeader className="bg-background pb-4">
							<CardTitle className="heading-accent text-2xl">
								Connect With Me
							</CardTitle>
							<CardDescription className="text-white mt-2">
								Find me on these platforms
							</CardDescription>
						</CardHeader>
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
									href="https://www.linkedin.com/in/andrewherndon"
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
