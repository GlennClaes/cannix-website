"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { Button } from "./ui";

interface SplashProps {
    onComplete: () => void;
    hasSeenSplash: boolean;
}

export function Splash({ onComplete, hasSeenSplash }: SplashProps) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (hasSeenSplash || prefersReducedMotion) {
            setShowButton(true);
            return;
        }

        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 450);

        return () => clearTimeout(buttonTimer);
    }, [hasSeenSplash, prefersReducedMotion]);

    // Keyboard / touch handlers to seamlessly enter site
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0 && showButton) {
                onComplete();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const isTriggerKey =
                ["ArrowDown", "PageDown", "Enter", " "].includes(e.key) || e.code === "Space";

            if (isTriggerKey && showButton) {
                e.preventDefault();
                onComplete();
            }
        };

        let touchStartY: number | undefined;

        const handleTouchStart = (e: TouchEvent) => {
            if (showButton) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!showButton || touchStartY === undefined) return;
            const deltaY = e.touches[0].clientY - touchStartY;
            if (deltaY < -50) {
                onComplete();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [showButton, onComplete]);

    if (hasSeenSplash && !prefersReducedMotion) {
        return null;
    }



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn("fixed inset-0 z-splash flex items-center justify-center bg-[#03050A]", hasSeenSplash && "pointer-events-none")}
            role="region"
            aria-label="Welkomscherm"
            style={{ overflow: "hidden" }}
        >
            {/* Ambient radial glow background */}
            <div className="absolute inset-0" aria-hidden="true">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(26, 95, 216, 0.12), transparent 50%), #03050A",
                    }}
                />
            </div>

            {/* Main Content - Central Logo Hero */}
            <motion.div
                className="relative flex flex-col items-center gap-8 px-6 z-10 text-center max-w-4xl"
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.94 }}
                animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Hero Animated Logo */}
                <AnimatedLogo
                    size="splash"
                    animate={!prefersReducedMotion}
                    showGlow={true}
                />

                {/* Subtitle Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-base sm:text-xl font-medium tracking-[0.25em] uppercase text-fg-secondary">
                        Energy. Bass. Connection.
                    </p>
                </motion.div>

                {/* Button Container - Always rendered to prevent layout shift */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showButton ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 flex items-center justify-center w-full"
                    style={{ pointerEvents: showButton ? "auto" : "none" }}
                >
                    <Button
                        onClick={onComplete}
                        glow={true}
                        className="px-12 py-4 text-base font-bold uppercase tracking-wider cursor-pointer"
                        aria-label="Ga verder naar de website"
                    >
                        Ga verder
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}