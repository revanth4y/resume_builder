export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  period: string;
  details?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  details?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  period?: string;
  details?: string;
  /** Short description, max 200 chars */
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  link?: string;
}

export interface Links {
  github: string;
  linkedin: string;
}

export interface SkillsByCategory {
  technical: string[];
  soft: string[];
  tools: string[];
}

export const emptySkillsByCategory: SkillsByCategory = {
  technical: [],
  soft: [],
  tools: [],
};

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  /** Categorized skills (technical, soft, tools) */
  skillsByCategory: SkillsByCategory;
  /** @deprecated use skillsByCategory; kept for migration */
  skills?: string[];
  links: Links;
}

export const emptyPersonal: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

export const emptyLinks: Links = {
  github: '',
  linkedin: '',
};

export const emptyResume: ResumeData = {
  personal: emptyPersonal,
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skillsByCategory: emptySkillsByCategory,
  links: emptyLinks,
};
