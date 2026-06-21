interface UploadedDashboardCardProps {
  uploadedImageUrl: string;
}

const UploadedDashboardCard = ({
  uploadedImageUrl,
}: UploadedDashboardCardProps) => {
  return (
    <section className="rounded-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-white)] shadow-sm">
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
    </section>
  );
};

export default UploadedDashboardCard;
