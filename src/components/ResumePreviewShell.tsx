import type { ResumeData } from '../types/resume';
import type { ResumeTemplate } from '../context/TemplateContext';
import './ResumePreviewShell.css';

type Props = {
  resume: ResumeData;
  /** Minimal B&W for /preview; false for builder panel */
  minimal?: boolean;
  /** Layout variant: classic | modern | minimal */
  template?: ResumeTemplate;
  /** Accent color for headings, borders, sidebar (e.g. hsl(168, 60%, 40%)) */
  accentColor?: string;
};

function hasContent(entry: Record<string, unknown>): boolean {
  return Object.entries(entry).some(([k, v]) => k !== 'id' && typeof v === 'string' && v.trim().length > 0);
}

const SKILL_GROUP_LABELS: Record<string, string> = {
  technical: 'Technical Skills',
  soft: 'Soft Skills',
  tools: 'Tools & Technologies',
};

function projectHasContent(p: Record<string, unknown>): boolean {
  return Object.entries(p).some(([k, v]) => {
    if (k === 'id') return false;
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === 'string' && v.trim().length > 0;
  });
}

export function ResumePreviewShell({ resume, minimal = false, template = 'classic', accentColor = 'hsl(168, 60%, 40%)' }: Props) {
  const { personal, summary, education, experience, projects, skillsByCategory, links } = resume;
  const rootClass = [
    'resume-preview',
    minimal ? 'resume-preview--minimal' : '',
    `resume-preview--tpl-${template}`,
  ].filter(Boolean).join(' ');
  const educationShown = education.filter(hasContent);
  const experienceShown = experience.filter(hasContent);
  const projectsShown = projects.filter(projectHasContent);
  const hasAnySkills =
    (skillsByCategory?.technical?.length ?? 0) +
    (skillsByCategory?.soft?.length ?? 0) +
    (skillsByCategory?.tools?.length ?? 0) >
    0;

  const headerBlock = (
    <header className="resume-preview-header">
      <h1 className="resume-preview-name">{personal.name || 'Your Name'}</h1>
      <div className="resume-preview-contact">
        {[personal.email, personal.phone, personal.location]
          .filter(Boolean)
          .join(' · ')}
      </div>
    </header>
  );

  const skillsBlock = hasAnySkills && (
    <section className="resume-preview-section">
      <h2 className="resume-preview-section-title">Skills</h2>
      <div className="resume-preview-skills-groups">
        {(['technical', 'soft', 'tools'] as const).map(
          (key) =>
            (skillsByCategory?.[key]?.length ?? 0) > 0 && (
              <div key={key} className="resume-preview-skill-group">
                <span className="resume-preview-skill-group-label">{SKILL_GROUP_LABELS[key]}</span>
                <div className="resume-preview-skill-pills">
                  {(skillsByCategory[key] ?? []).map((s) => (
                    <span key={s} className="resume-preview-skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );

  const mainSections = (
    <>
      {summary && (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Summary</h2>
          <p className="resume-preview-summary">{summary}</p>
        </section>
      )}
      {educationShown.length > 0 && (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Education</h2>
          {educationShown.map((e) => (
            <div key={e.id} className="resume-preview-entry">
              <div className="resume-preview-entry-head">
                <strong>{e.school || 'School'}</strong>
                <span>{e.period}</span>
              </div>
              <div className="resume-preview-entry-sub">{e.degree}</div>
              {e.details && <p className="resume-preview-entry-details">{e.details}</p>}
            </div>
          ))}
        </section>
      )}
      {experienceShown.length > 0 && (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Experience</h2>
          {experienceShown.map((e) => (
            <div key={e.id} className="resume-preview-entry">
              <div className="resume-preview-entry-head">
                <strong>{e.role || 'Role'}</strong>
                <span>{e.period}</span>
              </div>
              <div className="resume-preview-entry-sub">{e.company}</div>
              {e.details && <p className="resume-preview-entry-details">{e.details}</p>}
            </div>
          ))}
        </section>
      )}
      {projectsShown.length > 0 && (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Projects</h2>
          <div className="resume-preview-projects">
            {projectsShown.map((p) => (
              <div key={p.id} className="resume-preview-project-card">
                <div className="resume-preview-project-head">
                  <strong>{p.name || 'Project'}</strong>
                  <div className="resume-preview-project-links">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="Live site" aria-label="Live site">
                        Live ↗
                      </a>
                    )}
                    {(p.githubUrl || p.link) && (
                      <a href={p.githubUrl || p.link} target="_blank" rel="noopener noreferrer" className="resume-preview-link-icon" title="GitHub" aria-label="GitHub">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
                {(p.description || p.details) && (
                  <p className="resume-preview-project-desc">{p.description || p.details}</p>
                )}
                {(p.techStack?.length ?? 0) > 0 && (
                  <div className="resume-preview-project-tech">
                    {(p.techStack ?? []).map((t) => (
                      <span key={t} className="resume-preview-tech-pill">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {(links.github?.trim() || links.linkedin?.trim()) && (
        <section className="resume-preview-section">
          <h2 className="resume-preview-section-title">Links</h2>
          <p className="resume-preview-links">
            {[links.github, links.linkedin].filter(Boolean).join(' · ')}
          </p>
        </section>
      )}
    </>
  );

  return (
    <div className={rootClass} style={{ ['--resume-accent' as string]: accentColor }}>
      {template === 'modern' ? (
        <div className="resume-preview-modern-wrap">
          <div className="resume-preview-sidebar">
            {headerBlock}
            {skillsBlock}
          </div>
          <div className="resume-preview-main">{mainSections}</div>
        </div>
      ) : (
        <>
          {headerBlock}
          {hasAnySkills && skillsBlock}
          {mainSections}
        </>
      )}
    </div>
  );
}
