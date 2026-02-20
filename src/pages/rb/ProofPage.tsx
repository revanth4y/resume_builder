import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { PremiumLayout } from '../../components/PremiumLayout';
import { useBuild } from '../../context/BuildContext';
import { RB_STEPS } from '../../config/rbSteps';

const CHECKLIST_LABELS = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work (copy / download)',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
];

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

export function ProofPage() {
  const {
    hasArtifact,
    proofLinks,
    setProofLinks,
    checklist,
    setChecklistItem,
    isShipped,
  } = useBuild();
  const [copied, setCopied] = useState(false);

  const lovableError =
    proofLinks.lovable.trim().length > 0 && !isValidUrl(proofLinks.lovable)
      ? 'Enter a valid URL (e.g. https://...)'
      : '';
  const githubError =
    proofLinks.github.trim().length > 0 && !isValidUrl(proofLinks.github)
      ? 'Enter a valid URL (e.g. https://github.com/...)'
      : '';
  const deployError =
    proofLinks.deploy.trim().length > 0 && !isValidUrl(proofLinks.deploy)
      ? 'Enter a valid URL (e.g. https://...)'
      : '';

  const buildFinalSubmission = useCallback(() => {
    const lovable = proofLinks.lovable.trim() || '(not set)';
    const github = proofLinks.github.trim() || '(not set)';
    const deploy = proofLinks.deploy.trim() || '(not set)';
    return [
      '------------------------------------------',
      'AI Resume Builder — Final Submission',
      '',
      'Lovable Project: ' + lovable,
      'GitHub Repository: ' + github,
      'Live Deployment: ' + deploy,
      '',
      'Core Capabilities:',
      '- Structured resume builder',
      '- Deterministic ATS scoring',
      '- Template switching',
      '- PDF export with clean formatting',
      '- Persistence + validation checklist',
      '------------------------------------------',
    ].join('\n');
  }, [proofLinks]);

  const handleCopyFinal = () => {
    navigator.clipboard.writeText(buildFinalSubmission()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <PremiumLayout
      stepId={null}
      contextHeader="Proof & Final Submission"
      showBuildPanel={false}
    >
      <div className="proof-page">
        {/* A) Step Completion Overview */}
        <section className="proof-section">
          <h2>Step Completion Overview</h2>
          <ul className="proof-step-list">
            {RB_STEPS.map((s) => (
              <li key={s.id} className={hasArtifact(s.id) ? 'done' : 'pending'}>
                Step {s.id} — {s.label}: {hasArtifact(s.id) ? 'Completed' : 'Pending'}
              </li>
            ))}
          </ul>
        </section>

        {/* B) Artifact Collection */}
        <section className="proof-section">
          <h2>Artifact Collection</h2>
          <p className="proof-hint">Required to mark Shipped. All links must be valid URLs.</p>
          <div className="proof-links">
            <label>
              Lovable Project Link
              <input
                type="url"
                value={proofLinks.lovable}
                onChange={(e) => setProofLinks({ lovable: e.target.value })}
                placeholder="https://..."
                className={lovableError ? 'invalid' : ''}
                aria-invalid={!!lovableError}
              />
              {lovableError && <span className="proof-error">{lovableError}</span>}
            </label>
            <label>
              GitHub Repository Link
              <input
                type="url"
                value={proofLinks.github}
                onChange={(e) => setProofLinks({ github: e.target.value })}
                placeholder="https://github.com/..."
                className={githubError ? 'invalid' : ''}
                aria-invalid={!!githubError}
              />
              {githubError && <span className="proof-error">{githubError}</span>}
            </label>
            <label>
              Deployed URL
              <input
                type="url"
                value={proofLinks.deploy}
                onChange={(e) => setProofLinks({ deploy: e.target.value })}
                placeholder="https://..."
                className={deployError ? 'invalid' : ''}
                aria-invalid={!!deployError}
              />
              {deployError && <span className="proof-error">{deployError}</span>}
            </label>
          </div>
        </section>

        {/* Checklist (10 tests) */}
        <section className="proof-section">
          <h2>Checklist — All 10 tests must pass</h2>
          <ul className="proof-checklist">
            {CHECKLIST_LABELS.map((label, i) => (
              <li key={i}>
                <label>
                  <input
                    type="checkbox"
                    checked={checklist[i]}
                    onChange={(e) => setChecklistItem(i, e.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Final Submission Export */}
        <section className="proof-section">
          <h2>Final Submission Export</h2>
          <button type="button" className="btn btn-primary" onClick={handleCopyFinal}>
            {copied ? 'Copied!' : 'Copy Final Submission'}
          </button>
        </section>

        {/* Completion message when shipped */}
        {isShipped && (
          <section className="proof-section proof-shipped-message" aria-live="polite">
            <p className="proof-shipped-text">Project 3 Shipped Successfully.</p>
          </section>
        )}

        <p className="proof-back">
          <Link to="/rb/01-problem">Back to Step 1</Link>
        </p>
      </div>
    </PremiumLayout>
  );
}
