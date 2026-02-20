import { Link } from 'react-router-dom';
import { ProofFooter } from './ProofFooter';
import { BuildPanel } from './BuildPanel';
import type { StepId } from '../context/BuildContext';
import { useBuild } from '../context/BuildContext';
import { RB_STEPS, getStepNumber } from '../config/rbSteps';

type PremiumLayoutProps = {
  /** Step id for step pages (01–08); null for proof or non-step pages */
  stepId: StepId | null;
  /** Context line below top bar, e.g. "Step 1 — Problem" */
  contextHeader: string;
  /** Main content (70% area) */
  children: React.ReactNode;
  /** For step pages: show build panel and proof footer */
  showBuildPanel?: boolean;
};

export function PremiumLayout({
  stepId,
  contextHeader,
  children,
  showBuildPanel = true,
}: PremiumLayoutProps) {
  const { hasArtifact, isShipped } = useBuild();
  const stepNum = stepId ? getStepNumber(stepId) : 0;
  const isStepPage = stepId != null && stepNum >= 1 && stepNum <= 8;
  const canProceed = !isStepPage || hasArtifact(stepId!);
  const nextStep = isStepPage && stepNum < 8 ? RB_STEPS[stepNum] : null;
  const isProofPage = stepId == null && !showBuildPanel;
  const statusLabel = isStepPage
    ? canProceed
      ? 'Ready'
      : 'Upload artifact to continue'
    : isProofPage
      ? isShipped
        ? 'Shipped'
        : 'In Progress'
      : '';

  return (
    <div className="premium-layout">
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <Link to="/rb/01-problem" className="top-bar-title">
            AI Resume Builder
          </Link>
        </div>
        <div className="top-bar-center">
          {isStepPage ? `Project 3 — Step ${stepNum} of 8` : 'Project 3 — Proof'}
        </div>
        <div className="top-bar-right">
          {statusLabel && (
            <span
              className={`status-badge ${
                isProofPage
                  ? isShipped
                    ? 'status-shipped'
                    : 'status-pending'
                  : canProceed
                    ? 'status-ready'
                    : 'status-pending'
              }`}
            >
              {statusLabel}
            </span>
          )}
        </div>
      </header>

      {/* Context header */}
      <div className="context-header">
        {contextHeader}
      </div>

      {/* Main + Build panel row */}
      <div className={`workspace-row ${showBuildPanel && stepId ? 'with-panel' : 'no-panel'}`}>
        <main className="main-workspace">
          {children}
          {isStepPage && nextStep && (
            <div className="step-nav">
              <Link
                to={`/rb/${nextStep.path}`}
                className={`btn btn-next ${canProceed ? '' : 'disabled'}`}
                aria-disabled={!canProceed}
                onClick={(e) => !canProceed && e.preventDefault()}
              >
                Next: {nextStep.label}
              </Link>
            </div>
          )}
        </main>
        {showBuildPanel && stepId && (
          <aside className="build-panel-wrap">
            <BuildPanel stepId={stepId} />
          </aside>
        )}
      </div>

      {/* Proof footer */}
      {showBuildPanel && <ProofFooter />}
    </div>
  );
}
