import { Upload, ShieldCheck, CheckCircle } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: "upload" | "shield" | "check";
};

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const renderIcon = () => {
    switch (icon) {
      case "upload":
        return <Upload size={24} strokeWidth={2} />;
      case "shield":
        return <ShieldCheck size={24} strokeWidth={2} />;
      case "check":
        return <CheckCircle size={24} strokeWidth={2} />;
      default:
        return null;
    }
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-background)] text-[var(--color-primary)]">
        {renderIcon()}
      </div>

      <h3 className="mb-3 text-2xl font-semibold text-[var(--color-dark)]">
        {title}
      </h3>

      <p className="text-base leading-8 text-[var(--color-primary)]/80">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
