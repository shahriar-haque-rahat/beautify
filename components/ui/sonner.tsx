"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          "--success-bg": "var(--primary)",
          "--success-text": "var(--primary-foreground)",
          "--success-border": "color-mix(in oklch, var(--primary) 80%, white)",

          "--error-bg": "var(--destructive)",
          "--error-text": "var(--destructive-foreground)",
          "--error-border": "color-mix(in oklch, var(--destructive) 80%, white)",

          "--info-bg": "var(--accent)",
          "--info-text": "var(--accent-foreground)",
          "--info-border": "color-mix(in oklch, var(--accent) 80%, white)",

          "--warning-bg": "var(--accent)",
          "--warning-text": "var(--accent-foreground)",
          "--warning-border": "color-mix(in oklch, var(--accent) 80%, white)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
