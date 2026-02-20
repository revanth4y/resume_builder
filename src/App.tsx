import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './pages/HomePage';
import { BuilderPage } from './pages/BuilderPage';
import { PreviewPage } from './pages/PreviewPage';
import { StepPage } from './pages/rb/StepPage';
import { ProofPage } from './pages/rb/ProofPage';
import './components/PremiumLayout.css';
import './components/AppLayout.css';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/proof" element={<Navigate to="/rb/proof" replace />} />
      </Route>
      <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
      <Route path="/rb/proof" element={<ProofPage />} />
      <Route path="/rb/:stepPath" element={<StepPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
