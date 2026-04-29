interface UploadedDashboardCardProps {
  uploadedImageUrl: string;
}

const UploadedDashboardCard = ({
  uploadedImageUrl,
}: UploadedDashboardCardProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] shadow-sm">
      <div className="border-b border-[var(--color-border)] px-5 py-3">
        <h2 className="text-base font-semibold text-[var(--color-dark)]">
          Uploaded Dashboard
        </h2>
      </div>

      <div className="flex justify-center px-5 py-5">
        <img
          src={uploadedImageUrl}
          alt="Uploaded dashboard"
          className="max-h-[24rem] w-auto max-w-full rounded-xl border border-[var(--color-border)] object-contain shadow-sm"
        />
      </div>

      <div className="flex items-center gap-5 border-t border-[var(--color-border)] px-5 py-3 text-xs">
        <div className="flex items-center gap-2 text-red-500">
          <span className="h-2.5 w-2.5 rounded-full border border-current" />
          <span>Rule violation</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-500">
          <span className="h-2.5 w-2.5 rounded-full border border-current" />
          <span>Correct</span>
        </div>
      </div>
    </section>
  );
};

export default UploadedDashboardCard;
