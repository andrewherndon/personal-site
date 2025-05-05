import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-gold/20 placeholder:text-gray-400 focus:border-gold focus:ring focus:ring-gold/20 bg-white/90 flex min-h-16 w-full rounded-md border px-3 py-2 text-black shadow-sm transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }