import { useTemplate } from '../context/TemplateContext';
import type { ResumeTemplate } from '../context/TemplateContext';
import './TemplatePicker.css';

const OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
];

function ThumbnailClassic() {
  return (
    <div className="template-thumb template-thumb-classic">
      <div className="thumb-line thumb-name" />
      <div className="thumb-line thumb-sub" />
      <div className="thumb-rule" />
      <div className="thumb-line short" />
      <div className="thumb-line short" />
      <div className="thumb-rule" />
      <div className="thumb-line short" />
      <div className="thumb-line short" />
    </div>
  );
}

function ThumbnailModern() {
  return (
    <div className="template-thumb template-thumb-modern">
      <div className="thumb-sidebar" />
      <div className="thumb-main">
        <div className="thumb-line thumb-name" />
        <div className="thumb-rule" />
        <div className="thumb-line short" />
        <div className="thumb-line short" />
      </div>
    </div>
  );
}

function ThumbnailMinimal() {
  return (
    <div className="template-thumb template-thumb-minimal">
      <div className="thumb-line thumb-name" />
      <div className="thumb-gap" />
      <div className="thumb-line short" />
      <div className="thumb-gap" />
      <div className="thumb-line short" />
      <div className="thumb-line short" />
    </div>
  );
}

export function TemplatePicker() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-picker no-print" role="tablist" aria-label="Resume template">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={template === value}
          className={`template-picker-card ${template === value ? 'active' : ''}`}
          onClick={() => setTemplate(value)}
        >
          <div className="template-picker-thumb">
            {value === 'classic' && <ThumbnailClassic />}
            {value === 'modern' && <ThumbnailModern />}
            {value === 'minimal' && <ThumbnailMinimal />}
          </div>
          <span className="template-picker-label">{label}</span>
          {template === value && <span className="template-picker-check" aria-hidden>✓</span>}
        </button>
      ))}
    </div>
  );
}
