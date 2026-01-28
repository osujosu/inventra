"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
  isLoading?: boolean;
  showShortcut?: boolean;
  shortcutKey?: string;
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      onClear,
      isLoading = false,
      showShortcut = false,
      shortcutKey = "K",
      value,
      onChange,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && String(value).length > 0;

    return (
      <div
        className={cn(
          "relative flex items-center",
          "group",
          containerClassName
        )}
      >
        {/* Search Icon */}
        <div
          className={cn(
            "absolute left-3 flex items-center justify-center",
            "text-slate-400 dark:text-slate-500",
            "transition-colors duration-200",
            isFocused && "text-primary-500 dark:text-primary-400"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full h-10 pl-10 pr-10",
            "rounded-xl",
            "bg-slate-100/80 dark:bg-slate-800/80",
            "border border-transparent",
            "text-sm text-slate-900 dark:text-slate-100",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2",
            "focus:ring-primary-500/20 dark:focus:ring-primary-400/20",
            "focus:border-primary-300 dark:focus:border-primary-600",
            "focus:bg-white dark:focus:bg-slate-800",
            "hover:bg-slate-200/50 dark:hover:bg-slate-700/50",
            className
          )}
          {...props}
        />

        {/* Right side: Clear button or Keyboard shortcut */}
        <div className="absolute right-3 flex items-center gap-2">
          {hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                "flex items-center justify-center",
                "w-5 h-5 rounded-md",
                "text-slate-400 hover:text-slate-600",
                "dark:text-slate-500 dark:hover:text-slate-300",
                "hover:bg-slate-200 dark:hover:bg-slate-700",
                "transition-all duration-150"
              )}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : showShortcut && !isFocused ? (
            <kbd
              className={cn(
                "hidden sm:flex items-center gap-0.5",
                "px-1.5 py-0.5 rounded-md",
                "bg-slate-200/80 dark:bg-slate-700/80",
                "text-[10px] font-medium text-slate-500 dark:text-slate-400",
                "border border-slate-300/50 dark:border-slate-600/50"
              )}
            >
              <span className="text-xs">⌘</span>
              {shortcutKey}
            </kbd>
          ) : null}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";