import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LEGAL_NOTICE_CONTENT } from "@/lib/legal/aviso-legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal e información del titular del sitio web de InmoLex.",
};

export default function AvisoLegalPage() {
  return (
    <LegalPageLayout
      title={LEGAL_NOTICE_CONTENT.title}
      updatedAt={LEGAL_NOTICE_CONTENT.updatedAt}
      intro={LEGAL_NOTICE_CONTENT.intro}
      sections={LEGAL_NOTICE_CONTENT.sections}
    />
  );
}
