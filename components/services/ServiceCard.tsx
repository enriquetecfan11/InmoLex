import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceMenuIconGlyph } from "@/components/home/ServiceMenuIcon";
import { SERVICE_ICONS, type Service } from "@/lib/services";
import type { ServiceItemId } from "@/lib/i18n-message-keys";

interface ServiceCardProps {
  service: Service;
  layout?: "default" | "wide";
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="service-preview-card__arrow"
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

function isEmphasized(service: Service) {
  return service.featured || service.id === "deuda" || service.id === "inversores";
}

export function ServiceCard({ service, layout = "default" }: ServiceCardProps) {
  const t = useTranslations("services.items");
  const serviceId = service.id as ServiceItemId;
  const icon = SERVICE_ICONS[service.id];
  const emphasized = isEmphasized(service);
  const wide = layout === "wide";

  return (
    <Link
      href={service.href}
      className={`service-preview-card group relative flex h-full overflow-hidden rounded-2xl border backdrop-blur-sm ${
        wide
          ? "flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:gap-8 md:p-7"
          : "flex-col p-5 sm:px-5 sm:py-5"
      } ${
        emphasized
          ? "border-accent/28 bg-accent/[0.07]"
          : "border-accent/15 bg-accent/[0.04]"
      }`}
    >
      {wide ? (
        <span
          className="pointer-events-none absolute -bottom-8 -right-6 text-accent opacity-[0.07] md:-right-4 md:bottom-auto md:top-1/2 md:h-40 md:w-40 md:-translate-y-1/2"
          aria-hidden
        >
          {icon ? <ServiceMenuIconGlyph icon={icon} size={160} /> : null}
        </span>
      ) : null}

      {icon ? (
        <span
          className={`service-preview-card__icon relative flex shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent ${
            wide ? "h-12 w-12 md:h-14 md:w-14" : "h-10 w-10"
          }`}
        >
          <ServiceMenuIconGlyph icon={icon} size={wide ? 26 : 22} />
        </span>
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col">
        {emphasized && !wide ? (
          <span className="mb-2 block h-px w-8 bg-accent/50" aria-hidden />
        ) : null}

        <h3
          className={`font-display tracking-tight text-white ${
            wide
              ? "text-2xl sm:text-3xl"
              : "text-xl sm:text-[1.35rem]"
          }`}
        >
          {t(`${serviceId}.title`)}
        </h3>
        <p
          className={`mt-2 flex-1 text-sm leading-relaxed text-white/70 ${
            wide ? "max-w-xl sm:text-[0.95rem]" : ""
          }`}
        >
          {t(`${serviceId}.description`)}
        </p>
        <span className="service-preview-card__cta mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {t(`${serviceId}.cta`)}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
