import type { ResumeData } from '../types/resume';

function line(str: string): string {
  return str.trim() ? str.trim() : '';
}

/** Build clean plain-text resume for copy/paste. */
export function resumeToPlainText(data: ResumeData): string {
  const { personal, summary, education, experience, projects, skillsByCategory, links } = data;
  const allSkills = [
    ...(skillsByCategory?.technical ?? []),
    ...(skillsByCategory?.soft ?? []),
    ...(skillsByCategory?.tools ?? []),
  ].filter(Boolean);
  const parts: string[] = [];

  parts.push(line(personal.name) || 'Name');
  const contact = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .map((s) => s.trim())
    .join(' · ');
  if (contact) parts.push(contact);
  parts.push('');

  if (summary.trim()) {
    parts.push('Summary');
    parts.push(summary.trim());
    parts.push('');
  }

  const educationLines = education
    .filter((e) => e.school?.trim() || e.degree?.trim() || e.period?.trim())
    .map((e) => {
      const line1 = [e.school, e.period].filter(Boolean).join('  —  ');
      const line2 = e.degree?.trim() ?? '';
      const line3 = e.details?.trim() ?? '';
      return [line1, line2, line3].filter(Boolean).join('\n');
    });
  if (educationLines.length > 0) {
    parts.push('Education');
    parts.push(educationLines.join('\n\n'));
    parts.push('');
  }

  const experienceLines = experience
    .filter((e) => e.role?.trim() || e.company?.trim() || e.details?.trim())
    .map((e) => {
      const line1 = [e.role, e.period].filter(Boolean).join('  —  ');
      const line2 = e.company?.trim() ?? '';
      const line3 = e.details?.trim() ?? '';
      return [line1, line2, line3].filter(Boolean).join('\n');
    });
  if (experienceLines.length > 0) {
    parts.push('Experience');
    parts.push(experienceLines.join('\n\n'));
    parts.push('');
  }

  const projectLines = projects
    .filter((p) => p.name?.trim() || p.description?.trim() || p.details?.trim())
    .map((p) => {
      const line1 = [p.name, p.period].filter(Boolean).join('  —  ');
      const line2 = (p.description ?? p.details ?? '').trim();
      const line3 = [p.liveUrl, p.githubUrl ?? p.link].filter(Boolean).join('  ');
      const line4 = (p.techStack ?? []).join(', ');
      return [line1, line2, line3, line4].filter(Boolean).join('\n');
    });
  if (projectLines.length > 0) {
    parts.push('Projects');
    parts.push(projectLines.join('\n\n'));
    parts.push('');
  }

  if (allSkills.length > 0) {
    parts.push('Skills');
    parts.push(allSkills.join(', '));
    parts.push('');
  }

  const linkLines = [links.github, links.linkedin].filter((s) => s?.trim());
  if (linkLines.length > 0) {
    parts.push('Links');
    parts.push(linkLines.join('\n'));
  }

  return parts.join('\n').trimEnd();
}
