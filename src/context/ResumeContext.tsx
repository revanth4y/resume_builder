import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import type {
  ResumeData,
  PersonalInfo,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  Links,
  SkillsByCategory,
} from '../types/resume';
import {
  emptyResume,
  emptyPersonal,
  emptyLinks,
  emptySkillsByCategory,
} from '../types/resume';
import { STORAGE_KEY } from '../utils/atsScore';

const sampleResume: ResumeData = {
  personal: {
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Software engineer with 4+ years building web applications. Focus on React, TypeScript, and clean architecture. Passionate about developer experience and accessibility.',
  education: [
    {
      id: 'edu-1',
      school: 'State University',
      degree: 'B.S. Computer Science',
      period: '2016 – 2020',
      details: 'Relevant coursework: Data Structures, Algorithms, Web Development.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'Tech Co.',
      period: '2022 – Present',
      details:
        'Lead frontend initiatives. Improved core web vitals by 40%. Mentored 2 junior developers.',
    },
    {
      id: 'exp-2',
      role: 'Frontend Developer',
      company: 'Startup Inc.',
      period: '2020 – 2022',
      details: 'Built customer dashboard and design system. Shipped 3 major product releases.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Open Source CLI Tool',
      period: '2023',
      details: 'TypeScript CLI for scaffolding. 2k+ GitHub stars.',
      description: 'TypeScript CLI for scaffolding. 2k+ GitHub stars.',
      techStack: ['TypeScript', 'Node.js'],
      githubUrl: 'https://github.com/example/cli',
      link: 'https://github.com/example/cli',
    },
  ],
  skillsByCategory: {
    technical: ['React', 'TypeScript', 'Node.js', 'CSS', 'REST APIs'],
    soft: ['Communication', 'Problem Solving'],
    tools: ['Git', 'Docker'],
  },
  links: {
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
  },
};

type ResumeContextValue = {
  resume: ResumeData;
  setPersonal: (v: PersonalInfo) => void;
  setSummary: (v: string) => void;
  setEducation: (v: EducationEntry[]) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  setExperience: (v: ExperienceEntry[]) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  setProjects: (v: ProjectEntry[]) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  setSkillsByCategory: (v: SkillsByCategory) => void;
  addSkillToCategory: (category: keyof SkillsByCategory, skill: string) => void;
  removeSkillFromCategory: (category: keyof SkillsByCategory, skill: string) => void;
  suggestSkills: () => Promise<void>;
  setLinks: (v: Links) => void;
  loadSampleData: () => void;
  updateEducation: (id: string, updates: Partial<EducationEntry>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceEntry>) => void;
  updateProject: (id: string, updates: Partial<ProjectEntry>) => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function ensureIds<T extends { id?: string }>(items: T[], prefix: string): T[] {
  return items.map((item) => ({
    ...item,
    id: (item as { id?: string }).id || makeId(prefix),
  }));
}

function loadStoredResume(): ResumeData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const r = parsed as Record<string, unknown>;
    const personal = (r.personal && typeof r.personal === 'object' ? r.personal : emptyPersonal) as PersonalInfo;
    const education = Array.isArray(r.education) ? ensureIds(r.education as EducationEntry[], 'edu') : [];
    const experience = Array.isArray(r.experience) ? ensureIds(r.experience as ExperienceEntry[], 'exp') : [];
    const projectsRaw = Array.isArray(r.projects) ? (r.projects as ProjectEntry[]) : [];
    const projects = ensureIds(projectsRaw.map((p) => ({
      ...p,
      techStack: Array.isArray(p.techStack) ? p.techStack : [],
    })), 'proj');
    const legacySkills = Array.isArray(r.skills) ? (r.skills as string[]) : [];
    const skillsByCategory: SkillsByCategory = (r.skillsByCategory && typeof r.skillsByCategory === 'object')
      ? {
          technical: Array.isArray((r.skillsByCategory as SkillsByCategory).technical) ? (r.skillsByCategory as SkillsByCategory).technical : [],
          soft: Array.isArray((r.skillsByCategory as SkillsByCategory).soft) ? (r.skillsByCategory as SkillsByCategory).soft : [],
          tools: Array.isArray((r.skillsByCategory as SkillsByCategory).tools) ? (r.skillsByCategory as SkillsByCategory).tools : [],
        }
      : { ...emptySkillsByCategory, technical: legacySkills };
    const links = (r.links && typeof r.links === 'object' ? r.links : emptyLinks) as Links;
    return {
      personal: { ...emptyPersonal, ...personal },
      summary: typeof r.summary === 'string' ? r.summary : '',
      education,
      experience,
      projects,
      skillsByCategory,
      links: { ...emptyLinks, ...links },
    };
  } catch {
    return null;
  }
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<ResumeData>(() => loadStoredResume() ?? emptyResume);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch {
      // ignore quota or serialization errors
    }
  }, [resume]);

  const setPersonal = useCallback((v: PersonalInfo) => {
    setResume((prev) => ({ ...prev, personal: v }));
  }, []);

  const setSummary = useCallback((v: string) => {
    setResume((prev) => ({ ...prev, summary: v }));
  }, []);

  const setEducation = useCallback((v: EducationEntry[]) => {
    setResume((prev) => ({ ...prev, education: v }));
  }, []);

  const addEducation = useCallback(() => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: makeId('edu'),
          school: '',
          degree: '',
          period: '',
          details: '',
        },
      ],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const updateEducation = useCallback((id: string, updates: Partial<EducationEntry>) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }));
  }, []);

  const setExperience = useCallback((v: ExperienceEntry[]) => {
    setResume((prev) => ({ ...prev, experience: v }));
  }, []);

  const addExperience = useCallback(() => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: makeId('exp'),
          role: '',
          company: '',
          period: '',
          details: '',
        },
      ],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<ExperienceEntry>) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }));
  }, []);

  const setProjects = useCallback((v: ProjectEntry[]) => {
    setResume((prev) => ({ ...prev, projects: v }));
  }, []);

  const addProject = useCallback(() => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: makeId('proj'),
          name: '',
          period: '',
          details: '',
          description: '',
          techStack: [],
          liveUrl: '',
          githubUrl: '',
          link: '',
        },
      ],
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<ProjectEntry>) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const setSkillsByCategory = useCallback((v: SkillsByCategory) => {
    setResume((prev) => ({ ...prev, skillsByCategory: v }));
  }, []);

  const addSkillToCategory = useCallback((category: keyof SkillsByCategory, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setResume((prev) => {
      const list = prev.skillsByCategory?.[category] ?? [];
      if (list.includes(trimmed)) return prev;
      return {
        ...prev,
        skillsByCategory: {
          ...prev.skillsByCategory,
          [category]: [...list, trimmed],
        },
      };
    });
  }, []);

  const removeSkillFromCategory = useCallback((category: keyof SkillsByCategory, skill: string) => {
    setResume((prev) => ({
      ...prev,
      skillsByCategory: {
        ...prev.skillsByCategory,
        [category]: (prev.skillsByCategory?.[category] ?? []).filter((s) => s !== skill),
      },
    }));
  }, []);

  const suggestSkills = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setResume((prev) => {
      const addUnique = (arr: string[], items: string[]) => {
        const set = new Set(arr);
        items.forEach((i) => set.add(i));
        return Array.from(set);
      };
      return {
        ...prev,
        skillsByCategory: {
          technical: addUnique(prev.skillsByCategory?.technical ?? [], ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL']),
          soft: addUnique(prev.skillsByCategory?.soft ?? [], ['Team Leadership', 'Problem Solving']),
          tools: addUnique(prev.skillsByCategory?.tools ?? [], ['Git', 'Docker', 'AWS']),
        },
      };
    });
  }, []);

  const setLinks = useCallback((v: Links) => {
    setResume((prev) => ({ ...prev, links: v }));
  }, []);

  const loadSampleData = useCallback(() => {
    setResume(JSON.parse(JSON.stringify(sampleResume)));
  }, []);

  const value: ResumeContextValue = {
    resume,
    setPersonal,
    setSummary,
    setEducation,
    addEducation,
    removeEducation,
    setExperience,
    addExperience,
    removeExperience,
    setProjects,
    addProject,
    removeProject,
    setSkillsByCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    suggestSkills,
    setLinks,
    loadSampleData,
    updateEducation,
    updateExperience,
    updateProject,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
