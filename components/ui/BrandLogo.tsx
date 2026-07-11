import { HouseIcon } from "@/components/ui/HouseIcon";

interface BrandLogoProps {
  showName?: boolean;
  className?: string;
}

export function BrandLogo({ showName = true, className = "" }: BrandLogoProps) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      {/* TODO: sustituir por logo real de Inmobiliaria Cero en public/brand/logo.svg */}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08] text-accent sm:h-10 sm:w-10">
        <HouseIcon size={20} />
      </span>
      {showName && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-display text-xl tracking-tight text-accent sm:text-2xl">
            InmoLex
          </span>
          <span className="mt-0.5 truncate text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/40">
            Inmobiliaria Cero
          </span>
        </span>
      )}
    </span>
  );
}