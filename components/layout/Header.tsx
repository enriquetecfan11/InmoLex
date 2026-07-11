import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks } from "@/components/layout/NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-brand/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link href="/" className="group min-w-0 shrink transition-opacity hover:opacity-90">
          <BrandLogo />
        </Link>

        <NavLinks className="hidden items-center gap-1 md:flex" />

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <Button
              href="/servicios/valoracion"
              variant="primary"
              size="sm"
              className="shadow-none"
            >
              Valoración gratuita
            </Button>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
