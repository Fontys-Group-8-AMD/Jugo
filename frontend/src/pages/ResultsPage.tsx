import ResultsHeader from "../components/results/ResultsHeader";
import UploadedDashboardCard from "../components/results/UploadedDashboardCard";
import ComplianceScoreCard from "../components/results/ComplianceScoreCard";
import AnalysisStatusCard from "../components/results/AnalysisStatusCard";
import SuggestedImprovementsCard from "../components/results/SuggestedImprovementsCard";
import CorrectNotationCard from "../components/results/CorrectNotationCard";
import IssuesDetectedCard from "../components/results/IssuesDetectedCard";
import ExportReportButton from "../components/results/ExportReportButton";
import { mockAnalysisResult } from "../data/mockAnalysisResult";

const ResultsPage = () => {
  const result = mockAnalysisResult;

  return (
    <section className="bg-[var(--color-background)] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <ResultsHeader />

        <div className="grid gap-10 xl:grid-cols-[1.7fr_1fr] xl:items-start">
          <div className="space-y-8">
            <UploadedDashboardCard uploadedImageUrl={result.uploadedImageUrl} />

            <div className="grid gap-6 md:grid-cols-2">
              <ComplianceScoreCard score={result.score} />

              <AnalysisStatusCard
                status={result.status}
                scenarioChecks={result.scenarioChecks}
              />
            </div>

            <IssuesDetectedCard issues={result.issues} />
          </div>
          <div className="space-y-6">
            <SuggestedImprovementsCard suggestions={result.suggestions} />
            <CorrectNotationCard />
            <ExportReportButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
