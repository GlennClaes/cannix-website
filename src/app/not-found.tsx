"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { AnimatedLogo } from "@/app/components/AnimatedLogo";
import { BackgroundSystem } from "@/app/components/BackgroundSystem";
import { Button } from "@/app/components/ui";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Photo background system */}
      <BackgroundSystem />

      {/* Ambient center blue glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vmax] h-[50vmax] rounded-full bg-accent-blue/15 blur-[200px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.1, 1], opacity: [0, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto py-16"
      >
        {/* Large Bright Logo */}
        <AnimatedLogo size="xl" animate={true} showGlow={true} />

        {/* 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6"
        >
          <span className="font-display text-7xl sm:text-9xl font-extrabold tracking-tight text-fg-primary drop-shadow-[0_0_35px_rgba(42,122,234,0.5)]">
            404
          </span>
        </motion.div>

        {/* Dutch Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-fg-primary">
            Pagina niet gevonden
          </h1>
          <p className="text-fg-muted leading-relaxed text-base sm:text-lg">
            De pagina die je zoekt bestaat niet of is verplaatst.
            Geen worries — de beat gaat door.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/home" className="w-full sm:w-auto">
            <Button
              glow={true}
              icon={<ArrowLeft className="h-5 w-5" />}
              iconPosition="left"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold uppercase tracking-wider"
            >
              Terug naar Home
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              icon={<Calendar className="h-5 w-5" />}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold"
            >
              Boek Cannix
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}