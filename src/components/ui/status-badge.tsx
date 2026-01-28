"use client";

import { ReactNode } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Package,
  Wrench,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CircleDashed,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Predefined status types
type SerialStatus = "in_stock" | "sold" | "reserved" | "defective" | "in_repair" | "scrapped";
type WarrantyStatus = "active" | "expiring_soon" | "expired" | "not_applicable";
type ClaimStatus = "pending" | "in_review" | "in_repair" | "repaired" | "replaced" | "rejected" | "closed";
type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
type GeneralStatus = "active" | "inactive" | "draft" | "archived";

type StatusType = 
  | SerialStatus 
  | WarrantyStatus 
  | ClaimStatus 
  | OrderStatus 
  | GeneralStatus
  | string;

interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

const statusConfigs: Record<string, StatusConfig> = {
  // Serial statuses
  in_stock: {
    label: "In Stock",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: Package,
  },
  sold: {
    label: "Sold",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: CheckCircle2,
  },
  reserved: {
    label: "Reserved",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    icon: Clock,
  },
  defective: {
    label: "Defective",
    color: "text-rose-700 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    icon: AlertCircle,
  },
  in_repair: {
    label: "In Repair",
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    icon: Wrench,
  },
  scrapped: {
    label: "Scrapped",
    color: "text-slate-700 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-300 dark:border-slate-700",
    icon: Trash2,
  },

  // Warranty statuses
  active: {
    label: "Active",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: ShieldCheck,
  },
  expiring_soon: {
    label: "Expiring Soon",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    icon: ShieldAlert,
  },
  expired: {
    label: "Expired",
    color: "text-rose-700 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    icon: ShieldX,
  },
  not_applicable: {
    label: "N/A",
    color: "text-slate-500 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-200 dark:border-slate-700",
    icon: CircleDashed,
  },

  // Claim statuses
  pending: {
    label: "Pending",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    icon: Clock,
  },
  in_review: {
    label: "In Review",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: AlertCircle,
  },
  repaired: {
    label: "Repaired",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: CheckCircle2,
  },
  replaced: {
    label: "Replaced",
    color: "text-violet-700 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    icon: Package,
  },
  rejected: {
    label: "Rejected",
    color: "text-rose-700 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    icon: XCircle,
  },
  closed: {
    label: "Closed",
    color: "text-slate-700 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-300 dark:border-slate-700",
    icon: CheckCircle2,
  },

  // Order statuses
  processing: {
    label: "Processing",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-rose-700 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-200 dark:border-rose-800",
    icon: XCircle,
  },

  // General statuses
  inactive: {
    label: "Inactive",
    color: "text-slate-500 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-200 dark:border-slate-700",
    icon: CircleDashed,
  },
  draft: {
    label: "Draft",
    color: "text-slate-500 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-200 dark:border-slate-700",
    icon: CircleDashed,
  },
  archived: {
    label: "Archived",
    color: "text-slate-500 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-200 dark:border-slate-700",
    icon: Trash2,
  },
};

interface StatusBadgeProps {
  status: StatusType;
  customLabel?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({
  status,
  customLabel,
  showIcon = true,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusConfigs[status] || {
    label: status,
    color: "text-slate-700 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800/50",
    borderColor: "border-slate-300 dark:border-slate-700",
    icon: CircleDashed,
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        "border",
        config.color,
        config.bgColor,
        config.borderColor,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{customLabel || config.label}</span>
    </span>
  );
}