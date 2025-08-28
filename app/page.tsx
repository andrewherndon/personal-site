export default function Home() {
  return (
    <div className="h-screen bg-[#4A0000] text-[#FAF7F0] overflow-hidden">
      <div className="persian-ribbon w-full h-full">
        
        {/* Header Navigation */}
        <nav className="max-w-6xl mx-auto px-6 pt-8 pb-4 flex justify-between items-center relative z-10">
          <div className="flex gap-8 text-[#FAF7F0] font-semibold">
            <a href="/" className="hover:text-[#D4AF37] transition-colors drop-shadow">Home</a>
            <a href="/photography" className="hover:text-[#D4AF37] transition-colors drop-shadow">Photography</a>
            <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors drop-shadow">Contact</a>
          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start pt-24 h-[calc(100vh-200px)] relative z-10">
          
          {/* Left Column - Intro */}
          <div className="space-y-8">
            <div className="flex items-center gap-8">
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
                <h1 className="text-6xl mb-4 font-medium text-[#FAF7F0] drop-shadow-xl">
                  Andrew Herndon
                </h1>
              </div>
            </div>
            
            <p className="text-xl text-[#FAF7F0] leading-relaxed font-medium drop-shadow">
              Building the future of internationalization at General Translation. 
              Specializing in RAG systems, full-stack development, and machine learning.
            </p>
            
            <div className="flex gap-8 text-xl text-[#FAF7F0] font-semibold">
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
          <div className="space-y-6">
            
            {/* Experience */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-[#D4AF37]/40 relative z-10">
              <h2 className="text-[#D4AF37] font-bold mb-4 text-lg drop-shadow">Experience</h2>
              <div className="space-y-3 text-[#FAF7F0] text-base font-medium">
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">General Translation</span> • Software Engineering Intern
                  <br />100+ commits to open-source React/Next.js libraries • GitHub HQ demo
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
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-[#D4AF37]/40 relative z-10">
              <h2 className="text-[#D4AF37] font-bold mb-4 text-lg drop-shadow">Current Projects</h2>
              <div className="space-y-3 text-[#FAF7F0] text-base font-medium">
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Roots Financial Platform</span>
                  <br />HackPrinceton Best Financial Hack • Credit card optimization algorithm
                </div>
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">AI@GT RAG Chatbot</span>
                  <br />Campus-wide assistant • Collaboration with NVIDIA engineers
                </div>
                <div>
                  <span className="text-[#FAF7F0] font-bold drop-shadow">Linguality</span>
                  <br />100+ language translation platform • Real-time processing
                </div>
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-[#D4AF37]/40 relative z-10">
              <h2 className="text-[#D4AF37] font-bold mb-4 text-lg drop-shadow">Education</h2>
              <div className="space-y-2 text-[#FAF7F0] text-base font-medium">
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


      </div>
    </div>
  );
}
