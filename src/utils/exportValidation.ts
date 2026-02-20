import type { ResumeData } from '../types/resume';

/**
 * Returns true if resume may look incomplete (missing name or both experience and projects).
 * Used to show a calm warning only; does not block export.
 */
export function isResumePossiblyIncomplete(data: ResumeData): boolean {
  const hasName = (data.personal.name ?? '').trim().length > 0;
  const hasExperience = data.experience.length > 0;
  const hasProjects = data.projects.length > 0;
  if (!hasName) return true;
  if (!hasExperience && !hasProjects) return true;
  return false;
}

/** Message to show before export when resume may look incomplete (missing name, etc.). */
export function getExportWarningMessage(data: ResumeData): string | null {
  if (!isResumePossiblyIncomplete(data)) return null;
  const hasName = (data.personal.name ?? '').trim().length > 0;
  const hasExperience = data.experience.length > 0;
  const hasProjects = data.projects.length > 0;
  if (!hasName) return 'Add your name. Your resume may look incomplete.';
  if (!hasExperience && !hasProjects) return 'Add at least one experience or project. Your resume may look incomplete.';
  return 'Your resume may look incomplete.';
}
