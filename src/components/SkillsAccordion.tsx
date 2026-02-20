import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import type { SkillsByCategory } from '../types/resume';
import { SkillTagInput } from './SkillTagInput';
import './SkillsAccordion.css';

const CATEGORIES: { key: keyof SkillsByCategory; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
];

export function SkillsAccordion() {
  const { resume, addSkillToCategory, removeSkillFromCategory, suggestSkills } = useResume();
  const [suggesting, setSuggesting] = useState(false);

  const handleSuggest = async () => {
    setSuggesting(true);
    await suggestSkills();
    setSuggesting(false);
  };

  return (
    <section className="builder-section skills-accordion">
      <div className="skills-accordion-header">
        <h2 className="builder-section-title">Skills</h2>
        <button
          type="button"
          className="btn btn-secondary skills-suggest-btn"
          onClick={handleSuggest}
          disabled={suggesting}
        >
          {suggesting ? 'Adding…' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ key, label }) => (
        <SkillTagInput
          key={key}
          label={label}
          count={(resume.skillsByCategory?.[key] ?? []).length}
          skills={resume.skillsByCategory?.[key] ?? []}
          onAdd={(skill) => addSkillToCategory(key, skill)}
          onRemove={(skill) => removeSkillFromCategory(key, skill)}
        />
      ))}
    </section>
  );
}
