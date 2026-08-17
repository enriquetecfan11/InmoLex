"use client";

import { useActionState, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  createVesselForm,
  updateVesselForm,
} from "@/app/actions/vessel-actions";
import type { Vessel } from "@/lib/vessels";
import { LocationPickerMap } from "@/components/admin/LocationPickerMap";

type ActionState = {
  ok?: boolean;
  error?: string;
};

interface AdminVesselFormProps {
  vessel?: Vessel;
}

const vesselTypes = [
  { value: "yate", label: "Yate" },
  { value: "velero", label: "Velero" },
  { value: "lancha", label: "Lancha" },
  { value: "catamaran", label: "Catamarán" },
  { value: "motora", label: "Motora" },
] as const;

const operations = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
] as const;

const statuses = [
  { value: "disponible", label: "Disponible" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
  { value: "alquilado", label: "Alquilado" },
] as const;

const inputClassName =
  "w-full rounded-lg border border-accent/20 bg-brand-dark px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none";

interface ImagePreview {
  file: File;
  url: string;
}

type StepKey = "basic" | "nautical" | "location" | "media" | "extra";

const steps: { key: StepKey; label: string }[] = [
  { key: "basic", label: "Datos básicos" },
  { key: "nautical", label: "Características" },
  { key: "location", label: "Ubicación" },
  { key: "media", label: "Fotos y multimedia" },
  { key: "extra", label: "Extra" },
];

function StepIndicator({
  current,
  onSelect,
}: {
  current: StepKey;
  onSelect: (step: StepKey) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, idx) => {
        const isActive = step.key === current;
        const isPast = steps.findIndex((s) => s.key === current) > idx;
        return (
          <button
            key={step.key}
            type="button"
            onClick={() => onSelect(step.key)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "border-accent bg-accent/15 text-accent"
                : isPast
                  ? "border-accent/15 bg-accent/10 text-accent"
                  : "border-accent/15 bg-brand-dark/40 text-white/60 hover:border-accent/30"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] ${
                isActive
                  ? "bg-accent text-brand"
                  : isPast
                    ? "bg-accent/25 text-accent"
                    : "bg-white/10 text-white/70"
              }`}
            >
              {idx + 1}
            </span>
            {step.label}
          </button>
        );
      })}
    </div>
  );
}

function validateStep(step: StepKey, formData: FormData): string | null {
  if (step === "basic") {
    const title = String(formData.get("title") || "").trim();
    const price = Number(formData.get("price"));
    const type = String(formData.get("type") || "").trim();
    const operation = String(formData.get("operation") || "").trim();
    const status = String(formData.get("status") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!title) return "El título es obligatorio";
    if (!price || price <= 0) return "El precio debe ser mayor que 0";
    if (!type) return "Selecciona un tipo";
    if (!operation) return "Selecciona una operación";
    if (!status) return "Selecciona un estado";
    if (!description) return "La descripción es obligatoria";
  }

  if (step === "location") {
    const location = String(formData.get("location") || "").trim();
    if (!location) return "La ubicación es obligatoria";
    const coordinatesRaw = String(formData.get("coordinates") || "").trim();
    if (coordinatesRaw && !/^\{.*\}$/.test(coordinatesRaw)) {
      return "Las coordenadas no tienen un formato válido";
    }
  }

  if (step === "nautical") {
    const lengthMeters = Number(formData.get("lengthMeters"));
    if (Number.isNaN(lengthMeters) || lengthMeters < 0) return "La eslora no es válida";
  }

  return null;
}

export function AdminVesselForm({ vessel }: AdminVesselFormProps) {
  const isEdit = !!vessel;
  const initialState: ActionState = {};
  const [state, formAction] = useActionState(
    isEdit ? updateVesselForm : createVesselForm,
    initialState,
  );
  const [step, setStep] = useState<StepKey>("basic");
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(vessel?.images ?? []);
  const [coordinates, setCoordinates] = useState<string>(
    vessel?.coordinates ? JSON.stringify(vessel.coordinates) : "",
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

    for (const file of newFiles) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "nautica");

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Error al subir");
        }

        const data = await response.json();
        setImagePreviews((prev) => [...prev, { file, url: data.url }]);
      } catch (err) {
        console.error("Upload failed:", err);
        alert(err instanceof Error ? err.message : "Error al subir imagen");
      } finally {
        setUploading(false);
      }
    }
  }, []);

  const removePreview = useCallback((url: string) => {
    setImagePreviews((prev) => prev.filter((p) => p.url !== url));
  }, []);

  const removeExistingImage = useCallback((url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  }, []);

  const allImages = [
    ...existingImages.map((url) => ({ url, isExisting: true as const })),
    ...imagePreviews.map((p) => ({ url: p.url, isExisting: false as const })),
  ];

  const handleNext = () => {
    const form = document.getElementById("admin-vessel-form") as HTMLFormElement | null;
    if (!form) return;
    const formData = new FormData(form);
    const validationError = validateStep(step, formData);
    if (validationError) {
      alert(validationError);
      return;
    }
    const currentIndex = steps.findIndex((s) => s.key === step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1].key);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex((s) => s.key === step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1].key);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const urls = [...existingImages, ...imagePreviews.map((p) => p.url)];
    formData.set("images", urls.join("\n"));
    return formAction(formData);
  };

  const isLastStep = step === "extra";

  return (
    <form id="admin-vessel-form" action={handleSubmit} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={vessel.id} />}
      <input type="hidden" name="coordinates" value={coordinates} />
      <StepIndicator current={step} onSelect={setStep} />

      {state.error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      {step === "basic" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="mb-1 block text-sm text-white/70">
              Título
            </label>
            <input id="title" name="title" required defaultValue={vessel?.title} className={inputClassName} />
          </div>
          <div>
            <label htmlFor="price" className="mb-1 block text-sm text-white/70">
              Precio (€)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              min="1"
              defaultValue={vessel?.price}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="type" className="mb-1 block text-sm text-white/70">
              Tipo
            </label>
            <select id="type" name="type" required defaultValue={vessel?.type} className={inputClassName}>
              <option value="">Selecciona</option>
              {vesselTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="operation" className="mb-1 block text-sm text-white/70">
              Operación
            </label>
            <select
              id="operation"
              name="operation"
              required
              defaultValue={vessel?.operation}
              className={inputClassName}
            >
              <option value="">Selecciona</option>
              {operations.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="mb-1 block text-sm text-white/70">
              Estado
            </label>
            <select id="status" name="status" required defaultValue={vessel?.status} className={inputClassName}>
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1 block text-sm text-white/70">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              defaultValue={vessel?.description}
              className={inputClassName}
            />
          </div>
        </div>
      )}

      {step === "nautical" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lengthMeters" className="mb-1 block text-sm text-white/70">
              Eslora (m)
            </label>
            <input
              id="lengthMeters"
              name="lengthMeters"
              type="number"
              min="0"
              step="0.1"
              defaultValue={vessel?.lengthMeters}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="year" className="mb-1 block text-sm text-white/70">
              Año
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min="0"
              defaultValue={vessel?.year}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="cabins" className="mb-1 block text-sm text-white/70">
              Camarotes
            </label>
            <input
              id="cabins"
              name="cabins"
              type="number"
              min="0"
              defaultValue={vessel?.cabins}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="mb-1 block text-sm text-white/70">
              Baños
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              defaultValue={vessel?.bathrooms}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="capacity" className="mb-1 block text-sm text-white/70">
              Plazas
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="0"
              defaultValue={vessel?.capacity}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="badge" className="mb-1 block text-sm text-white/70">
              Badge
            </label>
            <select id="badge" name="badge" defaultValue={vessel?.badge ?? ""} className={inputClassName}>
              <option value="">Ninguno</option>
              <option value="nuevo">Nuevo</option>
              <option value="destacado">Destacado</option>
              <option value="exclusivo">Exclusivo</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>
          <div>
            <label htmlFor="manufacturer" className="mb-1 block text-sm text-white/70">
              Astillero / marca
            </label>
            <input
              id="manufacturer"
              name="manufacturer"
              defaultValue={vessel?.manufacturer}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="engine" className="mb-1 block text-sm text-white/70">
              Motor
            </label>
            <input id="engine" name="engine" defaultValue={vessel?.engine} className={inputClassName} />
          </div>
        </div>
      )}

      {step === "location" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="location" className="mb-1 block text-sm text-white/70">
              Puerto / zona
            </label>
            <input
              id="location"
              name="location"
              required
              defaultValue={vessel?.location}
              className={inputClassName}
            />
          </div>
          <div className="sm:col-span-2">
            <LocationPickerMap value={coordinates} onChange={setCoordinates} />
          </div>
        </div>
      )}

      {step === "media" && (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">Imágenes</label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-accent/20 bg-brand-dark px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/10">
                {uploading ? "Subiendo..." : "Subir fotos"}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
              <span className="text-xs text-white/45">Puedes subir varias imágenes</span>
            </div>
            {allImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {allImages.map((img, idx) => (
                  <div
                    key={img.url + idx}
                    className="relative overflow-hidden rounded-xl border border-accent/15 bg-brand-dark"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={`Preview ${idx + 1}`} className="aspect-[4/3] w-full object-cover" />
                    <div className="mt-2 flex items-center justify-between px-2 py-1.5">
                      <span className="truncate text-xs text-white/55">
                        {img.isExisting ? "Existente" : "Nueva"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          img.isExisting ? removeExistingImage(img.url) : removePreview(img.url)
                        }
                        className="text-xs text-red-400 transition hover:text-red-300"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input type="hidden" name="images" value={existingImages.join("\n")} />
          </div>

          <div>
            <label htmlFor="videos" className="mb-1 block text-sm text-white/70">
              Videos (URLs, una por línea)
            </label>
            <textarea
              id="videos"
              name="videos"
              rows={2}
              defaultValue={vessel?.videos?.join("\n")}
              className={inputClassName}
            />
          </div>
        </div>
      )}

      {step === "extra" && (
        <div>
          <label htmlFor="features" className="mb-1 block text-sm text-white/70">
            Equipamiento (una característica por línea)
          </label>
          <textarea
            id="features"
            name="features"
            rows={4}
            defaultValue={vessel?.features?.join("\n")}
            className={inputClassName}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          {step !== "basic" && (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center justify-center rounded-lg border border-accent/20 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
            >
              Anterior
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/nautica"
            className="inline-flex items-center justify-center rounded-lg border border-accent/20 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
          >
            Cancelar
          </Link>
          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-brand shadow hover:bg-accent-light"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-brand shadow hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear embarcación"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
