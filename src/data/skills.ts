// data/skills.ts
import { InlineTranslationOptions } from 'gt-next/types';

export const getSkills = (t: (content: string, options?: InlineTranslationOptions) => string) => ({
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
      t("UI / UX Design"),
      "Vector Databases",
      t("Front-End Development")
    ],
    languages: [
      { name: t("English"), level: t("Native") },
      { name: t("Russian"), level: t("Proficient") },
      { name: t("Chinese"), level: t("Beginner") }
    ]
  });