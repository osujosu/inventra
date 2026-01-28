"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  FileText,
  ShoppingCart,
  Search,
  Inbox,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyStateVariant =
  | "products"
  | "customers"
  | "orders"
  | "search"
  | "documents"
  | "general";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

const variantIcons: Record<EmptyStateVariant, LucideIcon> = {
  products: Package,
  customers: Users,
  orders: ShoppingCart,
  search: Search,
  documents: FileText,
  general: Inbox,
};

const variantColors: Record<EmptyStateVariant, string> = {
  products: "from-amber-400 to-orange-500",
  customers: "from-blue-400 to-indigo-500",
  orders: "from-emerald-400 to-teal-500",
  search: "from-slate-400 to-slate-500",
  documents: "from-violet-400 to-purple-500",
  general: "from-primary-400 to-primary-600",
};

export function EmptyState({
  variant = "general",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant];
  const gradientColor = variantColors[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {/* Illustrated Icon */}
      <div className="relative mb-6">
        {/* Background glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-2xl opacity-20",
            "bg-gradient-to-br",
            gradientColor
          )}
        />

        {/* Icon container with rings */}
        <div className="relative">
          {/* Outer ring */}
          <div
            className={cn(
              "absolute -inset-4 rounded-full",
              "border border-dashed border-slate-200 dark:border-slate-700",
              "animate-[spin_20s_linear_infinite]"
            )}
          />

          {/* Middle ring */}
          <div
            className={cn(
              "absolute -inset-2 rounded-full",
              "border border-slate-100 dark:border-slate-800"
            )}
          />

          {/* Icon circle */}
          <div
            className={cn(
              "relative flex items-center justify-center w-20 h-20 rounded-full",
              "bg-gradient-to-br",
              gradientColor,
              "shadow-lg"
            )}
          >
            <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
          </div>

          {/* Floating dots decoration */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full",
              "bg-gradient-to-br",
              gradientColor,
              "opacity-60"
            )}
          />
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute -bottom-2 -left-2 w-2 h-2 rounded-full",
              "bg-gradient-to-br",
              gradientColor,
              "opacity-40"
            )}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "text-lg font-semibold text-slate-900 dark:text-white",
          "mb-2"
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-sm text-slate-500 dark:text-slate-400",
            "max-w-sm mb-6"
          )}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button onClick={action.onClick} size="sm">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant="outline" size="sm">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Custom children */}
      {children}
    </motion.div>
  );
}