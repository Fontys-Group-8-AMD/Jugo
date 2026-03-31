import FeatureCard from "./FeatureCard";
import { features } from "../../data/features";

const FeaturesSection = () => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-dark)] md:text-4xl">
            Powerful Tools for Dashboard Validation
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-primary)]/80">
            Analyze dashboards against IBCS principles and receive meaningful
            feedback to improve scenario communication and visual consistency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
