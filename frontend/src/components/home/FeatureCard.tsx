type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const renderIcon = () => {
    switch (icon) {
      case "upload":
        return "↑";
      case "shield":
        return "🛡";
      case "check":
        return "✓";
      default:
        return "•";
    }
  };

  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-background)] text-xl text-[var(--color-primary)]">
        {renderIcon()}
      </div>

      <h3 className="mb-4 text-2xl font-semibold text-[var(--color-dark)]">
        {title}
      </h3>

      <p className="text-base leading-8 text-[var(--color-primary)]/80">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
