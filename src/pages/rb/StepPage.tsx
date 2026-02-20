import { useParams, Navigate } from 'react-router-dom';
import { PremiumLayout } from '../../components/PremiumLayout';
import { RB_STEPS, getStepByPath, getStepNumber } from '../../config/rbSteps';
import type { StepId } from '../../context/BuildContext';

export function StepPage() {
  const { stepPath } = useParams<{ stepPath: string }>();
  const step = stepPath ? getStepByPath(stepPath) : null;

  if (!step) {
    const first = RB_STEPS[0];
    return <Navigate to={`/rb/${first.path}`} replace />;
  }

  const stepNum = getStepNumber(step.id);
  const contextHeader = `Step ${stepNum} — ${step.label}`;

  return (
    <PremiumLayout
      stepId={step.id as StepId}
      contextHeader={contextHeader}
      showBuildPanel={true}
    >
      <p className="step-placeholder">
        Step {stepNum}: {step.label}. Use the build panel on the right to add your artifact.
      </p>
    </PremiumLayout>
  );
}
