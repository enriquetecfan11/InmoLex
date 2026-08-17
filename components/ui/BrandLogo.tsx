import Image from "next/image";

export const BRAND_LOGO = {
  src: "/brand/logo-web.png",
  width: 438,
  height: 393,
  alt: "InmoLex — Inmobiliaria Cero",
} as const;

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
}

export function BrandLogo({
  className = "",
  imageClassName = "h-9 w-auto shrink-0 sm:h-10",
}: BrandLogoProps) {
  return (
    <span className={`inline-flex min-w-0 items-center ${className}`}>
      <Image
        src={BRAND_LOGO.src}
        alt={BRAND_LOGO.alt}
        width={BRAND_LOGO.width}
        height={BRAND_LOGO.height}
        className={imageClassName}
        priority
      />
    </span>
  );
}
