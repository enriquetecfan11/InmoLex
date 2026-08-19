import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const HISTORY_IDS = ["origin", "method", "evolution"] as const;
const HIGHLIGHT_IDS = ["sale", "investment", "finance", "media"] as const;
const EVENT_BULLET_IDS = ["guests", "staging", "coverage"] as const;

function Dot() {
  return <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />;
}

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand-dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 85%, rgba(201, 169, 98, 0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(201, 169, 98, 0.18) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative">
        <RevealOnScroll>
          <header className="mx-auto max-w-3xl pt-14 text-center sm:pt-16 lg:pt-20">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              {t("subtitle")}
            </p>
          </header>
        </RevealOnScroll>

        <div className="grid gap-8 py-14 sm:py-16 lg:grid-cols-3 lg:gap-8 lg:py-24">
          {HISTORY_IDS.map((id, index) => (
            <RevealOnScroll key={id} delay={Math.min(index * 90, 240)}>
              <article className="h-full rounded-2xl border border-accent/15 bg-accent/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.07]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                  {t(`history.${id}.title`)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {t(`history.${id}.description`)}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="grid gap-10 border-t border-accent/15 pt-12 sm:pt-14 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("servicesEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                {t("servicesTitle")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {t("servicesLead")}
              </p>

              <ul className="mt-7 space-y-3">
                {HIGHLIGHT_IDS.map((id) => (
                  <li key={id} className="flex items-start gap-3 text-sm text-white/75">
                    <Dot />
                    <span>{t(`highlights.${id}`)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/servicios"
                  size="lg"
                  className="w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto"
                >
                  {t("viewServices")}
                </Button>
                <Link
                  href="/contacto"
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent-light"
                >
                  {t("talkAdvisor")}
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-7 backdrop-blur-sm sm:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("eventsTitle")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t("eventsDescription")}
              </p>
              <ul className="mt-6 space-y-3">
                {EVENT_BULLET_IDS.map((id) => (
                  <li key={id} className="flex items-start gap-3 text-sm text-white/75">
                    <Dot />
                    <span>{t(`eventsBullets.${id}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div className="mt-14 rounded-2xl border border-accent/15 bg-brand-dark/35 p-7 backdrop-blur-sm sm:mt-16 sm:p-9">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("letterTitle")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {t("letterPending")}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="border-t border-accent/15 pb-16 pt-10 text-center sm:pb-20 sm:pt-12 lg:pb-24">
            <p className="font-display text-2xl tracking-tight text-white sm:text-3xl">
              {t("ctaTitle")}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {t("ctaLead")}
            </p>
            <Button
              href="/contacto"
              variant="outline"
              size="lg"
              className="mt-8 hover:-translate-y-0.5"
            >
              {t("ctaButton")}
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
