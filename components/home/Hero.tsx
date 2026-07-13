import { Container } from "@/components/ui/Container";
import { ServiceQuickMenu } from "@/components/home/ServiceQuickMenu";
import { HomePortfolioCta } from "@/components/home/HomePortfolioCta";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand-dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 85%, rgba(201, 169, 98, 0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(201, 169, 98, 0.18) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/[0.08] blur-3xl" />

      <Container className="relative pt-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="hero-title font-display text-[2.5rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              ¿Qué necesitas?
            </h1>
            <p className="hero-subtitle mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Pulsa un botón. Te llamamos nosotros.
            </p>
        </div>
      </Container>

      <div className="relative mt-10 sm:mt-12 lg:mt-14">
        <ServiceQuickMenu />
      </div>

      <HomePortfolioCta />
    </section>
  );
}
