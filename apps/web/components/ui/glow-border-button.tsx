"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlowBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[]
  duration?: number
  glowIntensity?: "subtle" | "medium" | "intense"
  paused?: boolean
}

export const GlowBorderButton = React.forwardRef<HTMLButtonElement, GlowBorderButtonProps>(
  (
    {
      children,
      colors = ["#3b82f6", "#06b6d4", "#a855f7", "#3b82f6"],
      duration = 3,
      glowIntensity = "medium",
      paused = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const glowConfig = {
      subtle: { blur: "10px", opacity: 0.4 },
      medium: { blur: "20px", opacity: 0.6 },
      intense: { blur: "30px", opacity: 0.8 },
    }

    const { blur, opacity } = glowConfig[glowIntensity]
    const gradient = `conic-gradient(from var(--glow-angle), ${colors.join(", ")}, ${colors[0]})`

    return (
      <button
        className={cn(
          "group relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all cursor-pointer",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        ref={ref}
        style={
          {
            "--glow-duration": `${duration}s`,
            "--glow-blur": blur,
            "--glow-opacity": opacity,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Keyframes injection */}
        <style>{`
        @property --glow-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes glow-rotate {
          from { --glow-angle: 0deg; }
          to { --glow-angle: 360deg; }
        }
      `}</style>

        {/* Glow layer (behind) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[2px] rounded-lg opacity-[var(--glow-opacity)] blur-[var(--glow-blur)]"
          style={{
            background: gradient,
            animation: paused ? "none" : "glow-rotate var(--glow-duration) linear infinite",
          }}
        />

        {/* Border layer */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[2px] rounded-lg"
          style={{
            background: gradient,
            animation: paused ? "none" : "glow-rotate var(--glow-duration) linear infinite",
          }}
        />

        {/* Inner background */}
        <span className="pointer-events-none absolute inset-[2px] rounded-[6px] bg-background" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 text-foreground">{children}</span>
      </button>
    )
  },
)

GlowBorderButton.displayName = "GlowBorderButton"

export default GlowBorderButton
