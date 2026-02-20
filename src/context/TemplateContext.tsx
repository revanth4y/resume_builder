import { createContext, useContext, useCallback, useState, useEffect } from 'react';

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

export type AccentTheme = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal';

const STORAGE_KEY = 'resumeBuilderTheme';

const ACCENT_HSL: Record<AccentTheme, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)',
};

function loadStored(): { template: ResumeTemplate; accent: AccentTheme } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { template?: string; accent?: string };
      const template =
        parsed.template === 'classic' || parsed.template === 'modern' || parsed.template === 'minimal'
          ? parsed.template
          : 'classic';
      const accent =
        parsed.accent === 'teal' || parsed.accent === 'navy' || parsed.accent === 'burgundy' || parsed.accent === 'forest' || parsed.accent === 'charcoal'
          ? parsed.accent
          : 'teal';
      return { template, accent };
    }
    const legacyTemplate = localStorage.getItem('resumeBuilderTemplate');
    if (legacyTemplate === 'classic' || legacyTemplate === 'modern' || legacyTemplate === 'minimal') {
      return { template: legacyTemplate, accent: 'teal' };
    }
  } catch {}
  return { template: 'classic', accent: 'teal' };
}

type TemplateContextValue = {
  template: ResumeTemplate;
  setTemplate: (t: ResumeTemplate) => void;
  accentTheme: AccentTheme;
  setAccentTheme: (a: AccentTheme) => void;
  accentColor: string;
};

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(loadStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ template: state.template, accent: state.accent }));
    } catch {}
  }, [state.template, state.accent]);

  const setTemplate = useCallback((t: ResumeTemplate) => {
    setState((prev) => ({ ...prev, template: t }));
  }, []);

  const setAccentTheme = useCallback((accent: AccentTheme) => {
    setState((prev) => ({ ...prev, accent }));
  }, []);

  const value: TemplateContextValue = {
    template: state.template,
    setTemplate,
    accentTheme: state.accent,
    setAccentTheme,
    accentColor: ACCENT_HSL[state.accent],
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}

export { ACCENT_HSL };
