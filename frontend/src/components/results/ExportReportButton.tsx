import { Download } from "lucide-react";

const ExportReportButton = () => {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
    >
      <Download size={18} strokeWidth={2} />
      Export Report
    </button>
  );
};

export default ExportReportButton;
