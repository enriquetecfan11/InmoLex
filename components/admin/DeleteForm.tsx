"use client";

import { useActionState } from "react";
import { deleteProperty } from "@/app/actions/property-actions";

interface DeleteFormProps {
  id: string;
}

const initialState: { error?: string } = {};

export function DeleteForm({ id }: DeleteFormProps) {
  const [state, formAction] = useActionState(deleteProperty.bind(null, id), initialState);

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
      >
        Eliminar
      </button>
      {state.error && <p className="mt-1 text-xs text-red-400">{state.error}</p>}
    </form>
  );
}
