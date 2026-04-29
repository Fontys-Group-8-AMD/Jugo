import { Link, useLocation } from "react-router-dom";
import AnalysisStatusCard from "../components/results/AnalysisStatusCard";
import ComplianceScoreCard from "../components/results/ComplianceScoreCard";
import ExportReportButton from "../components/results/ExportReportButton";
import ResultsHeader from "../components/results/ResultsHeader";
import SuggestedImprovementsCard from "../components/results/SuggestedImprovementsCard";
import UploadedDashboardCard from "../components/results/UploadedDashboardCard";
import type { ResultsNavigationState } from "../types/analysisResult";

const ResultsPage = () => {
  const location = useLocation();
  const navigationState = location.state as ResultsNavigationState | null;

  if (!navigationState) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
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
    <section className="min-h-screen bg-[var(--color-background)] px-5 py-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <ResultsHeader />

        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.9fr] xl:items-start">
          <UploadedDashboardCard
            uploadedImageUrl={analysisResult.uploadedImageUrl}
          />

          <aside className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <ComplianceScoreCard score={analysisResult.score} />

              <AnalysisStatusCard
                status={analysisResult.status}
                scenarioChecks={analysisResult.scenarioChecks}
              />
            </div>

            <SuggestedImprovementsCard
              suggestions={analysisResult.suggestions}
            />

            <ExportReportButton />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
