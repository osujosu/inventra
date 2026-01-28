"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("mb-8", className)}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm mb-3">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center text-slate-400 hover:text-slate-600",
              "dark:text-slate-500 dark:hover:text-slate-300",
              "transition-colors"
            )}
          >
            <Home className="w-4 h-4" />
          </Link>

          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-1" />
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-slate-500 hover:text-slate-700",
                    "dark:text-slate-400 dark:hover:text-slate-200",
                    "transition-colors"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title and Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={cn(
              "text-2xl sm:text-3xl font-bold tracking-tight",
              "text-slate-900 dark:text-white",
              "font-display"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>
        )}
      </div>
    </motion.div>
  );
}