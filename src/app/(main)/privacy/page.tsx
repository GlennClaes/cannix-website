"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function PrivacyPage() {
    const { t } = useLanguage();
    const sections = Array.from({ length: 7 }, (_, index) => {
        const [title, content] = t(`privacy.s${index + 1}`).split("|");
        return { title, content };
    });
    return (
        <div className="min-h-screen">
            <section className="py-10 sm:py-16 px-4 sm:px-6 container">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex-shrink-0">
                            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-accent-blue-bright" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-accent-blue-bright uppercase tracking-wider">{t("legal.privacy")}</span>
                    </div>

                    <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 break-words">
                        {t("privacy.title")}
                    </h1>
                    <p className="text-fg-muted text-sm sm:text-base mb-2">
                        {t("privacy.updated")}
                    </p>
                    <p className="text-fg-muted leading-relaxed mb-8 sm:mb-12 text-sm sm:text-lg">
                        {t("privacy.intro")}
                    </p>

                    <div className="space-y-8 sm:space-y-10">
                        {sections.map((section) => (
                            <div key={section.title} className="border-l-2 border-accent-blue/30 pl-4 sm:pl-6">
                                <h2 className="font-display text-base sm:text-xl font-bold mb-2 sm:mb-3 text-fg-primary">{section.title}</h2>
                                <p className="text-fg-muted text-sm sm:text-base leading-relaxed break-words">{section.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border-subtle/40 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-fg-muted">
                        <Link href="/terms" className="hover:text-accent-blue-bright transition-colors py-1">{t("legal.terms")}</Link>
                        <Link href="/cookies" className="hover:text-accent-blue-bright transition-colors py-1">{t("legal.cookies")}</Link>
                        <Link href="/contact" className="hover:text-accent-blue-bright transition-colors py-1">{t("legal.contact")}</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
