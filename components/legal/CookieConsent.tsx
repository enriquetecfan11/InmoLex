"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { COOKIE_CONSENT_KEY } from "@/lib/legal/cookies";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyConsentChange() {
  listeners.forEach((listener) => listener());
}

function getConsentSnapshot(): string | null {
  return localStorage.getItem(COOKIE_CONSENT_KEY);
}

function getServerConsentSnapshot(): string | null {
  return null;
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const save = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    notifyConsentChange();
  };

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-accent/20 bg-brand/95 px-4 py-4 backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/75">
          Utilizamos cookies para mejorar su experiencia. Puede aceptar o rechazar las cookies no esenciales.{" "}
          <Link href="/cookies" className="text-accent underline underline-offset-2 hover:text-accent-light">
            Más información
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-lg border border-accent/25 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-accent/40 hover:text-white"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-accent-light"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
