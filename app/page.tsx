'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

function RandomFact() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const facts = [
      "I was born on a highway",
      "I didn't miss a day of school until 6th grade",
      "Hated swimming (don't tell my mom) but did it for 6 years",
      "Wore a speedo to a high school football and was banned from being class president",
      "Failed my AP US History exam — hardest test I've done",
      "I lucid dream at least once a week and sometimes I can't tell if a memory happened in real life or in a dream",
      "I'm convinced that walking up two stairs at time will make my legs stronger everyday",
      "As of August 2025 my squat is nearly equal to my bench press",
      "I'm very good at holding my breath",
      "My childhood cat had 3 legs",
      "Since being a kid I've always wanted to spend a whole day staring at a clock"
    ];

    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]);
  }, []);

  if (!fact) return null;

  return (
    <div className="absolute bottom-24 right-6 z-20">
      <p className="text-md text-[#FAF7F0]/80 text-right whitespace-nowrap">Random fact about me: {fact}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start pt-24 pb-12 relative z-10">

        {/* Left Column - Intro */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-66 h-46 shadow-2xl bg-[#5a70af] p-1">
                <div className="w-full h-full bg-[#D4AF37] p-1">
                  <div className="w-full h-full bg-[#5a70af] p-1">
                    <div className="w-full h-full bg-[#FAF7F0] flex items-center justify-center">

                      <div className="w-full h-full flex items-center justify-center text-[#8B0000] text-5xl font-bold relative">
                        <Image src="/profile.jpg" alt="Andrew Herndon profile photo" fill className="object-contain" />
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
            Hi I'm Andrew! Here's a brief summary of some of my professional accomplishments. I like to build stuff relating to language and finance.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-lg sm:text-xl text-[#FAF7F0] font-semibold justify-center sm:justify-start">
            <a href="mailto:aherndon33@gatech.edu" className="hover:text-[#D4AF37] transition-colors drop-shadow">
              Contact
            </a>
            <a href="https://github.com/andrewherndon" className="hover:text-[#D4AF37] transition-colors drop-shadow">
              GitHub
            </a>
            <a href="/pictures" className="hover:text-[#D4AF37] transition-colors drop-shadow">
              Pictures
            </a>
            <a href="https://www.linkedin.com/in/anherndon" className="hover:text-[#D4AF37] transition-colors drop-shadow">
              Linkedin
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
                <br />Exchange Program • AI & Computer Science • Fall 2025
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Random Fact */}
      <RandomFact />
    </>
  );
}
