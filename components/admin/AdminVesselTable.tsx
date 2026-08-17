"use client";

import Link from "next/link";
import { VesselDeleteForm } from "@/components/admin/VesselDeleteForm";
import { OPERATION_LABELS, PROPERTY_STATUS_LABELS } from "@/lib/properties";
import { VESSEL_TYPE_LABELS, type Vessel } from "@/lib/vessels";

interface AdminVesselTableProps {
  vessels: Vessel[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

function EmptyState() {
  return (
    <p className="px-4 py-12 text-center text-sm text-white/50">
      No hay embarcaciones. Crea la primera.
    </p>
  );
}

export function AdminVesselTable({ vessels }: AdminVesselTableProps) {
  return (
    <>
      {vessels.length === 0 && <EmptyState />}

      {vessels.length > 0 && (
        <>
          <div className="hidden overflow-x-auto rounded-xl border border-accent/15 bg-brand-dark/30 md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-accent/15 bg-brand-dark/50 text-white/60">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Título</th>
                  <th className="px-4 py-3 font-medium">Precio</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Operación</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/10">
                {vessels.map((vessel) => (
                  <tr key={vessel.id} className="hover:bg-accent/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-white/70">{vessel.id}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-white">{vessel.title}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/80">
                      {formatPrice(vessel.price)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/70">
                      {VESSEL_TYPE_LABELS[vessel.type]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/70">
                      {OPERATION_LABELS[vessel.operation]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-flex rounded-full border border-accent/15 bg-accent/[0.08] px-2.5 py-0.5 text-xs font-medium text-accent capitalize">
                        {PROPERTY_STATUS_LABELS[vessel.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/nautica/${vessel.id}/editar`}
                          className="rounded-lg border border-accent/20 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/10"
                        >
                          Editar
                        </Link>
                        <VesselDeleteForm id={vessel.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {vessels.map((vessel) => (
              <li
                key={vessel.id}
                className="rounded-xl border border-accent/15 bg-brand-dark/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{vessel.title}</p>
                    <p className="mt-0.5 text-xs text-white/45">ID: {vessel.id}</p>
                  </div>
                  <span className="inline-flex shrink-0 rounded-full border border-accent/15 bg-accent/[0.08] px-2.5 py-0.5 text-xs font-medium text-accent capitalize">
                    {PROPERTY_STATUS_LABELS[vessel.status]}
                  </span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-white/45">Precio</dt>
                    <dd className="text-white/80">{formatPrice(vessel.price)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/45">Tipo</dt>
                    <dd className="text-white/70">{VESSEL_TYPE_LABELS[vessel.type]}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/45">Operación</dt>
                    <dd className="text-white/70">{OPERATION_LABELS[vessel.operation]}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/admin/nautica/${vessel.id}/editar`}
                    className="flex-1 rounded-lg border border-accent/20 px-3 py-2 text-center text-xs font-medium text-accent transition hover:bg-accent/10"
                  >
                    Editar
                  </Link>
                  <VesselDeleteForm id={vessel.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
