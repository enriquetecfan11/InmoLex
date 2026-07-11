import { InmoLexLeadForm } from "@/components/forms/InmoLexLeadForm";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { TRUST_SIGNALS } from "@/lib/contact";
import { CONTACTO_CHOICES } from "@/lib/google-form-prefill";

export function ContactFormCta() {
  return (
    <div className="contact-form-cta relative">
      <h2 className="font-display text-2xl text-white">¿Tienes una duda?</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Déjanos tu teléfono y te llamamos. Sin salir de esta página.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {TRUST_SIGNALS.map((signal) => (
          <li
            key={signal.label}
            className="rounded-lg border border-accent/10 bg-brand-dark/40 px-4 py-3"
          >
            <p className="text-sm font-semibold text-accent">{signal.value}</p>
            <p className="mt-0.5 text-xs text-white/50">{signal.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <InmoLexLeadForm
          formKey="contacto"
          choice={CONTACTO_CHOICES.consulta}
          showDetails
          detailsLabel="¿Qué necesitas?"
          submitLabel="Enviar consulta"
          className="border-0 bg-transparent p-0 backdrop-blur-none"
        />
      </div>

      <p className="mt-6 text-center">
        <WhatsAppLink className="text-sm font-medium text-accent hover:text-accent-light">
          O escríbenos por WhatsApp
        </WhatsAppLink>
      </p>
    </div>
  );
}
