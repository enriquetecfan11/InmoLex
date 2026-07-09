import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroStats } from "@/components/home/HeroStats";

const STATS = [
  { value: "150+", label: "Propiedades gestionadas" },
  { value: "12", label: "Años de experiencia" },
  { value: "98%", label: "Clientes satisfechos" },
];

const TRUST_ITEMS = [
  { value: "4.9", label: "Valoración media" },
  { value: "+200", label: "Familias ayudadas" },
  { value: "100%", label: "Transparencia" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-[#111111] to-brand-dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 85%, rgba(201, 169, 98, 0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(201, 169, 98, 0.18) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24 xl:gap-20 xl:py-28">
          <div className="order-1 lg:order-none">
            <h1 className="hero-title font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              Encuentra tu hogar ideal
            </h1>

            <p className="hero-subtitle mt-5 max-w-md text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
              La transparencia y profesionalidad que necesitas en el sector
              inmobiliario, con asesoramiento personalizado en cada paso.
            </p>

            <div className="hero-actions mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch">
              <Button
                href="/propiedades"
                variant="primary"
                size="lg"
                className="hero-btn-primary w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto"
              >
                Explorar propiedades
              </Button>
              <Button
                href="/contacto"
                variant="outline"
                size="lg"
                className="hero-btn-secondary w-full hover:-translate-y-0.5 sm:w-auto"
              >
                Contactar
              </Button>
            </div>

            <div
              className="hero-trust mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-accent/15 pt-8 sm:mt-10"
              aria-label="Indicadores de confianza"
            >
              {TRUST_ITEMS.map((item, index) => (
                <div key={item.label} className="flex items-center gap-6">
                  {index > 0 && (
                    <span
                      className="hidden h-8 w-px bg-accent/20 sm:block"
                      aria-hidden
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-accent">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-image order-2 lg:order-none">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:aspect-[4/5]">
                <div className="hero-image-zoom absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                    alt="Vivienda moderna de diseño contemporáneo"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/20 to-transparent lg:from-brand/70" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/50 via-transparent to-brand/10" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/15" />
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border border-accent/10 bg-accent/[0.02]" />
            </div>
          </div>
        </div>

        <div className="border-t border-accent/15 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
          <HeroStats stats={STATS} />
        </div>
      </Container>
    </section>
  );
}
