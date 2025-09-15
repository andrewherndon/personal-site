// data/skills.ts
export const getSkills = (t: (content: string) => string) => {
  return {
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
      t("ML / NLP"),
      t("RAG Systems"),
      t("UI / UX Design"),
      t("Vector Databases"),
      t("Front-End Development")
    ],
    languages: [
      { name: t("English"), level: t("Native") },
      { name: t("Russian"), level: t("Proficient") },
      { name: t("Chinese"), level: t("Beginner") }
    ]
  };
};