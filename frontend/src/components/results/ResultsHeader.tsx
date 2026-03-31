import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResultsHeader = () => {
  return (
    <div className="mb-10">
      <Link
        to="/analyze"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-dark)]"
      >
        <ArrowLeft size={18} strokeWidth={2} />
        Back to Analyze
      </Link>

      <h1 className="text-3xl font-bold text-[var(--color-dark)] md:text-4xl">
        Analysis Results
      </h1>

      <p className="mt-3 text-base text-[var(--color-primary)]/80 md:text-lg">
        IBCS UN 3.2 Compliance Report
      </p>
    </div>
  );
};

export default ResultsHeader;
