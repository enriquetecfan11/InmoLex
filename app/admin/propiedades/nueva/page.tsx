import { AdminPropertyForm } from "@/components/admin/AdminPropertyForm";

export default function AdminNewPropertyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-accent sm:text-3xl">Nueva propiedad</h1>
      <p className="mt-1 text-sm text-white/50">Completa los datos del inmueble.</p>
      <div className="mt-8">
        <AdminPropertyForm />
      </div>
    </div>
  );
}
