import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceMenuIconGlyph } from "@/components/home/ServiceMenuIcon";
import { SERVICE_MENU_ITEMS } from "@/lib/service-menu";

export function ServiceQuickMenu() {
  return (
    <Container className="relative">
      <RevealOnScroll>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-3">
          {SERVICE_MENU_ITEMS.map((item, index) => (
            <RevealOnScroll key={item.id} delay={Math.min(index * 60, 300)}>
              <Link
                href={item.href}
                className="group flex h-full flex-col items-center rounded-2xl border border-accent/15 bg-accent/[0.04] px-3 py-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent/35 hover:bg-accent/[0.08] hover:-translate-y-0.5 sm:px-4 sm:py-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/[0.14]">
                  <ServiceMenuIconGlyph icon={item.icon} />
                </span>
                <span className="mt-4 font-display text-sm leading-tight text-white sm:text-base">
                  {item.title}
                </span>
                {item.highlight && (
                  <span className="mt-2 text-[0.65rem] font-semibold leading-tight text-accent">
                    {item.highlight}
                  </span>
                )}
                <span className="mt-2 hidden text-xs leading-relaxed text-white/50 lg:block">
                  {item.description}
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>
    </Container>
  );
}
