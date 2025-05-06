// app/layout.tsx
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
// Load Roboto font

import { getLocale } from "gt-next/server";
import { GTProvider } from "gt-next";
const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-roboto",
});

export const metadata = {
	title: "Andrew Herndon - Portfolio",
	description: "Personal website showcasing experience, projects, and skills",
};

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang={await getLocale()}>
			<body className={`${roboto.variable} font-sans`}>
				<GTProvider>
        
					<div className="min-h-screen flex flex-col bg-background">
						<Navbar />
						<main className="flex-grow container mx-auto px-4 py-10">
							{children}
						</main>
						<Footer />
					</div>
				</GTProvider>
			</body>
		</html>
	);
}
