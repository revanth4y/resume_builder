import { useResume } from '../context/ResumeContext';
import { useTemplate } from '../context/TemplateContext';
import { ResumePreviewShell } from '../components/ResumePreviewShell';
import { TemplatePicker } from '../components/TemplatePicker';
import { ColorThemePicker } from '../components/ColorThemePicker';
import { PreviewExportBar } from '../components/PreviewExportBar';
import { AtsScoreCircle } from '../components/AtsScoreCircle';
import './PreviewPage.css';

export function PreviewPage() {
  const { resume } = useResume();
  const { template, accentColor } = useTemplate();

  return (
    <div className="preview-page">
      <PreviewExportBar />
      <div className="preview-page-layout">
        <aside className="preview-page-sidebar no-print">
          <AtsScoreCircle resume={resume} />
          <TemplatePicker />
          <ColorThemePicker />
        </aside>
        <div className="resume-print-area">
          <ResumePreviewShell resume={resume} minimal template={template} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
