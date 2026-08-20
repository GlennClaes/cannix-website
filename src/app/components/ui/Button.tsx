"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PremiumButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    glow?: boolean;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
}

export function PremiumButton({
    children,
    variant = "primary",
    icon,
    iconPosition = "right",
    glow = true,
    fullWidth = false,
    className,
    disabled,
    loading,
    onClick,
    type = "button",
    ...props
}: PremiumButtonProps) {
    const isLoading = loading;

    const variantClasses = {
        primary: cn(
            "bg-gradient-to-r from-accent-blue via-accent-blue-bright to-accent-blue",
            "text-white font-bold",
            "border border-white/20",
            "shadow-[0_4px_24px_-4px_rgba(42,122,234,0.65)]",
            "hover:shadow-[0_8px_32px_-4px_rgba(42,122,234,0.85)]",
        ),
        secondary: cn(
            "bg-bg-card/90 text-fg-primary font-semibold",
            "border border-border-subtle",
            "hover:border-accent-blue/50 hover:bg-bg-surface hover:text-accent-blue-bright",
            "shadow-sm",
        ),
        ghost: cn(
            "bg-transparent text-fg-muted font-medium",
            "hover:bg-bg-surface hover:text-fg-primary",
        ),
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileHover={disabled || isLoading ? {} : { scale: 1.015, y: -1 }}
            whileTap={disabled || isLoading ? {} : { scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={cn(
                "group relative inline-flex items-center justify-center gap-2.5",
                "px-7 py-3 text-base tracking-wide",
                "rounded-full overflow-hidden",
                "transition-colors duration-200",
                "cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-bright",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variantClasses[variant],
                fullWidth && "w-full",
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Subtle shine on primary variant */}
            {variant === "primary" && (
                <span
                    className="
                        absolute inset-0
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -translate-x-full group-hover:translate-x-full
                        transition-transform duration-700 pointer-events-none
                    "
                />
            )}

            {/* Soft glow on primary variant */}
            {glow && variant === "primary" && (
                <span
                    className="
                        absolute -inset-px rounded-full bg-accent-blue/40
                        blur-xl opacity-0 group-hover:opacity-70
                        transition-opacity duration-300 -z-10
                    "
                />
            )}

            {/* Icon Left */}
            {icon && iconPosition === "left" && !isLoading && (
                <span className="flex-shrink-0" aria-hidden="true">
                    {icon}
                </span>
            )}

            {/* Text Content */}
            <span>{isLoading ? null : children}</span>

            {/* Icon Right */}
            {icon && iconPosition === "right" && !isLoading && (
                <span className="flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
                    {icon}
                </span>
            )}

            {/* Loading Spinner */}
            {isLoading && (
                <svg
                    className="animate-spin h-5 w-5 text-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                    />
                    <path
                        className="opacity-80"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
        </motion.button>
    );
}