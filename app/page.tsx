export default function Home() {
  return (
    <div className="min-h-screen lg:h-screen bg-[#4A0000] text-[#FAF7F0] lg:overflow-hidden">
      <div className="w-full min-h-screen lg:h-screen relative flex flex-col lg:block">
        
        {/* Header Navigation */}
        <nav className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex justify-between items-center relative z-10">
          <div className="flex gap-8 text-[#FAF7F0] font-normal">
            <a href="/" className="hover:text-[#D4AF37] transition-colors drop-shadow">Home</a>
            <a href="/photography" className="hover:text-[#D4AF37] transition-colors drop-shadow">Photography</a>
            <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors drop-shadow">Contact</a>
          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start pt-16 lg:h-[calc(100vh-200px)] relative z-10">
          
          {/* Left Column - Intro */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-70 h-48 shadow-2xl bg-[#5a70af] p-1">
                  <div className="w-full h-full bg-[#D4AF37] p-1">
                    <div className="w-full h-full bg-[#5a70af] p-1">
                      <div className="w-full h-full bg-[#FAF7F0] flex items-center justify-center">
                        
                        <div className="w-full h-full flex items-center justify-center text-[#8B0000] text-5xl font-bold">
                        <img src="/profile.jpg" className="w-full h-full object-contains" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Name and Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 font-medium text-[#FAF7F0] drop-shadow-xl text-center sm:text-left">
                  Andrew Herndon
                </h1>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl text-[#FAF7F0] leading-relaxed font-medium drop-shadow">
              Building the future of internationalization at General Translation. 
              Specializing in RAG systems, full-stack development, and machine learning.
            </p>
            
            <div className="flex flex-wrap gap-4 sm:gap-8 text-lg sm:text-xl text-[#FAF7F0] font-semibold justify-center sm:justify-start">
              <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors drop-shadow">
                Contact
              </a>
              <a href="https://github.com/andrewherndon" className="hover:text-[#D4AF37] transition-colors drop-shadow">
                GitHub
              </a>
              <a href="/photography" className="hover:text-[#D4AF37] transition-colors drop-shadow">
                Photography
              </a>
            </div>
          </div>
          
          {/* Right Column - Key Points */}
          <div className="space-y-4">
            
            {/* Experience */}
            <div>
              <h2 className="text-[#D4AF37] font-bold mb-2 text-lg drop-shadow">Experience</h2>
              <div className="space-y-2 text-[#FAF7F0] text-base font-medium">
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">General Translation</span> • Software Engineering Intern
                  <br />100+ commits to open-source React/Next.js libraries • <a href="https://youtu.be/dVrSM2xUlDE?si=qc6hasSue8xb3bxr">GitHub HQ demo</a>
                </div>
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Cisco Systems</span> • Software Engineering Intern
                  <br />Led 3-engineer team • Built RAG agent system • 90% dev time reduction
                </div>
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Effacita</span> • Founder
                  <br />Digital marketing consultancy • 400% review growth for clients
                </div>
              </div>
            </div>
            
            {/* Current Projects */}
            <div>
              <h2 className="text-[#D4AF37] font-bold mb-2 text-lg drop-shadow">Current Projects</h2>
              <div className="space-y-2 text-[#FAF7F0] text-base font-medium">
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">
                    <a href="https://devpost.com/software/roots-xk19te">Roots Financial Platform</a>
                    </span>
                  <br />HackPrinceton Best Financial Hack • Credit card optimization algorithm
                </div>
                <div>
                  <a href="https://www.aigatech.org/projects">
                  <span className="text-[#FAF7F0] font-bold drop-shadow">AI@GT RAG Chatbot</span>
                  </a>
                  <br />Campus-wide assistant • Collaboration with NVIDIA engineers
                </div>
                <div>
                  <a href="https://linguality.app">
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Linguality</span>
                  </a>
                  <br />100+ language translation platform • Real-time processing
                </div>
              </div>
            </div>
            
            {/* Education */}
            <div>
              <h2 className="text-[#D4AF37] font-bold mb-2 text-lg drop-shadow">Education</h2>
              <div className="space-y-3 text-[#FAF7F0] text-base font-medium">
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Georgia Institute of Technology</span>
                  <br />B.S. Computer Science • Intelligence & Devices • Class of 2027
                </div>
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Nanyang Technological University</span>
                  <br />Exchange Program • AI & Computer Science • Spring 2025
                </div>
              </div>
            </div>
            
          </div>
        </main>

        {/* Top Rug */}
        <div className="absolute top-0 left-0 right-0 h-20 z-0">
          <div 
            className="w-full h-full opacity-80"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/rug2Formatted.png')",
              backgroundSize: "auto 80px",
              backgroundPosition: "center",
              backgroundRepeat: "repeat-x"
            }}
          ></div>
        </div>

        {/* Bottom Rug */}
        <div className="lg:absolute lg:bottom-0 left-0 right-0 h-20 z-0 mt-auto">
          <div 
            className="w-full h-full opacity-80"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('/rug2Formatted.png')",
              backgroundSize: "auto 80px",
              backgroundPosition: "center",
              backgroundRepeat: "repeat-x",
              transform: "scaleY(-1)"
            }}
          ></div>
        </div>

      </div>
    </div>
  );
}
