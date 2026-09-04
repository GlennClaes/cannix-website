"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "splash";
    animate?: boolean;
    showGlow?: boolean;
    withBgWrapper?: boolean;
}

export function AnimatedLogo({
    className,
    size = "md",
    animate = true,
    showGlow = true,
    withBgWrapper = false,
}: AnimatedLogoProps) {
    const sizeClasses = {
        sm: "w-32 h-10",
        md: "w-52 h-16",
        lg: "w-80 h-24",
        xl: "w-[420px] h-32",
        splash: "w-[520px] sm:w-[680px] lg:w-[840px] h-36 sm:h-48 lg:h-56 max-w-[92vw]",
    };

    const glowSizes = {
        sm: "drop-shadow-glow-blue",
        md: "drop-shadow-glow-blue",
        lg: "drop-shadow-glow-blue-lg",
        xl: "drop-shadow-glow-blue-lg",
        splash: "drop-shadow-glow-blue-lg",
    };

    // Realistic DJ track playback animation loop (verse beat -> snare fill -> build-up -> bass drop)
    const beatAnimate = size === "splash" && animate ? {
        opacity: 1,
        scale: [1, 1.04, 1],
    } : animate ? { opacity: 1, scale: 1 } : {};

    const beatTransition = size === "splash" && animate ? {
        duration: 3.2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        times: [0, 0.5, 1],
    } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

    const LogoContent = (
        <motion.div
            className={cn("relative flex items-center justify-center", sizeClasses[size])}
            style={size === "splash" ? { perspective: 1000, transformStyle: "preserve-3d" } : undefined}
            initial={{ opacity: 1, scale: 1 }}
            animate={beatAnimate}
            transition={beatTransition}
            whileHover={{
                scale: size === "splash" ? 1.02 : 1.04,
                transition: { duration: 0.25, ease: "easeOut" },
            }}
        >
            <Image
                src="/images/logo_cannix.webp"
                alt="Cannix logo"
                fill
                priority={size === "splash" || size === "lg"}
                className={cn(
                    "object-contain transition-all duration-300",
                    showGlow && glowSizes[size]
                )}
                sizes={size === "splash" ? "92vw" : size === "xl" ? "420px" : size === "lg" ? "320px" : "208px"}
            />
        </motion.div>
    );

    return (
        <div className={cn("relative flex items-center justify-center shrink-0", sizeClasses[size], className)}>
            {LogoContent}
        </div>
    );
}

/* ========================================================= STATIC LOGO ========================================================= */
export function StaticLogo({
    className,
    size = "md",
    glow = true,
}: { className?: string; size?: "sm" | "md" | "lg" | "header" | "hamburger"; withBgWrapper?: boolean; glow?: boolean }) {
    const sizeClasses = {
        sm: "h-10 w-[140px]",
        md: "h-14 w-[210px]",
        lg: "h-18 w-[270px]",
        header: "h-14 w-[190px] sm:h-16 sm:w-[220px] lg:h-18 lg:w-[270px]",
        hamburger: "h-12 w-[170px] sm:h-16 sm:w-[230px]",
    };

    const glowClasses = {
        sm: "drop-shadow-glow-blue",
        md: "drop-shadow-glow-blue",
        lg: "drop-shadow-glow-blue-lg",
        header: "drop-shadow-glow-blue-lg",
        hamburger: "drop-shadow-glow-blue-lg",
    };

    return (
        <div className={cn("relative flex shrink-0 items-center justify-center", sizeClasses[size], className)}>
            <Image
                src="/images/logo_cannix.webp"
                alt="Cannix logo"
                fill
                className={cn("object-contain brightness-[1.18] contrast-[1.10]", glow && glowClasses[size])}
                priority
                sizes={size === "hamburger" ? "(max-width: 640px) 170px, 230px" : size === "header" ? "(max-width: 640px) 190px, (max-width: 1024px) 220px, 270px" : size === "lg" ? "270px" : size === "md" ? "210px" : "140px"}
            />
        </div>
    );
}
