"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoSplashProps {
  label?: string
}

export default function LogoSplash({ label = "Beautify" }: LogoSplashProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#fd8d8c]/40 via-background to-primary/15">
      <div className="flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 -m-6 rounded-full bg-primary/25 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-primary/20"
          >
            <Image src="/logo.avif" alt="Beautify" width={80} height={112} className="h-14 w-auto" priority />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-bold tracking-wide text-primary"
        >
          {label}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
