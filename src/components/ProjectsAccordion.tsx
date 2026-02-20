import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TechStackInput } from './TechStackInput';
import './ProjectsAccordion.css';

const DESC_MAX = 200;

export function ProjectsAccordion() {
  const { resume, addProject, removeProject, updateProject } = useResume();
  const { projects } = resume;
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  const setDescription = (id: string, value: string) => {
    updateProject(id, { description: value.slice(0, DESC_MAX) });
  };

  return (
    <section className="builder-section projects-accordion">
      <div className="projects-accordion-header">
        <h2 className="builder-section-title">Projects</h2>
        <button type="button" className="btn btn-secondary" onClick={addProject}>
          Add Project
        </button>
      </div>
      {projects.map((p) => {
        const isOpen = openId === p.id;
        const title = p.name?.trim() || 'Untitled Project';
        const desc = p.description ?? '';
        const techStack = p.techStack ?? [];

        return (
          <div key={p.id} className="project-accordion-item">
            <button
              type="button"
              className="project-accordion-head"
              onClick={() => setOpenId(isOpen ? null : p.id)}
              aria-expanded={isOpen}
            >
              <span className="project-accordion-title">{title}</span>
              <span className="project-accordion-chevron">{isOpen ? '▼' : '▶'}</span>
            </button>
            {isOpen && (
              <div className="project-accordion-body">
                <label>
                  Project Title
                  <input
                    placeholder="Project name"
                    value={p.name}
                    onChange={(e) => updateProject(p.id, { name: e.target.value })}
                  />
                </label>
                <label>
                  Description (max {DESC_MAX} chars)
                  <textarea
                    placeholder="Short description"
                    value={desc}
                    onChange={(e) => setDescription(p.id, e.target.value)}
                    rows={3}
                    maxLength={DESC_MAX}
                  />
                  <span className="project-char-count">{desc.length}/{DESC_MAX}</span>
                </label>
                <label>
                  Tech Stack
                  <TechStackInput
                    techStack={techStack}
                    onChange={(techStack) => updateProject(p.id, { techStack })}
                  />
                </label>
                <label>
                  Live URL (optional)
                  <input
                    type="url"
                    placeholder="https://..."
                    value={p.liveUrl ?? ''}
                    onChange={(e) => updateProject(p.id, { liveUrl: e.target.value })}
                  />
                </label>
                <label>
                  GitHub URL (optional)
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={p.githubUrl ?? p.link ?? ''}
                    onChange={(e) => updateProject(p.id, { githubUrl: e.target.value, link: e.target.value })}
                  />
                </label>
                <div className="project-accordion-actions">
                  <button type="button" className="btn btn-ghost project-delete" onClick={() => removeProject(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
