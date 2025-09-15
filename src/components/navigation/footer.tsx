// components/navigation/footer.tsx
import Link from "next/link";
import { Var, T } from "gt-next";

const Footer = () => {
	return (
		<footer className="bg-background/90 backdrop-blur-sm py-8 mt-16 border-t border-gold/20">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="text-white mb-6 md:mb-0 font-serif">
							© <Var>{new Date().getFullYear()} Andrew Herndon. </Var>All rights reserved.
						</div>
						<div className="flex flex-wrap justify-center gap-6">
							<FooterLink href="/"><T>Home</T></FooterLink>
							<FooterLink href="/experience"><T>Experience</T></FooterLink>
							<FooterLink href="/projects"><T>Projects</T></FooterLink>
							<FooterLink href="/contact"><T>Contact</T></FooterLink>
						</div>
					</div>
				</div>
		</footer>
	);
};

const FooterLink = ({
	href,
	children,
}: { href: string; children: React.ReactNode }) => {
	return (
		<Link
			href={href}
			className="text-gold hover:text-white transition-colors font-medium"
		>
			{children}
		</Link>
	);
};

export default Footer;
