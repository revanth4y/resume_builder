import { useState, KeyboardEvent } from 'react';
import './TechStackInput.css';

type Props = {
  techStack: string[];
  onChange: (techStack: string[]) => void;
};

export function TechStackInput({ techStack, onChange }: Props) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !techStack.includes(trimmed)) {
        onChange([...techStack, trimmed]);
        setInput('');
      }
    }
  };

  const remove = (item: string) => {
    onChange(techStack.filter((t) => t !== item));
  };

  return (
    <div className="tech-stack-input">
      <div className="tech-stack-chips">
        {techStack.map((t) => (
          <span key={t} className="tech-stack-chip">
            {t}
            <button type="button" className="tech-stack-remove" onClick={() => remove(t)} aria-label={`Remove ${t}`}>
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="tech-stack-field"
          placeholder="Tech stack (Enter to add)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
