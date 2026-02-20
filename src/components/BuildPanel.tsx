import { useState, useEffect } from 'react';
import type { StepId } from '../context/BuildContext';
import { useBuild } from '../context/BuildContext';
import { getStepNumber } from '../config/rbSteps';

const LOVABLE_URL = 'https://lovable.dev';

type FeedbackStatus = 'none' | 'worked' | 'error' | 'screenshot';

export function BuildPanel({ stepId }: { stepId: StepId }) {
  const { getArtifact, setArtifact } = useBuild();
  const [copyText, setCopyText] = useState(() => getArtifact(stepId));

  useEffect(() => {
    setCopyText(getArtifact(stepId));
  }, [stepId]);
  const [feedback, setFeedback] = useState<FeedbackStatus>('none');
  const stepNum = getStepNumber(stepId);

  const handleCopyToClipboard = () => {
    const text = copyText.trim() || getArtifact(stepId);
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        // optional: brief "Copied!" toast
      });
    }
  };

  const handleLovableBuild = () => {
    window.open(LOVABLE_URL, '_blank');
  };

  return (
    <div className="build-panel">
      <div className="build-panel-section">
        <label className="build-panel-label">Copy This Into Lovable</label>
        <textarea
          className="build-panel-textarea"
          placeholder={`Paste or type content for Step ${stepNum}...`}
          value={copyText}
          onChange={(e) => {
            const v = e.target.value;
            setCopyText(v);
            if (v.trim()) setArtifact(stepId, v.trim());
          }}
          rows={8}
        />
      </div>
      <div className="build-panel-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCopyToClipboard}>
          Copy
        </button>
        <button type="button" className="btn btn-primary" onClick={handleLovableBuild}>
          Build in Lovable
        </button>
      </div>
      <div className="build-panel-feedback">
        <span className="build-panel-feedback-label">Result:</span>
        <div className="build-panel-feedback-btns">
          <button
            type="button"
            className={`btn btn-feedback ${feedback === 'worked' ? 'active' : ''}`}
            onClick={() => setFeedback('worked')}
          >
            It Worked
          </button>
          <button
            type="button"
            className={`btn btn-feedback ${feedback === 'error' ? 'active' : ''}`}
            onClick={() => setFeedback('error')}
          >
            Error
          </button>
          <button
            type="button"
            className={`btn btn-feedback ${feedback === 'screenshot' ? 'active' : ''}`}
            onClick={() => setFeedback('screenshot')}
          >
            Add Screenshot
          </button>
        </div>
      </div>
    </div>
  );
}
