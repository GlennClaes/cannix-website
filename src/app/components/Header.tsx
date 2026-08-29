"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StaticLogo } from "./AnimatedLogo";
import { Button } from "./ui";
import { languages, useLanguage, type Language } from "@/lib/i18n";

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, languageInfo, t } = useLanguage();

    const closeMenu = () => setIsOpen(false);
    const changeLanguage = (value: Language) => {
        setLanguage(value);
    };
    const navItems = [
        { href: "/home", label: t("nav.home") },
        { href: "/about", label: t("nav.about") },
        { href: "/gallery", label: t("nav.gallery") },
        { href: "/contact", label: t("nav.contact") },
    ];

    return (
        <>
            {/* ================= HEADER ================= */}
            <header className="fixed inset-x-0 top-0 z-[100] h-20 border-none bg-[#03050A]/75 backdrop-blur-md transition-all duration-300">
                <div className="relative flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                    {/* ================= LOGO ================= */}
                    <Link
                        href="/home"
                        className="flex min-w-0 items-center"
                        aria-label={t("header.home")}
                    >
                        <StaticLogo size="header" glow={true} />
                    </Link>

                    {/* ================= DESKTOP NAVIGATIE ================= */}
                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label={t("nav.main")}
                    >
                        {navItems.map((item) => {
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative rounded-full px-5 py-2 text-sm font-semibold tracking-wide",
                                        "text-fg-muted transition-all duration-200",
                                        "hover:text-fg-primary",
                                        active && "text-fg-primary font-bold",
                                    )}
                                >
                                    {item.label}

                                    {active && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-accent-blue/15 border border-accent-blue/30"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ================= DESKTOP CTA ================= */}
                    <div className="hidden lg:flex items-center">
                        <Link href="/contact">
                            <Button glow={true} className="px-6 py-2.5 text-sm font-semibold">
                                {t("booking")}
                            </Button>
                        </Link>
                    </div>

                    <LanguagePicker
                        className="hidden lg:block"
                        language={language}
                        languageInfo={languageInfo}
                        onChange={changeLanguage}
                        label={t("language.label")}
                    />

                    {/* ================= HAMBURGER BUTTON ================= */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((previous) => !previous)}
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl",
                            "border border-border-subtle/60 bg-bg-surface/80 text-fg-primary",
                            "transition-all duration-200 hover:border-accent-blue/50 lg:hidden"
                        )}
                        aria-label={isOpen ? t("nav.close") : t("nav.open")}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isOpen ? "close" : "menu"}
                                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center justify-center"
                            >
                                {isOpen ? (
                                    <X className="h-6 w-6 text-fg-primary" />
                                ) : (
                                    <Menu className="h-6 w-6 text-fg-primary" />
                                )}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </div>
            </header>

            {/* ================= MOBILE MENU DRAWER ================= */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.button
                            type="button"
                            aria-label={t("nav.close")}
                            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                        />

                        {/* MENU PANEL */}
                        <motion.aside
                            id="mobile-menu"
                            className="fixed right-0 top-0 z-[120] flex h-dvh w-[88vw] max-w-[400px] flex-col overflow-y-auto border-l border-border-subtle/50 bg-[#03050A] p-4 shadow-2xl sm:p-6 lg:hidden"
                            initial={{ x: "100%", opacity: 0.9 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.9 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* MOBILE MENU HEADER - LARGE LOGO */}
                            <div className="flex h-14 items-center justify-between gap-3 border-b border-border-subtle/40 pb-4 sm:h-16">
                                <Link
                                    href="/home"
                                    onClick={closeMenu}
                                    aria-label={t("header.home")}
                                    className="flex min-w-0 items-center"
                                >
                                    <StaticLogo size="hamburger" glow={true} />
                                </Link>

                                <button
                                    type="button"
                                    onClick={closeMenu}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle/50 text-fg-muted hover:text-fg-primary"
                                    aria-label={t("nav.close")}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* MOBILE NAVIGATION LINKS */}
                            <nav
                                className="mt-6 flex flex-col gap-2 sm:mt-8"
                                aria-label={t("nav.mobile")}
                            >
                                {navItems.map((item, index) => {
                                    const active = pathname === item.href;

                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.25 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={closeMenu}
                                                className={cn(
                                                    "flex items-center rounded-xl px-5 py-3.5",
                                                    "text-lg font-semibold tracking-wide",
                                                    "text-fg-muted transition-all duration-200",
                                                    "hover:bg-bg-surface hover:text-fg-primary",
                                                    active && "bg-accent-blue/15 text-accent-blue-bright border border-accent-blue/30 font-bold",
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <LanguagePicker
                                className="mt-6 border-t border-border-subtle/40 pt-6"
                                language={language}
                                languageInfo={languageInfo}
                                onChange={changeLanguage}
                                label={t("language.label")}
                            />

                            {/* MOBILE CTA */}
                            <div className="mt-auto shrink-0 pt-8 border-t border-border-subtle/40">
                                <Link href="/contact" onClick={closeMenu} className="block w-full">
                                    <Button fullWidth={true} glow={true} className="py-3.5 text-base font-bold uppercase tracking-wider">
                                        {t("booking")}
                                    </Button>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function LanguagePicker({
    className,
    language,
    languageInfo,
    onChange,
    label,
}: {
    className?: string;
    language: Language;
    languageInfo: (typeof languages)[number];
    onChange: (language: Language) => void;
    label: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex w-full items-center gap-2 rounded-full border border-border-subtle/60 bg-bg-surface/60 px-3 py-2 text-sm font-semibold text-fg-muted transition-colors hover:border-accent-blue/50 hover:text-fg-primary"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`${label}: ${languageInfo.label}`}
            >
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                <span aria-hidden="true" className="text-base leading-none">{languageInfo.flag}</span>
                <span>{languageInfo.label}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        className="absolute right-0 top-full z-[140] min-w-[190px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface p-1.5 shadow-2xl"
                        role="listbox"
                        aria-label={label}
                    >
                        {languages.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                role="option"
                                aria-selected={language === item.value}
                                onClick={() => {
                                    onChange(item.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                                    language === item.value
                                        ? "bg-accent-blue/15 text-accent-blue-bright"
                                        : "text-fg-muted hover:bg-bg-deep hover:text-fg-primary",
                                )}
                            >
                                <span aria-hidden="true" className="text-base leading-none">{item.flag}</span>
                                <span className="flex-1">{item.label}</span>
                                <span className="text-xs uppercase text-fg-muted/60">{item.shortLabel}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
