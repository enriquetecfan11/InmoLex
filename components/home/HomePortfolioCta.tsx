import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HouseIcon } from "@/components/ui/HouseIcon";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function HomePortfolioCta() {
  const t = useTranslations("home");

  return (
    <Container className="relative mt-10 pb-16 sm:mt-14 sm:pb-20 lg:pb-24">
      <RevealOnScroll variant="editorial" delay={120}>
        <div className="flex flex-col items-center">
          <span
            className="mb-8 h-px w-16 bg-accent/30 sm:mb-10"
            aria-hidden
          />
          <Button
            href="/propiedades"
            size="lg"
            className="group w-full max-w-md gap-3 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto sm:min-w-[22rem]"
          >
            <HouseIcon
              size={22}
              className="text-brand transition-transform group-hover:scale-110"
            />
            {t("portfolioCta")}
          </Button>
        </div>
      </RevealOnScroll>
    </Container>
  );
}
