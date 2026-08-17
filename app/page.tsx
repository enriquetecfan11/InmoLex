import { Hero } from "@/components/home/Hero";
import { HomeFeaturedProperties } from "@/components/home/HomeFeaturedProperties";
import { HomeFeaturedVessels } from "@/components/home/HomeFeaturedVessels";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { HomeContactCta } from "@/components/home/HomeContactCta";
import { getProperties } from "@/app/actions/property-actions";
import { getVessels } from "@/app/actions/vessel-actions";

export default async function Home() {
  const [properties, vessels] = await Promise.all([getProperties(), getVessels()]);

  return (
    <>
      <Hero />
      <HomeFeaturedProperties properties={properties} />
      <HomeFeaturedVessels vessels={vessels} />
      <HomeServicesPreview />
      <HomeWhyChoose />
      <HomeContactCta />
    </>
  );
}
