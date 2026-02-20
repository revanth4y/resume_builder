import { Link } from 'react-router-dom';

export function ProofFooter() {
  return (
    <footer className="proof-footer">
      <Link to="/rb/proof" className="proof-footer-link">
        Proof &amp; Final Submission
      </Link>
    </footer>
  );
}
