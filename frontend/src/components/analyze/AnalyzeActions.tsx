import { ArrowRight, Upload } from "lucide-react";

interface AnalyzeActionsProps {
  onUploadClick: () => void;
  onAnalyzeClick: () => void;
  isAnalyzeDisabled: boolean;
}

const AnalyzeActions = ({
  onUploadClick,
  onAnalyzeClick,
  isAnalyzeDisabled,
}: AnalyzeActionsProps) => {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <button
        type="button"
        onClick={onUploadClick}
        className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] px-6 py-4 text-base font-semibold text-[var(--color-dark)] transition hover:bg-[var(--color-background)]"
      >
        <Upload size={18} strokeWidth={2} />
        Upload Visualization
      </button>

      <button
        type="button"
        onClick={onAnalyzeClick}
        disabled={isAnalyzeDisabled}
        className="inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Run AI Analysis
        <ArrowRight size={18} strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default AnalyzeActions;
