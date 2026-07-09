import { Hero } from "@/components/home/Hero";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { HomeContactCta } from "@/components/home/HomeContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeServicesPreview />
      <HomeWhyChoose />
      <HomeContactCta />
    </>
  );
}
