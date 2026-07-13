"use client";

import Link from "next/link";
import { DeleteForm } from "@/components/admin/DeleteForm";
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_STATUS_LABELS,
  OPERATION_LABELS,
  type Property,
} from "@/lib/properties";

interface AdminPropertyTableProps {
  properties: Property[];
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
      No hay propiedades. Crea la primera.
    </p>
  );
}

export function AdminPropertyTable({ properties }: AdminPropertyTableProps) {
  return (
    <>
      {properties.length === 0 && <EmptyState />}

      {properties.length > 0 && (
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
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-accent/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-white/70">
                      {property.id}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-white">
                      {property.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/80">
                      {formatPrice(property.price)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/70 capitalize">
                      {PROPERTY_TYPE_LABELS[property.type]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-white/70 capitalize">
                      {OPERATION_LABELS[property.operation]}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-flex rounded-full border border-accent/15 bg-accent/[0.08] px-2.5 py-0.5 text-xs font-medium text-accent capitalize">
                        {PROPERTY_STATUS_LABELS[property.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/propiedades/${property.id}/editar`}
                          className="rounded-lg border border-accent/20 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/10"
                        >
                          Editar
                        </Link>
                        <DeleteForm id={property.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {properties.map((property) => (
              <li
                key={property.id}
                className="rounded-xl border border-accent/15 bg-brand-dark/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {property.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">ID: {property.id}</p>
                  </div>
                  <span className="inline-flex shrink-0 rounded-full border border-accent/15 bg-accent/[0.08] px-2.5 py-0.5 text-xs font-medium text-accent capitalize">
                    {PROPERTY_STATUS_LABELS[property.status]}
                  </span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-white/45">Precio</dt>
                    <dd className="text-white/80">{formatPrice(property.price)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/45">Tipo</dt>
                    <dd className="capitalize text-white/70">
                      {PROPERTY_TYPE_LABELS[property.type]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-white/45">Operación</dt>
                    <dd className="capitalize text-white/70">
                      {OPERATION_LABELS[property.operation]}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/admin/propiedades/${property.id}/editar`}
                    className="flex-1 rounded-lg border border-accent/20 px-3 py-2 text-center text-xs font-medium text-accent transition hover:bg-accent/10"
                  >
                    Editar
                  </Link>
                  <DeleteForm id={property.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
