"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface PropertyCoordinates {
  lat: number;
  lng: number;
}

interface LocationPickerMapProps {
  value: string;
  onChange: (value: string) => void;
}

function parseCoordinates(value: string): PropertyCoordinates | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (
      parsed &&
      typeof parsed.lat === "number" &&
      typeof parsed.lng === "number" &&
      Number.isFinite(parsed.lat) &&
      Number.isFinite(parsed.lng)
    ) {
      return { lat: parsed.lat, lng: parsed.lng };
    }
  } catch {
    return null;
  }
  return null;
}

export function LocationPickerMap({ value, onChange }: LocationPickerMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let marker: import("leaflet").Marker | null = null;
    let cleanup = () => {};

    import("leaflet").then((L) => {
      if (cancelled || !container) return;

      const start =
        parseCoordinates(value) ?? { lat: 40.4168, lng: -3.7038 };

      const M = L as unknown as typeof import("leaflet");

      const icon = M.icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const mapInstance = M.map(container, {
        center: [start.lat, start.lng],
        zoom: value ? 15 : 12,
      });

      M.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        },
      ).addTo(mapInstance);

      const setCoords = (lat: number, lng: number) => {
        onChange(
          JSON.stringify({
            lat: Number(lat.toFixed(6)),
            lng: Number(lng.toFixed(6)),
          }),
        );
      };

      if (value) {
        marker = M.marker([start.lat, start.lng], {
          draggable: true,
          icon,
        }).addTo(mapInstance);
        marker.on("dragend", () => {
          const pos = marker?.getLatLng();
          if (pos) setCoords(pos.lat, pos.lng);
        });
      }

      mapInstance.on("click", (e: import("leaflet").LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = M.marker([lat, lng], { draggable: true, icon }).addTo(
            mapInstance,
          );
          marker.on("dragend", () => {
            const pos = marker?.getLatLng();
            if (pos) setCoords(pos.lat, pos.lng);
          });
        }
        setCoords(lat, lng);
      });

      const onResize = () => mapInstance.invalidateSize();
      window.addEventListener("resize", onResize);

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        mapInstance.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sm:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="block text-sm text-white/70">
          Marca la ubicación en el mapa
        </span>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-400 transition hover:text-red-300"
          >
            Quitar marcador
          </button>
        ) : null}
      </div>
      <div
        ref={containerRef}
        className="h-[360px] w-full overflow-hidden rounded-xl border border-accent/15 bg-brand-dark"
        aria-label="Mapa para seleccionar la ubicación"
      />
      <p className="mt-2 text-xs text-white/45">
        Haz clic en el mapa para fijar la posición o arrastra el marcador.
        {value ? ` Coordenadas: ${value}` : " Sin coordenadas seleccionadas."}
      </p>
    </div>
  );
}
