import Link from 'next/link';
import Image from 'next/image';

export default function SingaporeGallery() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">

      {/* Header */}
      <div className="text-center mb-12">
        <Link href="/pictures" className="inline-flex items-center text-[#D4AF37] hover:text-[#FAF7F0] transition-colors mb-4">
          ← Back to Pictures
        </Link>
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Singapore</h1>
        <p className="text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto">
          Okay these picture are from more places than just Singapore, taken on my Canon Eos M and FUJIFILM cameras.
        </p>
      </div>

      {/* Photo Gallery */}
      <div className="space-y-8">
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/lion.jpg" alt="Marina Bay" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/nushen.jpg" alt="Beijing Nu at the Royal Palace" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/whatssofunny.jpg" alt="Joshin around" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/palace.jpg" alt="Royal Palace" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/mateo.jpg" alt="Japan Resturant" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/wohepengyou.jpg" alt="WHAT square" fill className="object-cover rounded-lg shadow-2xl" />
        </div>
        <div className="w-full max-w-5xl mx-auto relative aspect-[4/3]">
          <Image src="/singapore/ak47.jpg" alt="Good food" fill className="object-cover rounded-lg shadow-2xl" />
        </div>

      </div>

    </main>
  );
}
