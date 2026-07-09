"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedImage = images[selectedIndex] ?? images[0];

  const goToPrevious = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, goToPrevious, goToNext]);

  const thumbnails = useMemo(() => images.slice(0, 8), [images]);

  if (!images.length) return null;

  return (
    <div className="property-gallery">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="property-gallery__main group relative block w-full overflow-hidden rounded-2xl bg-brand-dark ring-1 ring-accent/15 transition-shadow hover:shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        aria-label="Abrir galería de imágenes"
      >
        <div className="relative aspect-[16/10] sm:aspect-[5/3]">
          <Image
            src={selectedImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/50 via-transparent to-brand/5" />
        </div>

        <span className="property-gallery__cta absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-brand/70 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm transition-colors group-hover:border-accent/50 group-hover:bg-brand/85">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
            <path d="M2 10.5l3-2.5 2.5 2 3-3 3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ver galería
          <span className="text-white/50">({images.length})</span>
        </span>
      </button>

      {thumbnails.length > 1 && (
        <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {thumbnails.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`property-gallery__thumb group/thumb relative shrink-0 overflow-hidden rounded-xl ring-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                selectedIndex === idx
                  ? "ring-accent/50 shadow-[0_8px_24px_-8px_rgba(201,169,98,0.4)]"
                  : "ring-accent/15 hover:ring-accent/30"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
              aria-current={selectedIndex === idx ? "true" : undefined}
            >
              <div className="relative h-16 w-24 sm:h-20 sm:w-28">
                <Image
                  src={src}
                  alt={`${title} - miniatura ${idx + 1}`}
                  fill
                  sizes="112px"
                  className={`object-cover transition-transform duration-500 group-hover/thumb:scale-105 ${
                    selectedIndex === idx ? "opacity-100" : "opacity-70 group-hover/thumb:opacity-100"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          className="property-gallery-modal fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-6xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-0 z-[2] rounded-full bg-black/50 p-2.5 text-white/80 ring-1 ring-white/10 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Cerrar galería"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4.5 4.5 13.5 13.5M13.5 4.5 4.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative overflow-hidden rounded-2xl bg-brand-dark ring-1 ring-accent/20">
              <div className="relative aspect-[16/10]">
                <Image
                  src={selectedImage}
                  alt={`${title} - imagen ${selectedIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white/80 transition hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Imagen anterior"
              >
                Anterior
              </button>
              <div className="text-sm font-medium text-white/60">
                {selectedIndex + 1} / {images.length}
              </div>
              <button
                type="button"
                onClick={goToNext}
                className="rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white/80 transition hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Siguiente imagen"
              >
                Siguiente
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={`modal-${src}-${idx}`}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-1 transition ${
                    selectedIndex === idx ? "ring-accent/60" : "ring-white/10 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
