"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { isNavLinkActive, NAV_LINKS } from "@/lib/navigation";

const ANIMATION_MS = 320;

export function MobileNav() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const tCommon = useTranslations("common");
  const tContact = useTranslations("contact");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const frame = requestAnimationFrame(() => setAnimatedOpen(true));
      return () => cancelAnimationFrame(frame);
    }

    setAnimatedOpen(false);
    const timeout = window.setTimeout(() => setVisible(false), ANIMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10"
        aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        <span className="sr-only">{open ? tHeader("closeMenu") : tHeader("openMenu")}</span>
        <span className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-[7px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? "top-[7px] -rotate-45" : "top-[14px]"
            }`}
          />
        </span>
      </button>

      {mounted &&
        visible &&
        createPortal(
          <div className="fixed inset-0 top-16 z-40 overflow-hidden md:hidden">
            <button
              type="button"
              className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                animatedOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMenu}
              aria-label={tHeader("closeMenu")}
            />

            <nav
              id="mobile-nav-panel"
              className={`relative border-b border-accent/15 bg-brand px-5 py-6 shadow-2xl shadow-black/50 transition-all duration-300 ease-out ${
                animatedOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = isNavLinkActive(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-lg px-4 py-3.5 text-lg font-medium transition-colors ${
                          isActive
                            ? "bg-accent/10 text-accent"
                            : "text-white/80 hover:bg-accent/10 hover:text-accent"
                        }`}
                      >
                        {tNav(link.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-3 border-t border-accent/15 pt-6">
                <LanguageSwitcher className="w-full" />
                <WhatsAppLink
                  message={tContact("defaultWhatsapp")}
                  className="flex w-full items-center justify-center rounded-lg border border-accent/25 px-4 py-3.5 text-base font-medium text-accent hover:bg-accent/10"
                >
                  {tCommon("whatsapp")}
                </WhatsAppLink>
                <Button
                  href="/contacto"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-none"
                  onClick={closeMenu}
                >
                  {tHeader("freeValuation")}
                </Button>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
