import type { Metadata } from "next";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";

export const metadata: Metadata = {
  title: "CricketMind | Live Second-Screen Fan Interactions",
  description: "Live second-screen interaction platform. Enhancing live sporting events beyond passive viewing. Developed by Suryanshu Nabheet under the MIT License.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary antialiased relative pb-16">
      {/* Sleek ambient background stadium glow (IPL Metallic Theme) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-background to-background -z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

      {/* Navigation Header - Fixed at top level for proper sticky scrolling */}
      <Header />

      {/* Main Content Arena */}
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {/* Core Hero Section */}
        <HeroSection />

        {/* Live Partners Logo Grid */}
        <div className="mt-16">
          <LogosSection />
        </div>
      </main>

      {/* Google Developer Groups Watermark Banner */}
      <div className="max-w-md mx-auto mt-20 mb-8 px-6 py-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-xs flex flex-col items-center justify-center gap-3 select-none">
        <span className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest font-mono">
          Presented in association with
        </span>

        <img
          src="/GDG.png"
          alt="Google Developer Group Logo"
          className="h-28 md:h-36 w-auto object-contain brightness-100 scale-110 md:scale-125 my-1"
        />
      </div>
      {/* Footer Branding */}
      <footer className="border-t border-border/50 bg-card/25 py-10 mt-20 text-center text-sm text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base font-semibold text-foreground tracking-tight">© 2026 CricketMind. All Rights Reserved.</p>
          <p className="font-mono text-xs md:text-sm">
            Developed by <span className="text-foreground font-bold">Suryanshu Nabheet</span> • MIT License
          </p>
        </div>
      </footer>
    </div>
  );
}
