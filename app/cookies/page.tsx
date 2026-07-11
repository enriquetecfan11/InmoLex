import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COOKIES_CONTENT } from "@/lib/legal/cookies";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre el uso de cookies en el sitio web de InmoLex.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title={COOKIES_CONTENT.title}
      updatedAt={COOKIES_CONTENT.updatedAt}
      intro={COOKIES_CONTENT.intro}
      sections={COOKIES_CONTENT.sections}
    />
  );
}
