import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const PILLARS = ["market", "execution", "followUp", "network"] as const;

export function HomeWhyChoose() {
  const t = useTranslations("home");

  return (
    <section className="brand-section">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("whyEyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
              {t("whyTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              {t("whyLead")}
            </p>
          </header>
        </RevealOnScroll>

        <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:mt-10 lg:gap-8">
          {PILLARS.map((id, index) => (
            <li key={id}>
              <RevealOnScroll delay={Math.min(index * 90, 270)}>
                <article className="h-full rounded-2xl border border-accent/15 bg-accent/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.07]">
                  <p className="font-display text-xl tracking-tight text-white sm:text-2xl">
                    {t(`pillars.${id}.title`)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {t(`pillars.${id}.description`)}
                  </p>
                </article>
              </RevealOnScroll>
            </li>
          ))}
        </ul>

        <RevealOnScroll>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:mt-12 sm:flex-row">
            <Button
              href="/quienes-somos"
              variant="secondary"
              size="lg"
              className="w-full hover:-translate-y-0.5 sm:w-auto"
            >
              {t("whyCta")}
            </Button>
            <Link
              href="/contacto"
              className="text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
            >
              {t("whyTalk")}
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
