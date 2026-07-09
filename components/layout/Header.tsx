import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks } from "@/components/layout/NavLinks";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-brand/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex min-w-0 shrink items-baseline gap-1.5">
          <span className="truncate font-display text-2xl tracking-tight text-accent transition-colors group-hover:text-accent-light sm:text-3xl">
            InmoLex
          </span>
        </Link>

        <NavLinks className="hidden items-center gap-1 md:flex" />

        <div className="flex shrink-0 items-center gap-2">
          <WhatsAppLink
            showIcon
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-accent/25 text-accent hover:border-accent/40 hover:bg-accent/10 md:inline-flex"
          >
            <span className="sr-only">WhatsApp</span>
          </WhatsAppLink>
          <Button
            href="/contacto"
            variant="primary"
            size="sm"
            className="hidden shadow-none md:inline-flex"
          >
            Valoración gratuita
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
