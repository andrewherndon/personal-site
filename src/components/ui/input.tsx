import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 border-gold/20 selection:bg-gold selection:text-background bg-background/90 flex h-10 w-full rounded-md border px-3 py-2 text-black shadow-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-gold focus:ring focus:ring-gold/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }