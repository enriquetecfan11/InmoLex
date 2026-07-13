import { getProperties } from "@/app/actions/property-actions";
import { AdminPropertyTable } from "@/components/admin/AdminPropertyTable";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-accent sm:text-3xl">Propiedades</h1>
          <p className="mt-1 text-sm text-white/50">{properties.length} registros</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-brand shadow hover:bg-accent-light"
        >
          Nueva propiedad
        </Link>
      </div>
      <AdminPropertyTable properties={properties} />
    </div>
  );
}
