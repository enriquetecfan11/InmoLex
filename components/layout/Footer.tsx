import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/contact";
import { NAV_LINKS } from "@/lib/navigation";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="13" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 8v5M6 6.2v.1M9 13V10.2c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-accent/20 bg-brand text-white">
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <BrandLogo imageClassName="h-11 w-auto shrink-0" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Inmobiliaria premium en Madrid. Compra, venta y alquiler con
              asesoramiento personalizado y máxima transparencia.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 text-accent transition-colors hover:border-accent/40 hover:bg-accent/10"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Contacto
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a href={CONTACT_INFO.phoneHref} className="transition-colors hover:text-accent">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.emailHref} className="transition-colors hover:text-accent">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <WhatsAppLink className="text-white/60 hover:text-accent">
                  {CONTACT_INFO.whatsapp}
                </WhatsAppLink>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.addressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Horario
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>{CONTACT_INFO.hours.weekdays}</li>
              <li>{CONTACT_INFO.hours.saturday}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-accent/15 pt-6 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} InmoLex. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/aviso-legal" className="transition-colors hover:text-accent">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="transition-colors hover:text-accent">
              Privacidad
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-accent">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
