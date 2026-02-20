import type { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resumeBuilderData';

/** Total skill count across all categories. */
export function getTotalSkillsCount(data: ResumeData): number {
  const s = data.skillsByCategory;
  if (!s) return (data.skills ?? []).length;
  return (s.technical?.length ?? 0) + (s.soft?.length ?? 0) + (s.tools?.length ?? 0);
}

const ACTION_VERBS = /\b(built|led|designed|improved|created|developed|implemented|managed|launched|delivered|achieved|increased|reduced|optimized|automated|established|coordinated|mentored|shipped)\b/i;

/** True if summary contains at least one action verb. */
function summaryHasActionVerbs(summary: string): boolean {
  return ACTION_VERBS.test(summary || '');
}

/** True if experience entry has bullets (details with content). */
function hasExperienceWithBullets(data: ResumeData): boolean {
  return data.experience.some((e) => (e.details ?? '').trim().length > 0);
}

/** ATS Score: deterministic 0–100 (new rules). */
export function computeAtsScore(data: ResumeData): number {
  let score = 0;

  if ((data.personal.name ?? '').trim().length > 0) score += 10;
  if ((data.personal.email ?? '').trim().length > 0) score += 10;
  if ((data.summary ?? '').trim().length > 50) score += 10;
  if (hasExperienceWithBullets(data)) score += 15;
  if (data.education.length >= 1) score += 10;
  if (getTotalSkillsCount(data) >= 5) score += 10;
  if (data.projects.length >= 1) score += 10;
  if ((data.personal.phone ?? '').trim().length > 0) score += 5;
  if ((data.links.linkedin ?? '').trim().length > 0) score += 5;
  if ((data.links.github ?? '').trim().length > 0) score += 5;
  if (summaryHasActionVerbs(data.summary ?? '')) score += 10;

  return Math.min(100, score);
}

/** Band for display: 0-40 Needs Work, 41-70 Getting There, 71-100 Strong Resume */
export function getAtsScoreBand(score: number): 'needs-work' | 'getting-there' | 'strong' {
  if (score <= 40) return 'needs-work';
  if (score <= 70) return 'getting-there';
  return 'strong';
}

export const ATS_BAND_LABELS: Record<ReturnType<typeof getAtsScoreBand>, string> = {
  'needs-work': 'Needs Work',
  'getting-there': 'Getting There',
  'strong': 'Strong Resume',
};

/** Improvement suggestions with point values for missing items. */
export function getAtsImprovementSuggestions(data: ResumeData): string[] {
  const list: string[] = [];

  if (!(data.personal.name ?? '').trim()) list.push('Add your name (+10 points)');
  if (!(data.personal.email ?? '').trim()) list.push('Add your email (+10 points)');
  if ((data.summary ?? '').trim().length <= 50) list.push('Add a professional summary over 50 characters (+10 points)');
  if (!hasExperienceWithBullets(data)) list.push('Add at least one experience entry with bullets (+15 points)');
  if (data.education.length < 1) list.push('Add at least one education entry (+10 points)');
  if (getTotalSkillsCount(data) < 5) list.push('Add at least 5 skills (+10 points)');
  if (data.projects.length < 1) list.push('Add at least one project (+10 points)');
  if (!(data.personal.phone ?? '').trim()) list.push('Add your phone (+5 points)');
  if (!(data.links.linkedin ?? '').trim()) list.push('Add LinkedIn link (+5 points)');
  if (!(data.links.github ?? '').trim()) list.push('Add GitHub link (+5 points)');
  if (!summaryHasActionVerbs(data.summary ?? '')) list.push('Use action verbs in your summary (e.g. built, led, designed) (+10 points)');

  return list;
}

/** Legacy: up to 3 suggestions for Builder panel (same as improvements, capped). */
export function getAtsSuggestions(data: ResumeData): string[] {
  return getAtsImprovementSuggestions(data).slice(0, 5);
}

/** Legacy: top improvements for Builder panel. */
export function getTopImprovements(data: ResumeData): string[] {
  return getAtsImprovementSuggestions(data).slice(0, 5);
}

export { STORAGE_KEY };
