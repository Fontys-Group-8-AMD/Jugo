import FeatureCard from "./FeatureCard";
import { features } from "../../data/features.ts";

const FeaturesSection = () => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-15 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
