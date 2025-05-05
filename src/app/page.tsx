// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, FileText, Code, ExternalLink } from 'lucide-react'
import profilePic from '../../public/images/profile.jpg' // Adjust the path as needed

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Photo + Name */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
      <div className="profile-image-container">
  <Image 
    src={profilePic}
    alt="Andrew Herndon" 
    width={350} 
    height={350} 
    className="rounded-full border-4 border-gold shadow-xl object-cover"
    priority
    placeholder="blur"
  />
</div>
        <div className="text-center md:text-left">
          <h1 className="heading-accent text-5xl md:text-7xl font-bold mb-4">
            Andrew Herndon
          </h1>
          <h2 className="text-white text-xl md:text-2xl mb-6">
            Software & ML Engineer
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="https://github.com/andrewherndon" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/andrew-herndon-607304292" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </Link>
            <Link href="mailto:aherndon33@gatech.edu">
              <Button className="bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Me Card */}
      <section className="rounded-card">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-lg">
            I'm a Computer Science student at Georgia Institute of Technology with a focus on Intelligence and Devices. 
            My experience includes software engineering at Cisco Systems and founding a digital marketing consultancy.
          </p>
          <p className="text-lg">
            I'm passionate about developing intelligent systems that solve real-world problems, 
            with particular interests in machine learning, natural language processing, and software development.
          </p>
          <div className="flex justify-end">
            <Link href="/contact">
              <Button className="bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Experience Card */}
        <div className="card hover:translate-y-[-5px] transition-transform duration-300">
          <div className="card-body p-6 flex flex-col h-full">
            <FileText className="h-12 w-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold text-gold mb-3">Experience</h3>
            <p className="mb-6 flex-grow">
              View my professional experience, including roles at Cisco Systems and my entrepreneurial ventures.
            </p>
            <Link href="/experience" className="mt-auto">
              <Button className="w-full bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                View Experience
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Projects Card */}
        <div className="card hover:translate-y-[-5px] transition-transform duration-300">
          <div className="card-body p-6 flex flex-col h-full">
            <Code className="h-12 w-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold text-gold mb-3">Projects</h3>
            <p className="mb-6 flex-grow">
              Explore my portfolio of projects, including the award-winning Roots Financial Platform and Georgia Tech RAG Chatbot.
            </p>
            <Link href="/projects" className="mt-auto">
              <Button className="w-full bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Contact Card */}
        <div className="card hover:translate-y-[-5px] transition-transform duration-300">
          <div className="card-body p-6 flex flex-col h-full">
            <Mail className="h-12 w-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold text-gold mb-3">Contact</h3>
            <p className="mb-6 flex-grow">
              Get in touch with me to discuss opportunities, projects, or just to say hello.
            </p>
            <Link href="/contact" className="mt-auto">
              <Button className="w-full bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Project */}
      <section className="rounded-card">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-2">Featured Project</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gold mb-3">Roots Financial Platform</h3>
              <p className="mb-4">
                Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.
                Led frontend development and implemented responsive UI components with Next.js, React, and TailwindCSS.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge">Next.js</span>
                <span className="badge">React</span>
                <span className="badge">TailwindCSS</span>
                <span className="badge">Capital One API</span>
              </div>
              <div className="flex gap-3">
                <Link href="https://github.com/yourusername/roots-financial" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold text-background hover:bg-gold hover:text-background rounded-xl btn-shadow">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://roots-financial.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-background rounded-xl btn-shadow">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex items-center justify-center">
              {/* Project image placeholder */}
              <div className="w-full h-48 bg-background/50 rounded-xl flex items-center justify-center border-2 border-gold shadow-xl">
                <span className="text-gold">Project Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}