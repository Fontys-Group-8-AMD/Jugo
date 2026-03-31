interface UploadedDashboardCardProps {
  uploadedImageUrl: string;
}

const UploadedDashboardCard = ({
  uploadedImageUrl,
}: UploadedDashboardCardProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] shadow-sm">
      <div className="border-b border-[var(--color-border)] px-6 py-4">
        <h2 className="text-lg font-semibold text-[var(--color-dark)]">
          Uploaded Dashboard
        </h2>
      </div>

      <div className="flex justify-center px-6 py-8">
        <img
          src={uploadedImageUrl}
          alt="Uploaded dashboard"
          className="max-h-[26rem] w-auto max-w-full rounded-xl border border-[var(--color-border)] object-contain shadow-sm"
        />
      </div>

      <div className="flex items-center gap-6 border-t border-[var(--color-border)] px-6 py-4 text-sm">
        <div className="flex items-center gap-2 text-red-500">
          <span className="h-3 w-3 rounded-full border border-current" />
          <span>Rule violation</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-500">
          <span className="h-3 w-3 rounded-full border border-current" />
          <span>Correct</span>
        </div>
      </div>
    </section>
  );
};

export default UploadedDashboardCard;
