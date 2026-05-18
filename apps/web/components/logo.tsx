import type React from "react";

export const LogoIcon = (props: React.ComponentProps<"svg">) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    {/* Stylized Wickets */}
    <path d="M6 3v18M12 1v20M18 3v18" strokeWidth="2.5" />
    {/* Wicket Bails */}
    <path d="M4 3h16" strokeWidth="1.5" />
    {/* Glowing energy mind ball inside wickets */}
    <circle cx="12" cy="12" r="3.5" fill="currentColor" className="text-sky-500" />
    <circle cx="12" cy="12" r="5.5" stroke="currentColor" className="text-sky-500/40" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const Logo = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div 
    className={`flex items-center gap-2.5 font-sans font-bold tracking-tight text-foreground select-none ${className || ""}`} 
    {...props}
  >
    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white p-1">
      <LogoIcon className="w-full h-full text-white" />
    </div>
    <span className="font-extrabold text-base tracking-tight">
      <span className="text-foreground">Cricket</span>
      <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Mind</span>
    </span>
  </div>
);
