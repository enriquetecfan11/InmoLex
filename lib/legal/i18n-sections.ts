import type { LegalSection } from "@/lib/legal/privacy";
import { LEGAL_ENTITY } from "@/lib/legal/entity";

type LegalPageKey = "notice" | "privacy" | "cookies";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

function tList(
  t: TranslationFn,
  prefix: string,
  keys: readonly string[],
  values?: Record<string, string | number | Date>,
): string[] {
  return keys.map((key) => t(`${prefix}.${key}`, values));
}

export function buildLegalSections(
  t: TranslationFn,
  page: LegalPageKey,
): LegalSection[] {
  const entity = {
    tradeName: LEGAL_ENTITY.tradeName,
    legalName: LEGAL_ENTITY.legalName,
    taxId: LEGAL_ENTITY.taxId,
    email: LEGAL_ENTITY.email,
    address: LEGAL_ENTITY.address,
    jurisdiction: LEGAL_ENTITY.jurisdiction,
  };

  if (page === "notice") {
    return [
      {
        title: t("notice.identityTitle"),
        paragraphs: [
          t("notice.holder", entity),
          ...(entity.taxId ? [t("notice.taxId", entity)] : []),
          t("notice.email", entity),
          t("notice.address", entity),
        ],
      },
      {
        title: t("notice.purposeTitle"),
        paragraphs: [t("notice.purpose", entity)],
      },
      {
        title: t("notice.termsTitle"),
        paragraphs: [t("notice.terms1"), t("notice.terms2")],
      },
      {
        title: t("notice.ipTitle"),
        paragraphs: [t("notice.ip", entity)],
      },
      {
        title: t("notice.liabilityTitle"),
        paragraphs: [t("notice.liability1", entity), t("notice.liability2")],
      },
      {
        title: t("notice.lawTitle"),
        paragraphs: [t("notice.law", entity)],
      },
    ];
  }

  if (page === "privacy") {
    return [
      {
        title: t("privacy.controllerTitle"),
        paragraphs: [
          t("privacy.controller", entity),
          t("privacy.contactEmail", entity),
        ],
      },
      {
        title: t("privacy.purposeTitle"),
        paragraphs: [t("privacy.purpose")],
        list: tList(t, "privacy.purposeList", [
          "requests",
          "services",
          "comms",
          "legal",
        ]),
      },
      {
        title: t("privacy.formsTitle"),
        paragraphs: [t("privacy.forms1"), t("privacy.forms2")],
      },
      {
        title: t("privacy.financeTitle"),
        paragraphs: [t("privacy.finance1"), t("privacy.finance2")],
      },
      {
        title: t("privacy.sensitiveTitle"),
        paragraphs: [t("privacy.sensitive")],
      },
      {
        title: t("privacy.legalBasisTitle"),
        paragraphs: [t("privacy.legalBasis")],
      },
      {
        title: t("privacy.retentionTitle"),
        paragraphs: [t("privacy.retention")],
      },
      {
        title: t("privacy.recipientsTitle"),
        paragraphs: [t("privacy.recipients1"), t("privacy.recipients2")],
      },
      {
        title: t("privacy.rightsTitle"),
        paragraphs: [
          t("privacy.rights1", entity),
          t("privacy.rights2"),
        ],
      },
    ];
  }

  return [
    {
      title: t("cookies.whatTitle"),
      paragraphs: [t("cookies.what")],
    },
    {
      title: t("cookies.useTitle"),
      paragraphs: [t("cookies.use")],
      list: tList(t, "cookies.useList", ["storage", "technical"]),
    },
    {
      title: t("cookies.analyticsTitle"),
      paragraphs: [t("cookies.analytics")],
    },
    {
      title: t("cookies.manageTitle"),
      paragraphs: [t("cookies.manage1"), t("cookies.manage2")],
    },
    {
      title: t("cookies.moreTitle"),
      paragraphs: [
        t("cookies.more1", entity),
        t("cookies.more2"),
      ],
    },
  ];
}
