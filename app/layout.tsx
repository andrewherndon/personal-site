import type { Metadata } from "next";
import { Playfair_Display, Crimson_Text } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrew Herndon",
  description: "Computer Science student at Georgia Tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${crimson.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#4A0000] text-[#FAF7F0]">
          <div className="w-full min-h-screen relative flex flex-col">

            {/* Header Navigation */}
            {/* <nav className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex justify-between items-center relative z-10">
              <div className="flex gap-8 text-[#FAF7F0] font-bold">
                <a href="/" className="hover:text-[#D4AF37] transition-colors drop-shadow">Home</a>
                <a href="/photography" className="hover:text-[#D4AF37] transition-colors drop-shadow">Photography</a>
                <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors drop-shadow">Contact</a>
              </div>
            </nav> */}

            {children}

            {/* Top Rug */}
            <div className="absolute top-0 left-0 right-0 h-20 z-0">
              <div
                className="w-full h-full opacity-80"
                style={{
                  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.55)), url('/rug2Formatted.png')",
                  backgroundSize: "auto 80px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat-x",
                  transform: "scaleY(-1)"
                }}
              ></div>
            </div>

            {/* Bottom Rug */}
            <div className="w-full h-20 z-0 mt-auto">
              <div
                className="w-full h-full opacity-80"
                style={{
                  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.55)), url('/rug2Formatted.png')",
                  backgroundSize: "auto 80px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat-x",
                }}
              ></div>
            </div>

          </div>
        </div>
      </body>
    </html>
  );
}
