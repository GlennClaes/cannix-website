"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui";
import { useLanguage } from "@/lib/i18n";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem("cannix_cookie_consent");
        if (!consent) {
            // Small delay so the banner slides in smoothly after page load
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cannix_cookie_consent", "accepted");
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cannix_cookie_consent", "declined");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
                >
                    <div className="max-w-3xl mx-auto rounded-2xl bg-bg-surface/95 border border-border-subtle/60 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex-shrink-0 hidden sm:flex">
                                <Cookie className="h-5 w-5 text-accent-blue-bright" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-display text-base font-bold text-fg-primary mb-1.5">
                                    {t("cookie.title")}
                                </h3>
                                <p className="text-sm text-fg-muted leading-relaxed mb-4">
                                    {t("cookie.description")}{" "}
                                    <Link href="/cookies" className="text-accent-blue-bright hover:underline">
                                        {t("cookie.more")}
                                    </Link>
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button
                                        onClick={handleAccept}
                                        glow={false}
                                        className="px-5 py-2 text-sm font-semibold cursor-pointer"
                                    >
                                        {t("cookie.accept")}
                                    </Button>
                                    <button
                                        onClick={handleDecline}
                                        className="px-5 py-2 text-sm font-semibold text-fg-muted hover:text-fg-primary border border-border-subtle/60 rounded-xl bg-transparent hover:bg-bg-surface/80 transition-colors cursor-pointer"
                                    >
                                        {t("cookie.decline")}
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="p-1.5 text-fg-muted/50 hover:text-fg-primary transition-colors flex-shrink-0 cursor-pointer"
                                aria-label={t("close")}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
