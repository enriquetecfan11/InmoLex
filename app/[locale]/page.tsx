import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { HomeElite } from "@/components/home/HomeElite";
import { HomeFeaturedProperties } from "@/components/home/HomeFeaturedProperties";
import { HomeFeaturedVessels } from "@/components/home/HomeFeaturedVessels";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { HomeContactCta } from "@/components/home/HomeContactCta";
import { getProperties } from "@/app/actions/property-actions";
import { getVessels } from "@/app/actions/vessel-actions";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [properties, vessels] = await Promise.all([getProperties(), getVessels()]);

  return (
    <>
      <Hero />
      <HomeElite />
      <HomeFeaturedProperties properties={properties} />
      <HomeFeaturedVessels vessels={vessels} />
      <HomeServicesPreview />
      <HomeWhyChoose />
      <HomeContactCta />
    </>
  );
}
