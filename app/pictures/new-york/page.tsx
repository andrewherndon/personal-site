import Link from 'next/link';
import Image from 'next/image';

export default function NewYorkGallery() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">

      {/* Header */}
      <div className="text-center mb-12">
        <Link href="/pictures" className="inline-flex items-center text-[#D4AF37] hover:text-[#FAF7F0] transition-colors mb-4">
          ← Back to Pictures
        </Link>
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">New York City</h1>
        <p className="text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto">
          Memories from NYC with my friends from GT. Shot with FUJIFILM 35mm film
        </p>
      </div>

      {/* Photo Gallery */}
      <div className="space-y-8">
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/liberty.jpg" alt="Statue of Liberty" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/sky.jpg" alt="NYC Skyline" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/park.jpg" alt="NYC Park" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/boat.jpg" alt="NYC Boat" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/pho.jpg" alt="Pho" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/new-york/camera.jpeg" alt="Camera" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
      </div>

    </main>
  );
}
