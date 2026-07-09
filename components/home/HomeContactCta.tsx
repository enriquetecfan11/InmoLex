import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function HomeContactCta() {
  return (
    <section className="brand-section">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative py-16 sm:py-20">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 backdrop-blur-sm sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.1] blur-3xl" />
            <div className="relative max-w-2xl">
              
              <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
                ¿Quieres vender, comprar o invertir?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                Cuéntanos tu objetivo y te devolvemos una propuesta clara: pasos,
                tiempos y escenario de precio, sin compromiso.
              </p>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <Button
                href="/contacto"
                size="lg"
                className="w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 sm:w-auto"
              >
                Contactar
              </Button>
              <Button
                href="/propiedades"
                variant="secondary"
                size="lg"
                className="w-full hover:-translate-y-0.5 sm:w-auto"
              >
                Ver propiedades
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

