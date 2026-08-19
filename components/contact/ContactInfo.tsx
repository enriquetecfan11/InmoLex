import { useTranslations } from "next-intl";
import { CONTACT_INFO, TRUST_SIGNALS } from "@/lib/contact";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.5 3.5h2.2l1.1 2.7-1.4 1.1a11.5 11.5 0 0 0 5.4 5.4l1.1-1.4 2.7 1.1v2.2a1.5 1.5 0 0 1-1.5 1.5C8.2 16.1 3.9 11.8 3.9 6.5a1.5 1.5 0 0 1 1.6-1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m3 6 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 17s5.5-4.2 5.5-8.5a5.5 5.5 0 1 0-11 0C4.5 12.8 10 17 10 17Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 6.5V10l2.5 2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1.5a8 8 0 0 0-6.9 12.1L1.5 18.5l5.1-1.5A8 8 0 1 0 10 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 7.8c.2-.6.4-.6.8-.6h.7c.2 0 .5.1.6.5l.9 2.1c.1.3 0 .6-.2.8l-.6.6c-.2.2-.2.5 0 .8.6.9 1.5 1.7 2.4 2.4.3.2.6.2.8 0l.6-.6c.2-.2.5-.3.8-.2l2.1.9c.3.1.5.3.5.6v.7c0 .3 0 .6-.6.8-1 .5-2.3.2-3.9-1-1.7-1.2-3-3-3.4-3.9-.3-.9-.1-1.6.4-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactInfo() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: PhoneIcon,
      label: t("phone"),
      value: CONTACT_INFO.phone,
      href: CONTACT_INFO.phoneHref,
    },
    {
      icon: EmailIcon,
      label: t("email"),
      value: CONTACT_INFO.email,
      href: CONTACT_INFO.emailHref,
    },
    {
      icon: WhatsAppIcon,
      label: t("whatsapp"),
      value: CONTACT_INFO.whatsapp,
      whatsapp: true,
    },
    {
      icon: LocationIcon,
      label: t("address"),
      value: CONTACT_INFO.address,
      href: CONTACT_INFO.addressHref,
      external: true,
    },
    {
      icon: ClockIcon,
      label: t("hours"),
      value: `${t("weekdays")}\n${t("saturday")}`,
    },
  ] as const;

  return (
    <div className="flex flex-col">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
        {t("helpEyebrow")}
      </p>
      <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
        {t("helpTitle")}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
        {t("helpLead")}
      </p>

      <ul className="mt-10 flex list-none flex-col gap-6">
        {contactItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="contact-info-item group flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06] text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                <Icon />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                  {item.label}
                </p>
                {"whatsapp" in item && item.whatsapp ? (
                  <WhatsAppLink
                    message={t("defaultWhatsapp")}
                    className="mt-1 block text-sm font-medium text-white/80 hover:text-accent"
                  >
                    {item.value}
                  </WhatsAppLink>
                ) : "href" in item && item.href ? (
                  <a
                    href={item.href}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-1 block text-sm font-medium text-white/80 transition-colors duration-300 hover:text-accent"
                  >
                    {item.value.split("\n").map((line, i) => (
                      <span key={i} className={i > 0 ? "block" : undefined}>
                        {line}
                      </span>
                    ))}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-white/80 whitespace-pre-line">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );

          return <li key={item.label}>{content}</li>;
        })}
      </ul>

      <div
        className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t border-accent/15 pt-8"
        aria-label={t("trustAria")}
      >
        {TRUST_SIGNALS.map((signal, index) => {
          const value =
            "valueKey" in signal ? t(`trustValues.${signal.valueKey}`) : signal.value;
          const label = t(`trust.${signal.labelKey}`);

          return (
            <div key={signal.labelKey} className="flex items-center gap-6">
              {index > 0 && (
                <span
                  className="hidden h-8 w-px bg-accent/20 sm:block"
                  aria-hidden
                />
              )}
              <div>
                <p className="text-sm font-semibold text-accent">{value}</p>
                <p className="mt-0.5 text-xs text-white/45">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
