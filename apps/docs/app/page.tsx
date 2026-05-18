import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CricketMind Docs | Developer Documentation Center",
  description: "Developer documentation center for the Live second-screen interaction systems. Developed by Suryanshu Nabheet under the MIT License.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6 font-sans antialiased selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* Dynamic ambient gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-background to-background -z-10 pointer-events-none" />

      <div className="text-center space-y-6 max-w-lg">
        {/* Custom CricketMind Wickets SVG Emblem for Docs */}
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-sky-500/20 text-white p-3.5 mb-2">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-full h-full text-white"
          >
            <path d="M6 3v18M12 1v20M18 3v18" strokeWidth="2.5" />
            <path d="M4 3h16" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3.5" fill="currentColor" className="text-sky-400" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-foreground">Cricket</span><span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Mind</span> Docs
        </h1>
        
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          Developer documentation center for the Live second-screen interaction systems.
        </p>

        <div className="border-t border-border/60 pt-6">
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-muted-foreground">
            <span>Developed by <span className="text-foreground font-semibold">Suryanshu Nabheet</span></span>
            <span className="text-border">•</span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </div>
  );
}
