import { getContent } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  const content = getContent("home");
  const heroData = content.sections.find((s: any) => s.type === "hero")?.data;
  const featuresData = content.sections.find((s: any) => s.type === "features")?.data;
  const pricingData = content.sections.find((s: any) => s.type === "pricing")?.data;

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* SOTA Touch: Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <FadeIn>
          <Hero data={heroData} />
        </FadeIn>

        {/* Features Section */}
        <FadeIn delay={0.2}>
          <Features data={featuresData} />
        </FadeIn>

        {/* Pricing Section */}
        <FadeIn delay={0.2}>
          <Pricing data={pricingData} />
        </FadeIn>

        {/* Contact Section */}
        <FadeIn delay={0.2}>
          <Contact />
        </FadeIn>

      </div>
    </main>
  );
}