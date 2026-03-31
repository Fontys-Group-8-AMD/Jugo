import AnalyzeActions from "../components/analyze/AnalyzeActions";
import AnalyzeHeader from "../components/analyze/AnalyzeHeader";
import RuleInfoCard from "../components/analyze/RuleInfoCard";
import UploadZone from "../components/analyze/UploadZone";

const AnalyzePage = () => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <AnalyzeHeader />

        <div className="grid gap-10 xl:grid-cols-[1.55fr_1fr] xl:items-start">
          <div>
            <UploadZone />
            <AnalyzeActions />
          </div>

          <RuleInfoCard />
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;
