import { Hero } from "@/components/home/Hero";
import { HomeFeaturedProperties } from "@/components/home/HomeFeaturedProperties";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { HomeContactCta } from "@/components/home/HomeContactCta";
import { getProperties } from "@/app/actions/property-actions";

export default async function Home() {
  const properties = await getProperties();

  return (
    <>
      <Hero />
      <HomeFeaturedProperties properties={properties} />
      <HomeServicesPreview />
      <HomeWhyChoose />
      <HomeContactCta />
    </>
  );
}
