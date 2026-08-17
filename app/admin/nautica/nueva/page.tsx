import { AdminVesselForm } from "@/components/admin/AdminVesselForm";

export default function AdminNewVesselPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Nueva embarcación</h1>
      <p className="mt-1 text-sm text-white/50">Completa los datos de la embarcación.</p>
      <div className="mt-8">
        <AdminVesselForm />
      </div>
    </div>
  );
}
