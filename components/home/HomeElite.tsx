import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { EliteIcon, EliteWatermark } from "@/components/home/EliteIcons";
import { ELITE_BENTO, type EliteBentoBlock } from "@/lib/elite";

const BENTO_LAYOUT: Record<EliteBentoBlock["id"], string> = {
  tech: "order-3 min-w-0 md:order-1 md:col-span-2 lg:col-span-8 lg:row-span-2",
  coverage: "order-1 min-w-0 md:order-2 lg:col-span-4",
  tailored: "order-2 min-w-0 md:order-3 lg:col-span-4",
  finance: "order-4 min-w-0 lg:col-span-5",
  network: "order-5 min-w-0 lg:col-span-7",
};

const TECH_ITEMS = [
  "photo",
  "tours",
  "visits",
  "plans2d",
  "plans3d",
  "presentation",
] as const;

const NETWORK_ITEMS = [
  "sale",
  "rent",
  "negotiation",
  "exposure",
  "coordination",
] as const;

function EliteBentoCard({
  block,
  delay,
}: {
  block: EliteBentoBlock;
  delay: number;
}) {
  const t = useTranslations("elite");
  const isTech = block.id === "tech";
  const isNetwork = block.id === "network";

  return (
    <RevealOnScroll
      variant="editorial"
      delay={delay}
      className={`h-full ${BENTO_LAYOUT[block.id]}`}
    >
      <article className="elite-bento-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/12 bg-brand-dark p-5 sm:p-6 lg:p-8">
        <span
          className="elite-bento-watermark -bottom-8 -right-6 h-36 w-36 lg:-bottom-10 lg:-right-8 lg:h-44 lg:w-44"
          aria-hidden
        >
          <EliteWatermark name={block.icon} />
        </span>

        <div className="relative flex h-full flex-col">
          <span className="elite-bento-card__icon inline-flex text-accent">
            <EliteIcon name={block.icon} />
          </span>

          <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-white sm:text-[1.65rem] lg:mt-5 lg:text-3xl">
            {t(`blocks.${block.id}.title`)}
          </h3>

          <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">
            {t(`blocks.${block.id}.body`)}
          </p>

          {isTech ? (
            <ul className="mt-5 grid list-none gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:mt-auto lg:pt-8">
              {TECH_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-snug text-white/80"
                >
                  <span
                    className="mt-2 h-px w-3 shrink-0 bg-accent/70"
                    aria-hidden
                  />
                  {t(`blocks.tech.items.${item}`)}
                </li>
              ))}
            </ul>
          ) : null}

          {isNetwork ? (
            <ul className="mt-5 flex list-none flex-wrap gap-x-3 gap-y-1 lg:mt-auto lg:pt-6">
              {NETWORK_ITEMS.map((item, itemIndex) => (
                <li
                  key={item}
                  className="font-display text-[1.05rem] leading-relaxed text-white/80 sm:text-lg"
                >
                  {itemIndex > 0 ? (
                    <span className="mr-3 text-accent/50" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  {t(`blocks.network.items.${item}`)}
                </li>
              ))}
            </ul>
          ) : null}

          {block.id === "coverage" || block.id === "finance" ? (
            <p className="mt-5 font-display text-lg leading-snug text-accent-light lg:mt-auto lg:pt-6">
              {t(`blocks.${block.id}.accent`)}
            </p>
          ) : null}
        </div>
      </article>
    </RevealOnScroll>
  );
}

export function HomeElite() {
  const t = useTranslations("elite");

  return (
    <section className="brand-section" aria-labelledby="elite-heading">
      <div className="brand-section__gradient" aria-hidden />
      <div className="brand-section__atmosphere" aria-hidden />
      <div className="brand-section__glow" aria-hidden />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <header className="mx-auto max-w-3xl text-center">
          <RevealOnScroll variant="editorial">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {t("kicker")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="editorial" delay={90}>
            <h2
              id="elite-heading"
              className="mt-4 font-display text-[2.15rem] leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              {t("title")}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll variant="editorial" delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("lead")}
            </p>
          </RevealOnScroll>
        </header>

        <RevealOnScroll variant="editorial" delay={80}>
          <div className="mx-auto mt-16 max-w-6xl border-t border-accent/15 pt-12 sm:mt-20 sm:pt-16 lg:mt-24 lg:pt-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="flex gap-5 lg:col-span-5">
                <span
                  className="mt-2 hidden w-px shrink-0 bg-accent/45 lg:block"
                  aria-hidden
                />
                <div>
                  <span
                    className="mb-5 block h-px w-12 bg-accent/45 lg:hidden"
                    aria-hidden
                  />
                  <h3 className="font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                    {t("differentialTitle")}
                  </h3>
                </div>
              </div>
              <div className="lg:col-span-7 lg:pt-2">
                <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                  {t("differentialBody")}
                </p>
                <p className="mt-6 font-display text-2xl leading-snug text-accent-light sm:text-[1.75rem]">
                  {t("differentialHighlight")}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 md:grid-cols-2 md:gap-4 lg:mt-20 lg:grid-cols-12">
          {ELITE_BENTO.map((block, index) => (
            <EliteBentoCard
              key={block.id}
              block={block}
              delay={Math.min(index * 100, 400)}
            />
          ))}
        </div>

        <RevealOnScroll variant="editorial" delay={80}>
          <div className="mx-auto mt-16 max-w-3xl text-center sm:mt-20 lg:mt-24">
            <span className="mx-auto mb-8 block h-px w-16 bg-accent/30 sm:mb-10" aria-hidden />
            <h2 className="font-display text-[2.15rem] leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {t("closeTitle")}
            </h2>
            <p className="mt-5 text-base text-white/70 sm:text-lg">
              {t("closeSubtitle")}
            </p>
            <div className="mt-8 sm:mt-10">
              <Button
                href="/contacto"
                size="lg"
                className="w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 sm:w-auto sm:min-w-[16rem]"
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
