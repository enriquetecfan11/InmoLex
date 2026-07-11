import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HouseIcon } from "@/components/ui/HouseIcon";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function HomePortfolioCta() {
  return (
    <Container className="relative pb-16 pt-4 sm:pb-20 lg:pb-24">
      <RevealOnScroll>
        <div className="flex justify-center">
          <Button
            href="/propiedades"
            size="lg"
            className="group w-full max-w-md gap-3 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto sm:min-w-[22rem]"
          >
            <HouseIcon size={22} className="text-brand transition-transform group-hover:scale-110" />
            Nuestros inmuebles en cartera
          </Button>
        </div>
      </RevealOnScroll>
    </Container>
  );
}
