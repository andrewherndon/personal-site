// components/navigation/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	return (
			<nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-10 py-4 px-6 shadow-md">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex-grow-0">
					</div>

					<div className="hidden md:flex space-x-2">
						<NavLink href="/">Home</NavLink>
						<NavLink href="/experience">Experience</NavLink>
						<NavLink href="/projects">Projects</NavLink>
						<NavLink href="/contact">Contact</NavLink>
					</div>

					{/* Mobile menu - simplified for this example */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							className="text-gold hover:text-white rounded-lg"
						>
							Menu
						</Button>
					</div>
				</div>
			</nav>
	);
};

const NavLink = ({
	href,
	children,
}: { href: string; children: React.ReactNode }) => {
	return (
		<Link href={href}>
			<Button
				variant="ghost"
				className="text-white hover:text-gold hover:bg-background/50 rounded-xl px-5 py-2 font-medium transition-all duration-300"
			>
				{children}
			</Button>
		</Link>
	);
};

export default Navbar;
