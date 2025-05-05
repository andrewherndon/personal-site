# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "andrewherndon",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.1",
    "ai-digest": "^1.1.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.507.0",
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.2.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4.1.5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.5",
    "tw-animate-css": "^1.2.9",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/contact/page.tsx

```tsx
// app/contact/page.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <h1 className="heading-accent text-4xl font-bold text-center mb-10">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-xl overflow-hidden shadow-lg border-0">
          <CardHeader className="bg-background pb-4">
            <CardTitle className="heading-accent text-2xl">Get In Touch</CardTitle>
            <CardDescription className="text-white">
              Fill out the form and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white text-black pt-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message..." className="min-h-[120px] rounded-lg" />
              </div>
              <Button type="submit" className="w-full bg-background text-white hover:bg-gold hover:text-background rounded-lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-xl overflow-hidden shadow-lg border-0">
          <CardHeader className="bg-background pb-4">
            <CardTitle className="heading-accent text-2xl">Connect With Me</CardTitle>
            <CardDescription className="text-white">
              Find me on these platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white text-black pt-6">
            <div className="space-y-4">
              <Link href="mailto:aherndon33@gatech.edu" className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                <Mail className="h-6 w-6 mr-3 text-background" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-600">aherndon33@gatech.edu</div>
                </div>
              </Link>
              <Link href="https://github.com/andrewherndon" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                <Github className="h-6 w-6 mr-3 text-background" />
                <div>
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm text-gray-600">github.com/andrewherndon</div>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/in/andrewherndon" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors">
                <Linkedin className="h-6 w-6 mr-3 text-background" />
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <div className="text-sm text-gray-600">linkedin.com/in/andrewherndon</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

# src/app/experience/page.tsx

```tsx
// app/experience/page.tsx
import { ExperienceCard } from "@/components/experience/experience-card"
import { experiences } from "@/data/experience"

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <h1 className="heading-accent text-4xl font-bold text-center mb-10">
        Work Experience
      </h1>

      <div className="bg-white/95 p-8 rounded-2xl">
        {experiences.map((exp) => (
          <ExperienceCard 
            key={exp.id}
            {...exp}
          />
        ))}
      </div>
    </div>
  )
}
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@import "tailwindcss";

:root {
  --background: #B22222; /* Rich red background */
  --foreground: #FFFFFF; /* White text */
  --gold: #FFD700;      /* Gold for accent/important text */
  --text: #FFFFFF;      /* White text */
  --text-alt: #000000;  /* Alternative black text for contrast */
  
  --card: #FFFFFF;
  --card-foreground: #000000;
  
  --border: #e5e7eb;
  --input: #e5e7eb;
  --ring: #171717;
  
  --primary: #171717;
  --primary-foreground: #FFFFFF;
  
  --secondary: #f3f4f6;
  --secondary-foreground: #171717;
  
  --muted: #f3f4f6;
  --muted-foreground: #737373;
  
  --accent: #f3f4f6;
  --accent-foreground: #171717;
  
  --destructive: #ef4444;
  --destructive-foreground: #FFFFFF;
  
  --radius: 0.5rem;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  
  --card: #0a0a0a;
  --card-foreground: #ededed;
  
  --border: #262626;
  --input: #262626;
  --ring: #d4d4d4;
  
  --primary: #ededed;
  --primary-foreground: #0a0a0a;
  
  --secondary: #262626;
  --secondary-foreground: #ededed;
  
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  
  --accent: #262626;
  --accent-foreground: #ededed;
  
  --destructive: #7f1d1d;
  --destructive-foreground: #ededed;
}

* {
  border-color: var(--border);
  outline-color: var(--ring);
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: system-ui, sans-serif;
}

.heading-accent {
  color: var(--gold);
  text-shadow: 2px 2px 0px rgba(255, 215, 0, 0.4); 
}

.rounded-card {
  background-color: var(--card);
  color: var(--card-foreground);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.container-rounded {
  border-radius: 1rem;
  overflow: hidden;
}
```

# src/app/layout.tsx

```tsx
// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navigation/navbar'
import Footer from '@/components/navigation/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Andrew Herndon - Portfolio',
  description: 'Personal website showcasing experience, projects, and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

# src/app/page.tsx

```tsx
// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <h1 className="heading-accent text-4xl md:text-6xl font-bold mb-6">
          Andrew Herndon
        </h1>
        <h2 className="text-white text-xl md:text-2xl mb-12">
          Computer Science Student & Software Engineer
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/projects">
            <Button className="bg-white text-background hover:bg-gold hover:text-background rounded-xl">
              View Projects
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-transparent border-2 border-white text-white hover:border-gold hover:text-gold rounded-xl">
              Contact Me
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="rounded-card">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <p className="mb-4">
              I'm a Computer Science student at Georgia Institute of Technology with a focus on Intelligence and Devices. 
              My experience includes software engineering at Cisco Systems and founding a digital marketing consultancy.
            </p>
            <p>
              I'm passionate about developing intelligent systems that solve real-world problems. 
              My skills include Python, JavaScript, Java, React, and machine learning.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            {/* Placeholder for profile image */}
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Profile Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="rounded-card">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Roots Financial Platform</h3>
            <p className="text-gray-700 mb-4">Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.</p>
            <div className="flex justify-end">
              <Link href="/projects">
                <Button className="bg-background text-white hover:bg-gold hover:text-background rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="border border-gray-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Georgia Tech RAG Chatbot</h3>
            <p className="text-gray-700 mb-4">Campus-wide chatbot enabling students to ask questions about Georgia Tech resources.</p>
            <div className="flex justify-end">
              <Link href="/projects">
                <Button className="bg-background text-white hover:bg-gold hover:text-background rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

# src/app/projects/page.tsx

```tsx
// app/projects/page.tsx
import { ProjectCard } from "@/components/projects/project-card"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="heading-accent text-4xl font-bold text-center mb-10">
        Projects
      </h1>

      <div className="bg-white/95 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

# src/components/experience/experience-card.tsx

```tsx
// components/experience/experience-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ExperienceProps = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export function ExperienceCard({
  company,
  role,
  location,
  startDate,
  endDate,
  description,
  technologies
}: ExperienceProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-lg mb-8 border-0">
      <CardHeader className="bg-background pb-2">
        <CardTitle className="heading-accent text-2xl">{company}</CardTitle>
        <div className="text-white font-medium">{role}</div>
        <div className="text-white text-sm opacity-80">{location} | {startDate} - {endDate}</div>
      </CardHeader>
      <CardContent className="bg-white text-black pt-6">
        <ul className="list-disc pl-5 mb-4 space-y-2">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <Badge key={index} className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

# src/components/navigation/footer.tsx

```tsx
// components/navigation/footer.tsx
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-sm py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-4 md:mb-0">
            © {new Date().getFullYear()} Andrew Herndon. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/experience">Experience</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-white hover:text-gold transition-colors">
      {children}
    </Link>
  )
}

export default Footer
```

# src/components/navigation/navbar.tsx

```tsx
// components/navigation/navbar.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="heading-accent text-2xl font-bold">
          Andrew Herndon
        </Link>
        
        <div className="flex space-x-1 md:space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/experience">Experience</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <Button variant="ghost" className="text-white hover:text-gold rounded-lg">
        {children}
      </Button>
    </Link>
  )
}

export default Navbar
```

# src/components/projects/page.tsx

```tsx
// app/projects/page.tsx
import { ProjectCard } from "@/components/projects/project-card"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="heading-accent text-4xl font-bold text-center mb-10">
        Projects
      </h1>

      <div className="bg-white/95 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

# src/components/projects/project-card.tsx

```tsx
// components/projects/project-card.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

type ProjectProps = {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
  }
}

export function ProjectCard({
  title,
  description,
  date,
  technologies,
  highlights,
  links
}: ProjectProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-lg border-0 h-full flex flex-col">
      <CardHeader className="bg-background pb-2">
        <CardTitle className="heading-accent text-2xl">{title}</CardTitle>
        <div className="text-white text-sm opacity-80">{date}</div>
      </CardHeader>
      <CardContent className="bg-white text-black pt-6 flex-grow">
        <p className="mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Highlights:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <Badge key={index} className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-white border-t border-gray-100 p-4">
        <div className="flex gap-3 justify-end w-full">
          {links.github && (
            <Link href={links.github} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="rounded-lg">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          )}
          {links.live && (
            <Link href={links.live} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-background text-white hover:bg-gold hover:text-background rounded-lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Site
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
```

# src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

# src/components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

# src/data/education.ts

```ts
// data/education.ts
export const education = [
    {
      id: 1,
      institution: "Georgia Institute of Technology",
      location: "Atlanta, GA",
      degree: "B.S. Computer Science",
      concentration: "Intelligence and Devices",
      startDate: "2023",
      endDate: "Expected 2027",
      relevantCoursework: [
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Objects & Design"
      ]
    }
  ];
```

# src/data/experience.ts

```ts
// data/experience.ts
export const experiences = [
    {
      id: 1,
      company: "Cisco Systems, Inc.",
      role: "Software Engineering Intern",
      location: "San Jose, CA",
      startDate: "June 2024",
      endDate: "August 2024",
      description: [
        "Developed a Retrieval-Augmented Generation (RAG) agent using Ollama and LangChain to accelerate web page creation for internal teams.",
        "Ensured that generated pages adhered to Cisco-specific styling and supported multiple front-end frameworks, maintaining consistency across projects.",
        "Contributed to the agent's data set by creating reusable page templates and component structures in HTML, CSS, JavaScript, React, and Angular.",
        "Significantly reduced the time required for internal teams to build UI pages, potentially cutting development time from hours to seconds."
      ],
      technologies: ["React", "Angular", "Vue", "Ollama", "LangChain", "HTML", "CSS", "JavaScript"]
    },
    {
      id: 2,
      company: "Effacita",
      role: "Founder & Digital Marketing Consultant",
      location: "Atlanta Metro Area, GA",
      startDate: "June 2022",
      endDate: "March 2023",
      description: [
        "Founded a digital marketing consultancy serving local businesses in the salon and beauty industry, creating targeted email campaigns to an audience of thousands.",
        "Developed streamlined user registration systems for salon subscriptions and appointment scheduling, increasing user engagement and improving conversion rates.",
        "Enhanced online presence for clients through review management systems, resulting in a 400% increase in Google reviews.",
        "Achieved over 15% growth in customer interactions across multiple metrics."
      ],
      technologies: ["Digital Marketing", "Email Campaigns", "User Registration Systems", "Review Management"]
    }
  ];
```

# src/data/personal-info.ts

```ts
// data/personal-info.ts
export const personalInfo = {
  name: "Andrew Herndon",
  title: "Computer Science Student & Software Engineer",
  location: "Atlanta, GA",
  email: "aherndon33@gatech.edu",
  phone: "+1 678-446-6034",
  github: "github.com/andrewherndon",
  linkedin: "linkedin.com/in/andrewherndon",
  about: "I'm a Computer Science student at Georgia Institute of Technology with a focus on Intelligence and Devices. My experience includes software engineering at Cisco Systems and founding a digital marketing consultancy. I'm passionate about building innovative software solutions that leverage machine learning and natural language processing techniques to solve real-world problems."
};
```

# src/data/projects.ts

```ts
// data/projects.ts
export const projects = [
    {
      id: 1,
      title: "Roots Financial Platform",
      description: "Award-winning financial platform consolidating budgeting, investment tracking, and credit card optimization.",
      date: "March 2025",
      technologies: ["Next.js", "React", "TailwindCSS", "Capital One Nessie API", "Gemini LLM", "Auth0"],
      highlights: [
        "Led frontend development for an award-winning financial platform, implementing responsive UI components with Next.js, React, and TailwindCSS.",
        "Collaborated in a cross-university team to create an intuitive interface leveraging Capital One's Nessie API for transaction simulation.",
        "Designed user experience focused on making complex financial concepts accessible through interactive visualizations and personalized recommendations.",
        "Won 'Best Financial Hack' at HackPrinceton Spring 2025."
      ],
      links: {
        github: "https://github.com/yourusername/roots-financial",
        live: "https://roots-financial.vercel.app"
      }
    },
    {
      id: 2,
      title: "Georgia Tech RAG Chatbot",
      description: "Campus-wide chatbot enabling students to ask questions about Georgia Tech resources, courses, policies, and campus information.",
      date: "January 2025 - Present",
      technologies: ["Python", "LLM", "Vector Search", "NVIDIA", "Backend Development"],
      highlights: [
        "Contributing to an innovative campus-wide chatbot for Georgia Tech students to access information about campus resources and policies.",
        "Designed and implemented an efficient query processing system that ensures GT-focused responses while filtering out irrelevant queries.",
        "Collaborated with NVIDIA engineers through regular consultations to optimize vector search techniques and embedding models.",
        "Received technical guidance on performance optimization and system architecture from industry professionals."
      ],
      links: {
        github: "https://github.com/AI-GT/gt-rag-chatbot"
      }
    },
    {
      id: 3,
      title: "Linguality",
      description: "Language learning web application that helps users read books in 20+ languages while building vocabulary through interactive tools.",
      date: "November 2023 - Present",
      technologies: ["React", "TypeScript", "Firebase", "Flask", "Google Cloud Translate API", "SpaCy NLP"],
      highlights: [
        "Built a language learning web application using React, TypeScript, and Firebase that supports reading in over 20 languages.",
        "Engineered a Flask backend with NLP integration for context-aware translations of 90,000+ vocabulary items.",
        "Implemented spaced repetition algorithms to enhance language acquisition efficiency.",
        "Integrated Google Cloud Translate API and SpaCy NLP for accurate translations and natural language processing."
      ],
      links: {
        github: "https://github.com/yourusername/linguality",
        live: "https://linguality.app"
      }
    }
  ];
```

# src/data/skills.ts

```ts
// data/skills.ts
export const skills = {
    programmingLanguages: [
      "Python",
      "JavaScript",
      "Java", 
      "TypeScript",
      "HTML",
      "CSS"
    ],
    frameworksAndTechnologies: [
      "React",
      "Angular",
      "Flask",
      "PyTorch",
      "TensorFlow",
      "Ollama",
      "APIs",
      "NumPy",
      "Pandas"
    ],
    specializations: [
      "ML / NLP",
      "RAG Systems",
      "UI / UX Design",
      "Vector Databases",
      "Front-End Development"
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Russian", level: "Proficient" },
      { name: "Chinese", level: "Beginner" }
    ]
  };
```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#B22222", // Rich red background
        foreground: "#FFFFFF", // White text
        gold: "#FFD700",      // Gold for accent/important text
        text: "#FFFFFF",      // White text
        "text-alt": "#000000", // Alternative black text for contrast
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        "gold-drop": "2px 2px 0px rgba(255, 215, 0, 0.6)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

