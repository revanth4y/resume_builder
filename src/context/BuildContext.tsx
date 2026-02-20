import React, { createContext, useContext, useCallback, useState, useMemo } from 'react';
export type StepId = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

const STEP_KEYS: StepId[] = ['01', '02', '03', '04', '05', '06', '07', '08'];

const CHECKLIST_LENGTH = 10;

function artifactKey(step: StepId): string {
  return `rb_step_${step}_artifact`;
}

function isValidUrl(s: string): boolean {
  const t = (s || '').trim();
  if (!t) return false;
  try {
    const u = new URL(t);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

type ArtifactsState = Record<string, string>;

type BuildContextValue = {
  getArtifact: (step: StepId) => string;
  setArtifact: (step: StepId, value: string) => void;
  hasArtifact: (step: StepId) => boolean;
  stepIds: StepId[];
  proofLinks: { lovable: string; github: string; deploy: string };
  setProofLinks: (links: Partial<{ lovable: string; github: string; deploy: string }>) => void;
  checklist: boolean[];
  setChecklistItem: (index: number, value: boolean) => void;
  isShipped: boolean;
};

const BuildContext = createContext<BuildContextValue | null>(null);

function loadArtifacts(): ArtifactsState {
  try {
    const raw = localStorage.getItem('rb_artifacts');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveArtifacts(artifacts: ArtifactsState) {
  try {
    localStorage.setItem('rb_artifacts', JSON.stringify(artifacts));
  } catch {}
}

const RB_FINAL_SUBMISSION_KEY = 'rb_final_submission';
const RB_CHECKLIST_KEY = 'rb_checklist';

function loadProofLinks(): { lovable: string; github: string; deploy: string } {
  try {
    const raw = localStorage.getItem(RB_FINAL_SUBMISSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { lovable?: string; github?: string; deploy?: string };
      return {
        lovable: typeof parsed.lovable === 'string' ? parsed.lovable : '',
        github: typeof parsed.github === 'string' ? parsed.github : '',
        deploy: typeof parsed.deploy === 'string' ? parsed.deploy : '',
      };
    }
    const legacy = localStorage.getItem('rb_proof_links');
    if (legacy) {
      const parsed = JSON.parse(legacy) as { lovable?: string; github?: string; deploy?: string };
      return {
        lovable: typeof parsed.lovable === 'string' ? parsed.lovable : '',
        github: typeof parsed.github === 'string' ? parsed.github : '',
        deploy: typeof parsed.deploy === 'string' ? parsed.deploy : '',
      };
    }
  } catch {}
  return { lovable: '', github: '', deploy: '' };
}

function saveProofLinks(links: { lovable: string; github: string; deploy: string }) {
  try {
    localStorage.setItem(RB_FINAL_SUBMISSION_KEY, JSON.stringify(links));
  } catch {}
}

function loadChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(RB_CHECKLIST_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as unknown[];
      if (Array.isArray(arr) && arr.length === CHECKLIST_LENGTH)
        return arr.map((x) => x === true);
    }
  } catch {}
  return Array(CHECKLIST_LENGTH).fill(false);
}

function saveChecklist(list: boolean[]) {
  try {
    localStorage.setItem(RB_CHECKLIST_KEY, JSON.stringify(list));
  } catch {}
}

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [artifacts, setArtifactsState] = useState<ArtifactsState>(loadArtifacts);
  const [proofLinks, setProofLinksState] = useState(loadProofLinks);

  const setArtifact = useCallback((step: StepId, value: string) => {
    const key = artifactKey(step);
    setArtifactsState((prev) => {
      const next = { ...prev, [key]: value };
      saveArtifacts(next);
      return next;
    });
  }, []);

  const getArtifact = useCallback(
    (step: StepId) => artifacts[artifactKey(step)] ?? '',
    [artifacts]
  );

  const hasArtifact = useCallback(
    (step: StepId) => {
      const v = artifacts[artifactKey(step)];
      return typeof v === 'string' && v.trim().length > 0;
    },
    [artifacts]
  );

  const setProofLinks = useCallback(
    (partial: Partial<{ lovable: string; github: string; deploy: string }>) => {
      setProofLinksState((prev) => {
        const next = { ...prev, ...partial };
        saveProofLinks(next);
        return next;
      });
    },
    []
  );

  const [checklist, setChecklistState] = useState<boolean[]>(loadChecklist);

  const setChecklistItem = useCallback((index: number, value: boolean) => {
    if (index < 0 || index >= CHECKLIST_LENGTH) return;
    setChecklistState((prev) => {
      const next = [...prev];
      next[index] = value;
      saveChecklist(next);
      return next;
    });
  }, []);

  const allStepsComplete = useMemo(() => {
    return STEP_KEYS.every((id) => {
      const v = artifacts[artifactKey(id)];
      return typeof v === 'string' && v.trim().length > 0;
    });
  }, [artifacts]);

  const allChecklistPassed = useMemo(() => checklist.every(Boolean), [checklist]);

  const allProofLinksValid = useMemo(
    () =>
      isValidUrl(proofLinks.lovable) &&
      isValidUrl(proofLinks.github) &&
      isValidUrl(proofLinks.deploy),
    [proofLinks]
  );

  const isShipped = allStepsComplete && allChecklistPassed && allProofLinksValid;

  const value: BuildContextValue = {
    getArtifact,
    setArtifact,
    hasArtifact,
    stepIds: STEP_KEYS,
    proofLinks,
    setProofLinks,
    checklist,
    setChecklistItem,
    isShipped,
  };

  return (
    <BuildContext.Provider value={value}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const ctx = useContext(BuildContext);
  if (!ctx) throw new Error('useBuild must be used within BuildProvider');
  return ctx;
}
