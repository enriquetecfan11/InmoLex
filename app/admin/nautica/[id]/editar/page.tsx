import { getVessel } from "@/app/actions/vessel-actions";
import { AdminVesselForm } from "@/components/admin/AdminVesselForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditVesselPage({ params }: PageProps) {
  const { id } = await params;
  const vessel = await getVessel(id);

  if (!vessel) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Editar embarcación</h1>
      <p className="mt-1 text-sm text-white/50">{vessel.id}</p>
      <div className="mt-8">
        <AdminVesselForm vessel={vessel} />
      </div>
    </div>
  );
}
