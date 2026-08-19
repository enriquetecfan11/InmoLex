import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceMenuIconGlyph } from "@/components/home/ServiceMenuIcon";
import { SERVICE_MENU_ITEMS } from "@/lib/service-menu";

export function ServiceQuickMenu() {
  const t = useTranslations("services.items");
  type ItemKey = Parameters<typeof t>[0];
  const lastIndex = SERVICE_MENU_ITEMS.length - 1;

  return (
    <Container className="relative">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {SERVICE_MENU_ITEMS.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            variant="editorial"
            delay={Math.min(index * 80, 400)}
            className={
              index === lastIndex
                ? "h-full md:col-span-2 md:w-[calc((100%-0.75rem)/2)] md:justify-self-center lg:col-span-1 lg:col-start-2 lg:w-auto lg:justify-self-auto"
                : "h-full"
            }
          >
            <Link
              href={item.href}
              className="service-menu-card group flex h-full w-full flex-col items-center rounded-2xl border border-accent/15 bg-accent/[0.04] px-4 py-4 text-center backdrop-blur-sm sm:px-5 sm:py-5"
            >
              <span className="service-menu-card__icon flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent">
                <ServiceMenuIconGlyph icon={item.icon} size={22} />
              </span>
              <span className="mt-3 font-display text-sm leading-tight text-white sm:text-[0.95rem]">
                {t(`${item.id}.title` as ItemKey)}
              </span>
              {t.has(`${item.id}.highlight` as ItemKey) ? (
                <span className="mt-1.5 text-[0.65rem] font-semibold leading-tight text-accent">
                  {t(`${item.id}.highlight` as ItemKey)}
                </span>
              ) : null}
              <span className="mt-1.5 text-xs leading-relaxed text-white/70">
                {t(`${item.id}.menuDescription` as ItemKey)}
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </Container>
  );
}
