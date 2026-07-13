import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const PILLARS = [
  {
    title: "Criterio de mercado",
    description:
      "Valoración realista y estrategia comercial para maximizar resultado sin perder tiempo.",
  },
  {
    title: "Ejecución impecable",
    description:
      "Fotografía, vídeo y materiales listos para publicar con una presentación coherente.",
  },
  {
    title: "Seguimiento claro",
    description:
      "Comunicación constante, datos de visitas y ajustes de estrategia con transparencia.",
  },
  {
    title: "Red de confianza",
    description:
      "Colaboradores (financiación, reformas, legal) para resolver fricciones antes de que aparezcan.",
  },
];

export function HomeWhyChoose() {
  return (
    <section className="brand-section">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Nosotros
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
              Por qué elegir InmoLex
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Un servicio boutique: decisiones con criterio, ejecución cuidada y
              una comunicación que te da control.
            </p>
          </header>
        </RevealOnScroll>

        <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:mt-10 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <li key={pillar.title}>
              <RevealOnScroll delay={Math.min(index * 90, 270)}>
                <article className="h-full rounded-2xl border border-accent/15 bg-accent/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.07]">
                  <p className="font-display text-xl tracking-tight text-white sm:text-2xl">
                    {pillar.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {pillar.description}
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
              Conócenos
            </Button>
            <Link
              href="/contacto"
              className="text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
            >
              Hablar con un asesor
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

