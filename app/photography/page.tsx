export default function Photography() {
  return (
    <div className="min-h-screen bg-[#4A0000] text-[#FAF7F0]">
      <div className="persian-ribbon w-full">
        
        {/* Header Navigation */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#D4AF37]">AH</div>
          <div className="flex gap-8 text-[#FAF7F0]">
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="/photography" className="text-[#D4AF37]">Photography</a>
            <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#D4AF37] mb-6 orthodox-ornament">
              Photography & Creative Work
            </h1>
            <p className="text-xl text-[#FAF7F0]/80 max-w-3xl mx-auto leading-relaxed">
              Beyond code, I capture moments through the lens - from the architectural beauty of Orthodox churches 
              to the vibrant patterns that inspire my design philosophy.
            </p>
          </div>
          
          {/* Photography Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-[#8B0000]/20 to-[#D4AF37]/20 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-6xl">⛪</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#FAF7F0] mb-4">Architecture & Heritage</h3>
              <p className="text-[#FAF7F0]/70 mb-4">
                Orthodox churches, Byzantine details, and historical structures that embody the intersection 
                of faith and architectural mastery.
              </p>
              <div className="text-sm text-[#D4AF37]">25 photographs</div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-[#1E3A8A]/20 to-[#065F46]/20 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-6xl">🏙️</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#FAF7F0] mb-4">Urban Landscapes</h3>
              <p className="text-[#FAF7F0]/70 mb-4">
                City scenes, tech campuses, and modern architecture that showcase the evolution 
                of design and human spaces.
              </p>
              <div className="text-sm text-[#D4AF37]">18 photographs</div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-[#6B21A8]/20 to-[#BE185D]/20 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#FAF7F0] mb-4">Pattern Studies</h3>
              <p className="text-[#FAF7F0]/70 mb-4">
                Persian rugs, textile patterns, and geometric designs that inspire 
                my digital design philosophy and aesthetic choices.
              </p>
              <div className="text-sm text-[#D4AF37]">12 photographs</div>
            </div>
            
          </div>
          
          {/* Video & Creative Work */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#D4AF37] mb-8 text-center">Video & Creative Work</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-[#8B0000]/20 to-[#D4AF37]/20 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-2">🎬</span>
                    <p className="text-sm text-[#FAF7F0]/60">Technical Demo Reel</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#FAF7F0] mb-3">Project Demonstrations</h3>
                <p className="text-[#FAF7F0]/70 mb-4">
                  Live demos of RAG systems, financial platforms, and AI applications presented at 
                  conferences and hackathons including my GitHub headquarters presentation.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#D4AF37] font-medium">Duration: 15-20 minutes</span>
                  <span className="text-sm text-[#FAF7F0]/60">3 videos</span>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-[#1E3A8A]/20 to-[#065F46]/20 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-2">📹</span>
                    <p className="text-sm text-[#FAF7F0]/60">Documentary Style</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#FAF7F0] mb-3">Behind the Scenes</h3>
                <p className="text-[#FAF7F0]/70 mb-4">
                  The journey from startup founder to building systems at scale - documenting 
                  the intersection of technology, culture, and personal growth.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#D4AF37] font-medium">Duration: 8-12 minutes</span>
                  <span className="text-sm text-[#FAF7F0]/60">2 videos</span>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Contact for Portfolio */}
          <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-[#D4AF37]/20">
            <h3 className="text-2xl font-semibold text-[#FAF7F0] mb-4">Full Portfolio Available</h3>
            <p className="text-[#FAF7F0]/70 mb-6">
              Interested in seeing the complete collection? Reach out for access to the full portfolio.
            </p>
            <a href="mailto:aherndon33@gatech.edu?subject=Photography Portfolio Request" 
               className="inline-block bg-[#D4AF37] text-[#4A0000] px-8 py-3 rounded-lg font-medium hover:bg-[#FAF7F0] transition-colors">
              Request Full Portfolio
            </a>
          </div>
          
        </main>
        
      </div>
    </div>
  );
}