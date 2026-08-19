export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/propiedades", key: "properties" },
  { href: "/nautica", key: "nautica" },
  { href: "/servicios", key: "services" },
  { href: "/quienes-somos", key: "about" },
  { href: "/contacto", key: "contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export function isNavLinkActive(pathname: string, href: string): boolean {
  const normalized = pathname.replace(/^\/(en|sv|uk|it|zh|nl|nb|ca)(?=\/|$)/, "") || "/";
  if (href === "/") return normalized === "/";
  return normalized === href || normalized.startsWith(`${href}/`);
}
