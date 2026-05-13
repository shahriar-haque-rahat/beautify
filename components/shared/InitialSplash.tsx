"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LogoSplash from "./LogoSplash"

export default function InitialSplash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const minDisplay = 900
    const start = performance.now()
    const dismiss = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, minDisplay - elapsed)
      setTimeout(() => setVisible(false), wait)
    }

    if (document.readyState === "complete") {
      dismiss()
    } else {
      window.addEventListener("load", dismiss, { once: true })
      const safety = setTimeout(dismiss, 2500)
      return () => {
        window.removeEventListener("load", dismiss)
        clearTimeout(safety)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100]"
        >
          <LogoSplash />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
