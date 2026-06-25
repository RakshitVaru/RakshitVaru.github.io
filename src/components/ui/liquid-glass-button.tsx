import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// The glass shadow adapts via CSS variable —
// --glass-shadow is set in index.css per theme (dark/light)
const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none transition-transform",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 active:scale-95",
        ghost:   "hover:brightness-110 active:scale-95",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-10 px-6",
        xl:      "h-12 px-8",
        icon:    "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

interface LiquidButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean
}

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: LiquidButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn("relative", liquidbuttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Glass surface — shadow values from CSS variable (theme-aware) */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{ boxShadow: 'var(--glass-shadow)' }}
      />

      {/* Backdrop distortion layer */}
      <div
        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
        style={{ backdropFilter: 'url("#glass-filter") blur(6px)' }}
      />

      {/* Content */}
      <div className="relative z-10 pointer-events-none flex items-center justify-center">
        {children}
      </div>

      <GlassFilter />
    </Comp>
  )
}

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="60" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export { liquidbuttonVariants }
