import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="brand-section flex flex-1 items-center py-20 sm:py-28">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
          La página que buscas no existe o ha sido movida. Explora nuestras
          propiedades o contacta con nuestro equipo.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" className="w-full sm:w-auto">
            Volver al inicio
          </Button>
          <Button
            href="/propiedades"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Ver propiedades
          </Button>
        </div>

        <p className="mt-8 text-sm text-white/45">
          ¿Necesitas ayuda?{" "}
          <Link href="/contacto" className="text-accent transition-colors hover:text-accent-light">
            Contacta con nosotros
          </Link>
        </p>
      </Container>
    </section>
  );
}
