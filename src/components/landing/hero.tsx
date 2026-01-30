"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBlobs } from "./gradient-blobs";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (line1Ref.current) {
        const chars = line1Ref.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { y: 80, opacity: 0, rotateX: -80 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.015,
            ease: "power4.out",
          },
          0
        );
      }

      if (line2Ref.current) {
        const chars = line2Ref.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { y: 80, opacity: 0, rotateX: -80 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.015,
            ease: "power4.out",
          },
          0.08
        );
      }

      if (line3Ref.current) {
        const chars = line3Ref.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { y: 80, opacity: 0, rotateX: -80 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
          },
          0.16
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] flex flex-col justify-center overflow-hidden bg-background"
    >
      <GradientBlobs />

      {/* Floating side elements - smaller and further left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-3 z-20"
      >
        {["01", "02", "03", "04"].map((num, i) => (
          <motion.a
            key={num}
            href={`#section-${num}`}
            whileHover={{ x: 3 }}
            className={`text-[10px] font-mono transition-colors duration-150 ${
              i === 0 ? "text-foreground" : "text-muted-foreground/30"
            } hover:text-foreground`}
          >
            {num}
          </motion.a>
        ))}
        <div className="w-px h-8 bg-gradient-to-b from-border to-transparent mt-1" />
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Top row - eyebrow + status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Available Now
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              v2.0 — Serial & Warranty Tracking
            </span>
          </motion.div>

          {/* Headline */}
          <div className="relative mb-8">
            {/* Line 1 */}
            <div
              ref={line1Ref}
              className="overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-extralight tracking-tight leading-[1.1] text-foreground/80">
                {splitText("Inventory management")}
              </h1>
            </div>

            {/* Line 2 - with inline dashboard preview */}
            <div
              ref={line2Ref}
              className="overflow-hidden flex items-center gap-2 lg:gap-4 flex-wrap"
              style={{ perspective: "1000px" }}
            >
              <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-foreground">
                {splitText("that")}
              </h1>

              {/* Inline mini dashboard */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[clamp(1.75rem,4.5vw,3.5rem)] px-3 lg:px-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center gap-2 overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 lg:w-1 h-2 lg:h-3 bg-white/60 rounded-full" />
                  <div className="w-0.5 lg:w-1 h-3 lg:h-4 bg-white/80 rounded-full" />
                  <div className="w-0.5 lg:w-1 h-2.5 lg:h-3.5 bg-white/70 rounded-full" />
                  <div className="w-0.5 lg:w-1 h-4 lg:h-5 bg-white rounded-full" />
                </div>
                <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.div>

              <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-foreground">
                {splitText("actually")}
              </h1>
            </div>

             {/* Line 2 - with inline dashboard preview */}
            <div
              ref={line2Ref}
              className="overflow-hidden flex items-center gap-2 lg:gap-4 flex-wrap"
              style={{ perspective: "1000px" }}
            >
              <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-foreground">
                {splitText("works.")}
              </h1>
            </div>
          </div>

          {/* Bottom section - split layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            {/* Left - Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-lg"
            >
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                From the{" "}
                <span className="text-foreground font-medium">first purchase</span>{" "}
                to the{" "}
                <span className="text-foreground font-medium">
                  last warranty claim
                </span>
                . Track every serial number, automate your workflow, and make
                decisions backed by real data.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="group relative bg-foreground hover:bg-foreground/90 text-background px-6 h-11 text-sm font-semibold overflow-hidden transition-colors duration-150"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Building
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="group px-6 h-11 text-sm font-medium hover:bg-transparent"
                  >
                    <span className="border-b border-foreground/20 group-hover:border-foreground pb-0.5 transition-colors duration-150">
                      See it in action
                    </span>
                    <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {[
                { value: "50K+", label: "Products Tracked", color: "bg-amber-500" },
                { value: "99.9%", label: "Uptime", color: "bg-emerald-500" },
                { value: "2.5s", label: "Avg. Transaction", color: "bg-primary-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="group relative px-4 py-3 rounded-xl bg-muted/50 border border-border/50 backdrop-blur-sm hover:border-border cursor-default transition-[border-color] duration-150"
                >
                  <div className={`absolute top-3 left-4 w-1.5 h-1.5 rounded-full ${stat.color}`} />
                  <p className="text-lg lg:text-xl font-bold text-foreground pl-3">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 pl-3">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-1 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}