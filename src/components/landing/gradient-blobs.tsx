"use client";

import { motion } from "framer-motion";

export function GradientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large organic blob - top right - bold and saturated */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 10, 0],
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -right-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(43, 84, 146, 0.4) 0%, rgba(43, 84, 146, 0.15) 40%, transparent 70%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />

      {/* Secondary blob - bottom left - warm accent */}
      <motion.div
        animate={{
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, -15, 5, 0],
          x: [0, -20, 10, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-[10%] -left-[20%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px]"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.15) 35%, transparent 65%)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
      />

      {/* Accent blob - creates depth */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(43, 84, 146, 0.25) 0%, transparent 60%)",
          borderRadius: "50% 50% 40% 60% / 40% 60% 50% 50%",
        }}
      />

      {/* Small bright accent */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[15%] left-[60%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.35) 0%, transparent 60%)",
          borderRadius: "60% 40% 50% 50%",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.15)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}