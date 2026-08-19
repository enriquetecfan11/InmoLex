"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Property } from "@/lib/properties";

interface PropertyVideosProps {
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

export function PropertyVideos({ property }: PropertyVideosProps) {
  const t = useTranslations("properties.videos");
  if (!property.videos?.length) return null;

  return (
    <RevealOnScroll>
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
        {t("lead")}
      </p>
      <div className="mt-8 space-y-5">
        {property.videos.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className="property-video-frame overflow-hidden rounded-2xl border border-accent/15 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.5)] ring-1 ring-accent/10"
          >
            <div className="relative aspect-video bg-brand-dark">
              <iframe
                src={url}
                title={`Vídeo ${idx + 1} - ${property.title}`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </RevealOnScroll>
  );
}
