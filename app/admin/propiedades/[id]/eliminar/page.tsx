import { getProperty } from "@/app/actions/property-actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDeletePropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Eliminar propiedad</h1>
      <p className="mt-2 text-sm text-white/60">
        Vas a eliminar <span className="font-semibold text-white">{property.title}</span> ({property.id}). Esta acción no se puede deshacer.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <DeleteForm id={property.id} />
        <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-lg border border-accent/20 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10">
          Cancelar
        </Link>
      </div>
    </div>
  );
}
