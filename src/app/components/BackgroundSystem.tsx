"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const backgroundImage = "/images/cannix_background_2.JPG";

export function BackgroundSystem() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="fixed inset-0 -z-10 bg-[#03050A]" aria-hidden="true" />;
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#03050A]" aria-hidden="true">
            {/* Background Photo 2 - Complete image with smooth side-edge fade into #03050A */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 12%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.85) 88%, transparent 100%)",
                    maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 12%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.85) 88%, transparent 100%)",
                }}
            >
                <Image
                    src={backgroundImage}
                    alt="DJ Cannix"
                    fill
                    priority
                    unoptimized={true}
                    className="object-contain object-center"
                    sizes="100vw"
                />
            </motion.div>

            {/* Dark gradient overlays for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#03050A]/70 via-[#03050A]/30 to-[#03050A]/85 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(3,5,10,0.80)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,95,216,0.08),transparent_50%)] pointer-events-none" />
        </div>
    );
}