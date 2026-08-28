"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Splash } from "./components/Splash";

export default function SplashPage() {
  const router = useRouter();
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
      <h1 className="sr-only">Cannix - Belgische DJ en producer</h1>
      <p className="sr-only">
        Boek Cannix voor fuiven, clubs, festivals, raves en private events in België en Europa.
      </p>
      <Splash onComplete={handleComplete} hasSeenSplash={hasSeenSplash} />
    </AnimatePresence>
  );
}