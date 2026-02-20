import type { StepId } from '../context/BuildContext';

export const RB_STEPS: { id: StepId; path: string; label: string }[] = [
  { id: '01', path: '01-problem', label: 'Problem' },
  { id: '02', path: '02-market', label: 'Market' },
  { id: '03', path: '03-architecture', label: 'Architecture' },
  { id: '04', path: '04-hld', label: 'HLD' },
  { id: '05', path: '05-lld', label: 'LLD' },
  { id: '06', path: '06-build', label: 'Build' },
  { id: '07', path: '07-test', label: 'Test' },
  { id: '08', path: '08-ship', label: 'Ship' },
];

export function getStepIndex(stepId: StepId): number {
  return RB_STEPS.findIndex((s) => s.id === stepId);
}

export function getStepByPath(pathSegment: string) {
  return RB_STEPS.find((s) => s.path === pathSegment);
}

export function getStepNumber(stepId: StepId): number {
  return getStepIndex(stepId) + 1;
}
