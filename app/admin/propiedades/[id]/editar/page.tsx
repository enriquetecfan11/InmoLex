import { getProperty } from "@/app/actions/property-actions";
import { AdminPropertyForm } from "@/components/admin/AdminPropertyForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Editar propiedad</h1>
      <p className="mt-1 text-sm text-white/50">{property.id}</p>
      <div className="mt-8">
        <AdminPropertyForm property={property} />
      </div>
    </div>
  );
}
