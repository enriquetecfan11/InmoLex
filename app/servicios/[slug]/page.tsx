import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLanding } from "@/components/services/ServiceLanding";
import { getServicePage, SERVICE_PAGES } from "@/lib/service-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Servicio no encontrado" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServiceLanding page={page} />;
}
