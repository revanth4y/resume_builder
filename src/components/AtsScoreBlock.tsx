import { computeAtsScore, getAtsImprovementSuggestions } from '../utils/atsScore';
import type { ResumeData } from '../types/resume';
import './AtsScoreBlock.css';

export function AtsScoreBlock({ resume }: { resume: ResumeData }) {
  const score = computeAtsScore(resume);
  const suggestions = getAtsImprovementSuggestions(resume);

  return (
    <div className="ats-block">
      <p className="ats-label">ATS Resume Score</p>
      <div className="ats-meter-wrap">
        <div className="ats-meter-bar" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
          <div className="ats-meter-fill" style={{ width: `${score}%` }} />
        </div>
        <span className="ats-score-value">{score}</span>
      </div>
      <div className="ats-improvements">
        <p className="ats-improvements-title">Improvements</p>
        {suggestions.length > 0 ? (
          <ul className="ats-improvements-list">
            {suggestions.slice(0, 6).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="ats-improvements-none">No improvements needed in these areas.</p>
        )}
      </div>
    </div>
  );
}
