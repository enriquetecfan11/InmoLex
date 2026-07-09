import Link from "next/link";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className={`service-card group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-7 ${
        service.featured
          ? "border-accent/35 bg-accent/[0.08] hover:border-accent/50 hover:bg-accent/[0.12]"
          : "border-accent/15 bg-accent/[0.04] hover:border-accent/30 hover:bg-accent/[0.07]"
      }`}
    >
      <h3 className="font-display text-xl tracking-tight text-white sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
        {service.description}
      </p>
      <Link
        href={service.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-light"
      >
        {service.cta}
        <ArrowIcon />
      </Link>
    </article>
  );
}
