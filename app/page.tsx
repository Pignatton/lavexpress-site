import { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyLavexpress } from "@/components/sections/why-lavexpress";
import { QualityStandard } from "@/components/sections/quality-standard";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StoreHighlights } from "@/components/sections/store-highlights";
import { LifeQuality } from "@/components/sections/life-quality";
import { PackagesValueV2 } from "@/components/sections/packages-value-v2";

import { SocialProofGoogle } from "@/components/sections/social-proof-google";
import { BeforeAfter } from "@/components/sections/before-after";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Lavexpress | Lavanderia Delivery em Vitória e Vila Velha",
  description:
    "Lavanderia com coleta e entrega grátis (consulte condições). Atendemos Jardim Camburi, Praia do Canto, Praia da Costa e toda Grande Vitória. Lave edredons, roupas do dia a dia e mais.",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WhyLavexpress />
        <QualityStandard />
        <HowItWorks />
        <ServicesGrid />
        <StoreHighlights />
        <LifeQuality />
        <PackagesValueV2 />

        <SocialProofGoogle />
        <BeforeAfter />
        <div id="faq">
          <Faq />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
