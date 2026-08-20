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
        scale:   [1, 1.07, 0.99, 1.04, 1, 1.08, 0.99, 1.05, 1, 1.01, 1.03, 1.07, 1.12, 0.98, 1.06, 1],
        rotateX: [0, -3,   1,    0,    0, 4,    -2,   0,    0, 0,    1,    3,    -5,   2,    -2,   0],
        rotateY: [0, 4,   -2,    0,    0, -5,    2,   0,    0, 0,   -1,   -3,     6,  -2,    2,   0],
        filter: [
            "drop-shadow(0 0 35px rgba(42, 122, 234, 0.55)) brightness(1.15)",
            "drop-shadow(0 0 58px rgba(42, 122, 234, 0.80)) brightness(1.28)",
            "drop-shadow(0 0 38px rgba(42, 122, 234, 0.58)) brightness(1.18)",
            "drop-shadow(0 0 48px rgba(42, 122, 234, 0.70)) brightness(1.22)",
            "drop-shadow(0 0 35px rgba(42, 122, 234, 0.55)) brightness(1.15)",
            "drop-shadow(0 0 62px rgba(42, 122, 234, 0.82)) brightness(1.30)",
            "drop-shadow(0 0 38px rgba(42, 122, 234, 0.58)) brightness(1.18)",
            "drop-shadow(0 0 50px rgba(42, 122, 234, 0.72)) brightness(1.24)",
            "drop-shadow(0 0 35px rgba(42, 122, 234, 0.55)) brightness(1.15)",
            "drop-shadow(0 0 38px rgba(42, 122, 234, 0.58)) brightness(1.16)",
            "drop-shadow(0 0 45px rgba(42, 122, 234, 0.65)) brightness(1.20)",
            "drop-shadow(0 0 55px rgba(42, 122, 234, 0.76)) brightness(1.26)",
            "drop-shadow(0 0 75px rgba(42, 122, 234, 0.88)) brightness(1.35)",
            "drop-shadow(0 0 36px rgba(42, 122, 234, 0.56)) brightness(1.16)",
            "drop-shadow(0 0 52px rgba(42, 122, 234, 0.74)) brightness(1.24)",
            "drop-shadow(0 0 35px rgba(42, 122, 234, 0.55)) brightness(1.15)",
        ],
    } : animate ? { opacity: 1, scale: 1 } : {};

    const beatTransition = size === "splash" && animate ? {
        duration: 5.6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.08, 0.16, 0.24, 0.35, 0.44, 0.52, 0.60, 0.70, 0.75, 0.80, 0.85, 0.90, 0.93, 0.96, 1],
    } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

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
                src="/images/logo_cannix.png"
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
}: { className?: string; size?: "sm" | "md" | "lg" | "hamburger"; withBgWrapper?: boolean; glow?: boolean }) {
    const sizeClasses = {
        sm: "h-10 w-[140px]",
        md: "h-14 w-[210px]",
        lg: "h-18 w-[270px]",
        hamburger: "h-16 w-[230px] sm:h-20 sm:w-[280px]",
    };

    const glowClasses = {
        sm: "drop-shadow-glow-blue",
        md: "drop-shadow-glow-blue",
        lg: "drop-shadow-glow-blue-lg",
        hamburger: "drop-shadow-glow-blue-lg",
    };

    return (
        <div className={cn("relative flex shrink-0 items-center justify-center", sizeClasses[size], className)}>
            <Image
                src="/images/logo_cannix.png"
                alt="Cannix logo"
                fill
                className={cn("object-contain brightness-[1.18] contrast-[1.10]", glow && glowClasses[size])}
                priority
                sizes={size === "hamburger" ? "280px" : size === "lg" ? "270px" : size === "md" ? "210px" : "140px"}
            />
        </div>
    );
}