"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerListProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  y?: number
}

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

const itemVariants = (y: number) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  y = 20,
}: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants(y)}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants(y)}>{children}</motion.div>}
    </motion.div>
  )
}

export default StaggerList
