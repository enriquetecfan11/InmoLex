import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { PRIVACY_CONTENT } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad y tratamiento de datos de InmoLex.",
};

export default function PrivacidadPage() {
  return (
    <LegalPageLayout
      title={PRIVACY_CONTENT.title}
      updatedAt={PRIVACY_CONTENT.updatedAt}
      intro={PRIVACY_CONTENT.intro}
      sections={PRIVACY_CONTENT.sections}
    />
  );
}
