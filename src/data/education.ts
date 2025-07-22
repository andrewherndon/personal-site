// data/education.ts
export const getEducation = (t: (content: string) => string) => [
    {
      id: 1,
      institution: t("Georgia Institute of Technology"),
      location: t("Atlanta, GA"),
      degree: t("B.S. Computer Science"),
      concentration: t("Intelligence and Devices"),
      startDate: "2023",
      endDate: t("Expected 2027"),
      relevantCoursework: [
        t("Object Oriented Programming"),
        t("Data Structures & Algorithms"),
        t("Objects & Design")
      ]
    }
  ];