import { getVessel } from "@/app/actions/vessel-actions";
import { VesselDeleteForm } from "@/components/admin/VesselDeleteForm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDeleteVesselPage({ params }: PageProps) {
  const { id } = await params;
  const vessel = await getVessel(id);

  if (!vessel) {
    notFound();
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Eliminar embarcación</h1>
      <p className="mt-2 text-sm text-white/60">
        Vas a eliminar <span className="font-semibold text-white">{vessel.title}</span> ({vessel.id}). Esta acción no se puede deshacer.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <VesselDeleteForm id={vessel.id} />
        <Link
          href="/admin/nautica"
          className="inline-flex items-center justify-center rounded-lg border border-accent/20 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
