// data/personal-info.ts
import { InlineTranslationOptions } from 'gt-next/types';

export const getPersonalInfo = (t: (content: string, options?: InlineTranslationOptions) => string) => ({
  name: t("Andrew Herndon"),
  title: t("Computer Science Student & Software Engineer"),
  location: t("Atlanta, GA"),
  email: "aherndon33@gatech.edu",
  phone: "+1 678-446-6034",
  github: "github.com/andrewherndon",
  linkedin: "https://www.linkedin.com/in/andrew-herndon-607304292",
  about: t("I'm a Computer Science student at Georgia Institute of Technology with a focus on Intelligence and Devices. My experience includes software engineering at Cisco Systems and founding a digital marketing consultancy. I'm passionate about building innovative software solutions that leverage machine learning and natural language processing techniques to solve real-world problems.")
});