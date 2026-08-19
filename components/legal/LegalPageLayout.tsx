import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import type { LegalSection } from "@/lib/legal/privacy";

interface LegalPageLayoutProps {
  title: string;
  updatedAt: string;
  intro: string;
  bindingNote?: string;
  sections: LegalSection[];
}

export function LegalPageLayout({
  title,
  updatedAt,
  intro,
  bindingNote,
  sections,
}: LegalPageLayoutProps) {
  const t = useTranslations("legal");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-accent/15 pb-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-dark">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-brand sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-ink-muted">{updatedAt}</p>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">{intro}</p>
            {bindingNote && (
              <p className="mt-4 text-base leading-relaxed text-ink-muted">{bindingNote}</p>
            )}
          </header>

          <div className="space-y-10 pt-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl text-brand">{section.title}</h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-muted">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="mt-12 border-t border-accent/15 pt-8">
            <Link
              href="/"
              className="text-sm font-medium text-accent-dark transition-colors hover:text-accent"
            >
              {tCommon("backHome")}
            </Link>
          </footer>
        </article>
      </Container>
    </section>
  );
}
