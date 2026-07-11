import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CORE_SERVICES, type Service } from "@/lib/services";

export function HomeServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-[#111111] to-brand-dark" />
      <div className="brand-section__atmosphere absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <RevealOnScroll>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Servicios
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Asesoramiento integral en compra, venta, alquiler, financiación e inversión. Elige el punto de partida y nos encargamos del resto.
            </p>
          </header>
        </RevealOnScroll>

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {CORE_SERVICES.map((service: Service, index) => (
            <li key={service.id}>
              <RevealOnScroll delay={Math.min(index * 90, 240)}>
                <ServiceCard service={service} />
              </RevealOnScroll>
            </li>
          ))}
        </ul>

        <RevealOnScroll>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-14 sm:flex-row sm:text-left">
            <p className="text-sm text-white/65">
              Consulta el catálogo completo de servicios.
            </p>
            <Button
              href="/servicios"
              variant="outline"
              size="lg"
              className="w-full hover:-translate-y-0.5 sm:w-auto"
            >
              Ver todos los servicios
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
