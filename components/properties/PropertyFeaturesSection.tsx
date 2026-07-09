import { getPropertyFeatureGroups } from "@/lib/property-features";
import type { Property } from "@/lib/properties";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface PropertyFeaturesSectionProps {
  property: Property;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="property-section-heading">
      <h2 className="font-display text-2xl text-accent sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" aria-hidden />
    </div>
  );
}

export function PropertyFeaturesSection({ property }: PropertyFeaturesSectionProps) {
  const groups = getPropertyFeatureGroups(property);

  return (
    <RevealOnScroll>
      <SectionHeading>Características</SectionHeading>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="property-feature-group rounded-2xl border border-accent/12 bg-gradient-to-br from-accent/[0.04] to-transparent p-5 transition-colors hover:border-accent/22"
          >
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </RevealOnScroll>
  );
}
