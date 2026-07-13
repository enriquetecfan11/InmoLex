import { logout } from "@/app/actions/auth-actions";
import { getSession } from "@/app/actions/auth-actions";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-accent/10 bg-brand-dark/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="font-display text-lg text-accent">
              InmoLex Admin
            </Link>
          </div>
          {session && (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-accent/20 px-3 py-1.5 text-sm text-accent transition hover:bg-accent/10"
              >
                Cerrar sesión
              </button>
            </form>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
