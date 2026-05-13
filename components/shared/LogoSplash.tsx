"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoSplashProps {
  label?: string
}

export default function LogoSplash({ label = "Beautify" }: LogoSplashProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-white"
            style={{
              boxShadow:
                "0 14px 32px -10px color-mix(in oklch, var(--primary) 35%, transparent), 0 0 0 1px color-mix(in oklch, var(--primary) 12%, transparent)",
              willChange: "transform",
            }}
          >
            <Image src="/logo.avif" alt="Beautify" width={80} height={112} className="h-14 w-auto" priority />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-bold tracking-wide text-primary"
        >
          {label}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
              style={{ willChange: "opacity" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
