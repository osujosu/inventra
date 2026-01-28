"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function ChartCard({
  title,
  subtitle,
  children,
  actions,
  className,
  isLoading = false,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50",
        "p-6",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Chart Content */}
      <div className="relative">
        {isLoading ? (
          <div className="space-y-3">
            {/* Skeleton for chart */}
            <div className="h-[200px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-16 rounded bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Subtle gradient accent at bottom */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px",
          "bg-gradient-to-r from-transparent via-primary-300/30 to-transparent",
          "dark:via-primary-600/20"
        )}
      />
    </motion.div>
  );
}