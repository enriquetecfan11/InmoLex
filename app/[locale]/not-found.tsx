import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="brand-section flex flex-1 items-center py-16 sm:py-20">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
          {t("code")}
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
          {t("lead")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" className="w-full sm:w-auto">
            {t("home")}
          </Button>
          <Button
            href="/propiedades"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t("properties")}
          </Button>
        </div>

        <p className="mt-8 text-sm text-white/45">
          {t("help")}{" "}
          <Link href="/contacto" className="text-accent transition-colors hover:text-accent-light">
            {t("contact")}
          </Link>
        </p>
      </Container>
    </section>
  );
}
