type FeatureCardProps = {
  title: string;
  description: string;
  icon: "upload" | "shield" | "check";
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
    <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-2xl text-[var(--color-white)] shadow-sm">
        {renderIcon()}
      </div>

      <h3 className="mb-4 text-xl font-semibold text-[var(--color-dark)] md:text-2xl">
        {title}
      </h3>

      <p className="text-base leading-7 text-[var(--color-primary)]/80">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
