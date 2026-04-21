import { Link, useLocation } from "react-router-dom";
import AnalysisStatusCard from "../components/results/AnalysisStatusCard";
import ComplianceScoreCard from "../components/results/ComplianceScoreCard";
import CorrectNotationCard from "../components/results/CorrectNotationCard";
import ExportReportButton from "../components/results/ExportReportButton";
// import IssuesDetectedCard from "../components/results/IssuesDetectedCard";
import ResultsHeader from "../components/results/ResultsHeader";
import SuggestedImprovementsCard from "../components/results/SuggestedImprovementsCard";
import UploadedDashboardCard from "../components/results/UploadedDashboardCard";
import type { ResultsNavigationState } from "../types/analysisResult";

const ResultsPage = () => {
  const location = useLocation();
  const navigationState = location.state as ResultsNavigationState | null;

  if (!navigationState) {
    return (
      <section className="flex flex-1 items-center justify-center bg-[var(--color-background)] px-6 py-12">
        <div className="w-full max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-white)] p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-[var(--color-dark)] md:text-4xl">
            No analysis available yet
          </h1>

          <p className="mt-4 text-base leading-8 text-[var(--color-primary)]/80">
            Upload a dashboard and run an AI analysis first to see compliance
            results here.
          </p>

          <Link
            to="/analyze"
            className="mt-8 inline-flex rounded-xl bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
          >
            Go to Analyze
          </Link>
        </div>
      </section>
    );
  }

  const { analysisResult } = navigationState;

  return (
    <section className="bg-[var(--color-background)] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <ResultsHeader />

        <div className="grid gap-10 xl:grid-cols-[1.7fr_1fr] xl:items-start">
          <div className="space-y-8">
            <UploadedDashboardCard
              uploadedImageUrl={analysisResult.uploadedImageUrl}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <ComplianceScoreCard score={analysisResult.score} />
              <AnalysisStatusCard
                status={analysisResult.status}
                scenarioChecks={analysisResult.scenarioChecks}
              />
            </div>

            {/* <IssuesDetectedCard issues={analysisResult.issues} /> */}
          </div>

          <div className="space-y-6">
            <SuggestedImprovementsCard
              suggestions={analysisResult.suggestions}
            />
            <CorrectNotationCard />
            <ExportReportButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
