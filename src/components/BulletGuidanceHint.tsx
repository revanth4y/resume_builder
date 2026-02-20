import { getBulletGuidance } from '../utils/bulletGuidance';
import './BulletGuidanceHint.css';

export function BulletGuidanceHint({ details }: { details: string | undefined }) {
  const { needsActionVerb, needsNumber } = getBulletGuidance(details);
  if (!needsActionVerb && !needsNumber) return null;

  return (
    <div className="bullet-guidance" role="status" aria-live="polite">
      {needsActionVerb && <span className="bullet-guidance-item">Start with a strong action verb.</span>}
      {needsActionVerb && needsNumber && ' '}
      {needsNumber && <span className="bullet-guidance-item">Add measurable impact (numbers).</span>}
    </div>
  );
}
