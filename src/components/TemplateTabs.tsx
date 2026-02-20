import { useTemplate } from '../context/TemplateContext';
import type { ResumeTemplate } from '../context/TemplateContext';
import './TemplateTabs.css';

const OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
];

export function TemplateTabs() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-tabs no-print" role="tablist" aria-label="Resume template">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={template === value}
          className={`template-tab ${template === value ? 'active' : ''}`}
          onClick={() => setTemplate(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
