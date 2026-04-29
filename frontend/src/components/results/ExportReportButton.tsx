import { Download } from "lucide-react";

const ExportReportButton = () => {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center rounded-md gap-2 bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-white)] transition hover:opacity-90"
    >
      <Download size={16} strokeWidth={2} />
      Export Report
    </button>
  );
};

export default ExportReportButton;
