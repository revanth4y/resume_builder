import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-headline">Build a Resume That Gets Read.</h1>
      <p className="home-sub">Create a clear, professional resume. Edit in the builder and preview anytime.</p>
      <Link to="/builder" className="home-cta">
        Start Building
      </Link>
    </div>
  );
}
