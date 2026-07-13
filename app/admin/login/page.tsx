import { getSession } from "@/app/actions/auth-actions";
import { LoginForm } from "./LoginForm";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <LoginForm />
    </div>
  );
}
