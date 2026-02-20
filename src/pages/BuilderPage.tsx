import { useResume } from '../context/ResumeContext';
import { useTemplate } from '../context/TemplateContext';
import { ResumePreviewShell } from '../components/ResumePreviewShell';
import { AtsScoreBlock } from '../components/AtsScoreBlock';
import { TemplatePicker } from '../components/TemplatePicker';
import { ColorThemePicker } from '../components/ColorThemePicker';
import { BulletGuidanceHint } from '../components/BulletGuidanceHint';
import { ProjectsAccordion } from '../components/ProjectsAccordion';
import { SkillsAccordion } from '../components/SkillsAccordion';
import './BuilderPage.css';

export function BuilderPage() {
  const { resume, setPersonal, setSummary, addEducation, removeEducation, updateEducation, addExperience, removeExperience, updateExperience, updateProject, removeProject, setLinks, loadSampleData } = useResume();
  const { template, accentColor } = useTemplate();
  const { personal, summary, education, experience, projects, links } = resume;

  return (
    <div className="builder-page">
      <div className="builder-toolbar">
        <button type="button" className="btn btn-secondary" onClick={loadSampleData}>
          Load Sample Data
        </button>
      </div>

      <div className="builder-columns">
        <div className="builder-form">
          <section className="builder-section">
            <h2 className="builder-section-title">Personal Info</h2>
            <label>
              Name
              <input
                value={personal.name}
                onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                placeholder="Full name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={personal.email}
                onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                placeholder="email@example.com"
              />
            </label>
            <label>
              Phone
              <input
                value={personal.phone}
                onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </label>
            <label>
              Location
              <input
                value={personal.location}
                onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                placeholder="City, State"
              />
            </label>
          </section>

          <section className="builder-section">
            <h2 className="builder-section-title">Summary</h2>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief professional summary..."
              rows={4}
            />
          </section>

          <section className="builder-section">
            <h2 className="builder-section-title">Education</h2>
            {education.map((e) => (
              <div key={e.id} className="builder-entry">
                <input
                  placeholder="School"
                  value={e.school}
                  onChange={(ev) => updateEducation(e.id, { school: ev.target.value })}
                />
                <input
                  placeholder="Degree"
                  value={e.degree}
                  onChange={(ev) => updateEducation(e.id, { degree: ev.target.value })}
                />
                <input
                  placeholder="Period"
                  value={e.period}
                  onChange={(ev) => updateEducation(e.id, { period: ev.target.value })}
                />
                <textarea
                  placeholder="Details (optional)"
                  value={e.details ?? ''}
                  onChange={(ev) => updateEducation(e.id, { details: ev.target.value })}
                  rows={2}
                />
                <button type="button" className="btn btn-ghost" onClick={() => removeEducation(e.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addEducation}>
              + Add Education
            </button>
          </section>

          <section className="builder-section">
            <h2 className="builder-section-title">Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="builder-entry">
                <input
                  placeholder="Role"
                  value={e.role}
                  onChange={(ev) => updateExperience(e.id, { role: ev.target.value })}
                />
                <input
                  placeholder="Company"
                  value={e.company}
                  onChange={(ev) => updateExperience(e.id, { company: ev.target.value })}
                />
                <input
                  placeholder="Period"
                  value={e.period}
                  onChange={(ev) => updateExperience(e.id, { period: ev.target.value })}
                />
                <textarea
                  placeholder="Details (optional) — one bullet per line"
                  value={e.details ?? ''}
                  onChange={(ev) => updateExperience(e.id, { details: ev.target.value })}
                  rows={2}
                />
                <BulletGuidanceHint details={e.details} />
                <button type="button" className="btn btn-ghost" onClick={() => removeExperience(e.id)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addExperience}>
              + Add Experience
            </button>
          </section>

          <ProjectsAccordion />

          <SkillsAccordion />

          <section className="builder-section">
            <h2 className="builder-section-title">Links</h2>
            <label>
              GitHub
              <input
                type="url"
                placeholder="https://github.com/..."
                value={links.github}
                onChange={(e) => setLinks({ ...links, github: e.target.value })}
              />
            </label>
            <label>
              LinkedIn
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={links.linkedin}
                onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
              />
            </label>
          </section>
        </div>

        <aside className="builder-preview-wrap">
          <div className="builder-preview-sticky">
            <TemplatePicker />
            <ColorThemePicker />
            <AtsScoreBlock resume={resume} />
            <h3 className="builder-preview-label">Live preview</h3>
            <ResumePreviewShell resume={resume} template={template} accentColor={accentColor} />
          </div>
        </aside>
      </div>
    </div>
  );
}
