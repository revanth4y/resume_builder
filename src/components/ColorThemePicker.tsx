import { useTemplate } from '../context/TemplateContext';
import type { AccentTheme } from '../context/TemplateContext';
import { ACCENT_HSL } from '../context/TemplateContext';
import './ColorThemePicker.css';

const THEMES: { value: AccentTheme; label: string }[] = [
  { value: 'teal', label: 'Teal' },
  { value: 'navy', label: 'Navy' },
  { value: 'burgundy', label: 'Burgundy' },
  { value: 'forest', label: 'Forest' },
  { value: 'charcoal', label: 'Charcoal' },
];

export function ColorThemePicker() {
  const { accentTheme, setAccentTheme } = useTemplate();

  return (
    <div className="color-theme-picker no-print" role="radiogroup" aria-label="Resume accent color">
      <span className="color-theme-picker-label">Accent</span>
      <div className="color-theme-picker-circles">
        {THEMES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={accentTheme === value}
            aria-label={label}
            className={`color-theme-circle ${accentTheme === value ? 'active' : ''}`}
            style={{ background: ACCENT_HSL[value] }}
            onClick={() => setAccentTheme(value)}
          />
        ))}
      </div>
    </div>
  );
}
