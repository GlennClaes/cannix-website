import { Metadata } from "next";
import Link from "next/link";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
    title: "Cookiebeleid | DJ Cannix",
    description: "Hoe DJ Cannix omgaat met cookies en vergelijkbare technologieën.",
};

const cookieTypes = [
    {
        name: "Functionele cookies",
        essential: true,
        description: "Noodzakelijk voor het functioneren van de website (sessiebeheer, navigatie). Deze cookies kunnen niet uitgeschakeld worden.",
        examples: "Sessie-ID, taalvoorkeur, navigatiestaat",
        duration: "Sessie / max. 1 jaar",
    },
    {
        name: "Analytische cookies",
        essential: false,
        description: "Helpen ons begrijpen hoe bezoekers de website gebruiken. Wij gebruiken momenteel geen externe analytische diensten (geen Google Analytics).",
        examples: "Geen externe trackers actief",
        duration: "Niet van toepassing",
    },
    {
        name: "Marketing cookies",
        essential: false,
        description: "Wij plaatsen geen marketing- of advertentiecookies. Er worden geen gegevens gedeeld met advertentienetwerken.",
        examples: "Geen advertentiecookies",
        duration: "Niet van toepassing",
    },
];

export default function CookiesPage() {
    return (
        <div className="min-h-screen">
            <section className="py-10 sm:py-16 px-4 sm:px-6 container">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex-shrink-0">
                            <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-accent-blue-bright" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-accent-blue-bright uppercase tracking-wider">Cookiebeleid</span>
                    </div>

                    <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 break-words">
                        Cookiebeleid
                    </h1>
                    <p className="text-fg-muted text-sm sm:text-base mb-2">Laatst bijgewerkt: augustus 2026</p>
                    <p className="text-fg-muted leading-relaxed mb-8 sm:mb-12 text-sm sm:text-lg">
                        De website van DJ Cannix gebruikt enkel functionele cookies die strikt noodzakelijk zijn voor de werking van de site. Wij plaatsen geen tracking-, marketing- of analyticscookies zonder uw toestemming.
                    </p>

                    {/* What are cookies */}
                    <div className="border-l-2 border-accent-blue/30 pl-4 sm:pl-6 mb-8 sm:mb-10">
                        <h2 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-fg-primary">Wat zijn cookies?</h2>
                        <p className="text-fg-muted text-sm sm:text-base leading-relaxed">
                            Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u een website bezoekt. Ze worden gebruikt om de website correct te laten functioneren, uw voorkeuren te onthouden en het gebruik van de site te analyseren.
                        </p>
                    </div>

                    {/* Cookie Table */}
                    <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-fg-primary">Welke cookies gebruiken we?</h2>
                    <div className="space-y-4 mb-8 sm:mb-12">
                        {cookieTypes.map((cookie) => (
                            <div
                                key={cookie.name}
                                className="rounded-2xl border border-border-subtle/60 bg-bg-surface/30 backdrop-blur-sm p-4 sm:p-6"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                                    <h3 className="font-display text-base sm:text-lg font-bold text-fg-primary">{cookie.name}</h3>
                                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold self-start sm:self-auto flex-shrink-0 ${
                                        cookie.essential
                                            ? "bg-accent-blue/20 text-accent-blue-bright border border-accent-blue/40"
                                            : "bg-bg-deep text-fg-muted border border-border-subtle"
                                    }`}>
                                        {cookie.essential ? "Altijd actief" : "Niet actief"}
                                    </span>
                                </div>
                                <p className="text-fg-muted text-xs sm:text-sm leading-relaxed mb-4">{cookie.description}</p>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs text-fg-muted/70">
                                    <div>
                                        <span className="font-semibold text-fg-muted">Voorbeelden:</span>
                                        <p>{cookie.examples}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-fg-muted">Bewaarduur:</span>
                                        <p>{cookie.duration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Managing cookies */}
                    <div className="border-l-2 border-accent-blue/30 pl-4 sm:pl-6 mb-8 sm:mb-10">
                        <h2 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-fg-primary">Cookies beheren of verwijderen</h2>
                        <p className="text-fg-muted text-sm sm:text-base leading-relaxed">
                            U kunt cookies beheren via uw browserinstellingen. Let op: het uitschakelen van functionele cookies kan de werking van de website beïnvloeden. Raadpleeg de helpfunctie van uw browser voor meer informatie.
                        </p>
                    </div>

                    <div className="border-l-2 border-accent-blue/30 pl-4 sm:pl-6 mb-8 sm:mb-10">
                        <h2 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-fg-primary">Contact</h2>
                        <p className="text-fg-muted text-sm sm:text-base leading-relaxed break-words">
                            Voor vragen over ons cookiebeleid kunt u ons bereiken via{" "}
                            <a href="mailto:bookings@cannix.be" className="text-accent-blue-bright hover:underline break-all">
                                bookings@cannix.be
                            </a>.
                        </p>
                    </div>

                    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border-subtle/40 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-fg-muted">
                        <Link href="/privacy" className="hover:text-accent-blue-bright transition-colors py-1">Privacybeleid</Link>
                        <Link href="/terms" className="hover:text-accent-blue-bright transition-colors py-1">Algemene Voorwaarden</Link>
                        <Link href="/contact" className="hover:text-accent-blue-bright transition-colors py-1">Contact</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
