import { getVessels } from "@/app/actions/vessel-actions";
import { AdminVesselTable } from "@/components/admin/AdminVesselTable";
import Link from "next/link";

export default async function AdminNauticaPage() {
  const vessels = await getVessels();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-accent sm:text-3xl">Náutica</h1>
          <p className="mt-1 text-sm text-white/50">{vessels.length} registros</p>
        </div>
        <Link
          href="/admin/nautica/nueva"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-brand shadow hover:bg-accent-light"
        >
          Nueva embarcación
        </Link>
      </div>
      <AdminVesselTable vessels={vessels} />
    </div>
  );
}
