export default function NewYorkGallery() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
      
      {/* Header */}
      <div className="text-center mb-12">
        <a href="/photography" className="inline-flex items-center text-[#D4AF37] hover:text-[#FAF7F0] transition-colors mb-4">
          ← Back to Photography
        </a>
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">New York City</h1>
        <p className="text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto">
          Urban landscapes, architecture, and street scenes from the city that never sleeps.
          Shot on Canon EOS R5 with 24-70mm f/2.8L lens • November 2024
        </p>
      </div>
      
      {/* Photo Gallery */}
      <div className="space-y-8">
        <img src="/new-york/liberty.jpg" alt="Statue of Liberty" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
        <img src="/new-york/sky.jpg" alt="NYC Skyline" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
        <img src="/new-york/park.jpg" alt="NYC Park" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
        <img src="/new-york/boat.jpg" alt="NYC Boat" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
        <img src="/new-york/pho.jpg" alt="Pho" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
        <img src="/new-york/camera.jpeg" alt="Camera" className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl" />
      </div>
      
    </main>
  );
}