import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none shadow-[4px_4px_0px_rgba(0,0,0,0.75)]",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-background border-2 border-gold hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.75)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border-2 border-gold bg-transparent text-gold shadow-sm hover:bg-gold hover:text-background hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.75)]",
        secondary:
          "bg-white text-background shadow-sm hover:bg-gray-100 border border-gray-200",
        ghost:
          "hover:bg-gold/10 hover:text-gold shadow-none",
        link: "text-gold underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg gap-1.5 px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }