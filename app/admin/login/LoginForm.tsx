"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth-actions";

const initialState: { error?: string } = {};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-5 rounded-xl border border-accent/15 bg-brand p-6 sm:p-8">
      <div>
        <h1 className="font-display text-2xl text-accent">Acceso admin</h1>
        <p className="mt-1 text-sm text-white/50">Inicia sesión para gestionar propiedades</p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-white/70">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-accent/20 bg-brand-dark px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
            placeholder="admin@inmolex.es"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-white/70">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-accent/20 bg-brand-dark px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
            placeholder="••••••••"
          />
        </div>
      </div>
      {state.error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">{state.error}</p>
      )}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-brand shadow hover:bg-accent-light"
      >
        Entrar
      </button>
    </form>
  );
}
