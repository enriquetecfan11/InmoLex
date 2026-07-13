"use client";

import { useState } from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Property } from "@/lib/properties";

interface PropertyFloorPlansProps {
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

function PlanPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center rounded-xl border border-dashed border-accent/20 bg-accent/[0.02] px-6 text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="text-accent/50"
      >
        <rect x="5" y="8" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 14h22M11 8v18M21 8v18" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <p className="mt-4 text-sm font-medium text-white/55">{label}</p>
      <p className="mt-1 text-xs text-white/35">Plano próximamente</p>
    </div>
  );
}

interface PlanCardProps {
  label: string;
  src?: string;
  title: string;
}

function PlanCard({ label, src, title }: PlanCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!src) {
    return (
      <div className="property-plan-card rounded-2xl border border-accent/12 p-4">
        <p className="text-sm font-semibold text-white/80">{label}</p>
        <div className="mt-3">
          <PlanPlaceholder label={label} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="property-plan-card group rounded-2xl border border-accent/12 p-4 transition-colors hover:border-accent/25">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white/80">{label}</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Ampliar
          </button>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-3 block w-full overflow-hidden rounded-xl ring-1 ring-accent/15 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          aria-label={`Ampliar ${label}`}
        >
          <div className="relative aspect-[16/10] bg-brand-dark">
            <Image
              src={src}
              alt={`${title} - ${label}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </button>
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-0 rounded-full bg-black/50 p-2 text-white/80 ring-1 ring-white/10 transition hover:text-white"
              aria-label="Cerrar plano"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4.5 4.5 13.5 13.5M13.5 4.5 4.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <div className="relative overflow-hidden rounded-2xl bg-brand-dark ring-1 ring-accent/20">
              <div className="relative aspect-[16/10]">
                <Image
                  src={src}
                  alt={`${title} - ${label}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PropertyFloorPlans({ property }: PropertyFloorPlansProps) {
  const plans = [
    { label: "Plano 2D", src: property.plan2d },
    { label: "Plano 3D", src: property.plan3d },
  ].filter((plan) => Boolean(plan.src));

  if (plans.length === 0) {
    return null;
  }

  return (
    <RevealOnScroll>
      <SectionHeading>Planos</SectionHeading>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.label}
            label={plan.label}
            src={plan.src}
            title={property.title}
          />
        ))}
      </div>
    </RevealOnScroll>
  );
}
