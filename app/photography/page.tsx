import Link from 'next/link';
import Image from 'next/image';

export default function Photography() {
  return (
        <main className="max-w-6xl mx-auto px-6 pt-24 pb-12 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:text-[#FAF7F0] transition-colors mb-4">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-6">
              Photography
            </h1>
            <p className="text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto leading-relaxed">
              Random stuff I've shot
            </p>
          </div>
          
          {/* Photo Collections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* New York Card */}
            <Link href="/photography/new-york" className="block no-underline">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-[#D4AF37]/20">
                <div className="aspect-video relative">
                  <Image src="/new-york/camera.jpeg" alt="New York City" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-1">New York City</h3>
                  <p className="text-[#FAF7F0]/70 text-sm mb-2">
                    Memories from NYC with my friends from GT. Shot with FUJIFILM 35mm film
                  </p>
                  <div className="text-xs text-[#FAF7F0]/60">6 photographs</div>
                </div>
              </div>
            </Link>
            
          </div>
          
        </main>
  );
}