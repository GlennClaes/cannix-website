"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Splash } from "./components/Splash";
import { useLanguage } from "@/lib/i18n";

export default function SplashPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cannix-splash-seen") === "true";
    setHasSeenSplash(seen);
    if (seen) router.replace("/home");
  }, [router]);

  const handleComplete = () => {
    sessionStorage.setItem("cannix-splash-seen", "true");
    setHasSeenSplash(true);
    router.push("/home");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key="splash-page">
        <h1 className="sr-only">Cannix - {t("home.description")}</h1>
        <p className="sr-only">{t("booking")}</p>
        <Splash onComplete={handleComplete} hasSeenSplash={hasSeenSplash} />
      </motion.div>
    </AnimatePresence>
  );
}