import { useState, useRef, KeyboardEvent } from 'react';
import './SkillTagInput.css';

type Props = {
  label: string;
  count: number;
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
};

export function SkillTagInput({ label, count, skills, onAdd, onRemove }: Props) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed) {
        onAdd(trimmed);
        setInput('');
      }
    }
  };

  return (
    <div className="skill-tag-group">
      <h3 className="skill-tag-label">
        {label} ({count})
      </h3>
      <div className="skill-tag-chips">
        {skills.map((s) => (
          <span key={s} className="skill-tag-chip">
            {s}
            <button
              type="button"
              className="skill-tag-remove"
              onClick={() => onRemove(s)}
              aria-label={`Remove ${s}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="skill-tag-input"
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
