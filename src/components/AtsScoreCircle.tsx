import { computeAtsScore, getAtsScoreBand, ATS_BAND_LABELS, getAtsImprovementSuggestions } from '../utils/atsScore';
import type { ResumeData } from '../types/resume';
import './AtsScoreCircle.css';

const RADIUS = 44;
const STROKE = 8;
const circumference = 2 * Math.PI * RADIUS;

export function AtsScoreCircle({ resume }: { resume: ResumeData }) {
  const score = computeAtsScore(resume);
  const band = getAtsScoreBand(score);
  const suggestions = getAtsImprovementSuggestions(resume);
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="ats-circle-block no-print">
      <p className="ats-circle-label">ATS Resume Score</p>
      <div className="ats-circle-wrap">
        <svg className="ats-circle-svg" viewBox="0 0 100 100" aria-hidden>
          <circle
            className="ats-circle-bg"
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
          />
          <circle
            className={`ats-circle-fill ats-circle-fill--${band}`}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="ats-circle-value">{score}</div>
      </div>
      <p className={`ats-circle-band ats-circle-band--${band}`}>
        {ATS_BAND_LABELS[band]}
      </p>
      {suggestions.length > 0 && (
        <ul className="ats-circle-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
