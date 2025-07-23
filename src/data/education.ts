// data/education.ts
import { InlineTranslationOptions } from 'gt-next/types';

export const getEducation = (t: (content: string, options?: InlineTranslationOptions) => string) => [
    {
      id: 1,
      institution: t("Georgia Institute of Technology"),
      location: t("Atlanta, GA"),
      degree: t("B.S. Computer Science"),
      concentration: t("Intelligence and Devices"),
      startDate: t("2023"),
      endDate: t("Expected 2027"),
      relevantCoursework: [
        t("Object Oriented Programming"),
        t("Data Structures & Algorithms"),
        t("Objects & Design")
      ]
    }
  ];