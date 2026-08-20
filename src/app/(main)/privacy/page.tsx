import { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacybeleid | DJ Cannix",
    description: "Het privacybeleid van DJ Cannix – hoe we omgaan met jouw persoonsgegevens.",
};

const sections = [
    {
        title: "1. Wie zijn wij?",
        content: "DJ Cannix (hierna 'wij', 'ons' of 'onze') is een muzikale onderneming actief als DJ en entertainer, gevestigd in België. Wij verwerken persoonsgegevens in het kader van boekingsaanvragen en communicatie.",
    },
    {
        title: "2. Welke gegevens verzamelen we?",
        content: "Via ons contactformulier verzamelen wij: naam, e-mailadres, telefoonnummer (optioneel), type evenement, datum en locatie, en de inhoud van uw bericht. Deze gegevens worden uitsluitend gebruikt om uw boeking te behandelen.",
    },
    {
        title: "3. Doel van de verwerking",
        content: "Uw gegevens worden verwerkt voor: het beantwoorden van boekingsaanvragen, het opmaken van offertes, en het versturen van contracten en facturen. We gebruiken uw gegevens nooit voor commerciële e-mailcampagnes zonder uw uitdrukkelijke toestemming.",
    },
    {
        title: "4. Hoe lang bewaren we uw gegevens?",
        content: "We bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld. Contactformulierdata wordt maximaal 2 jaar bewaard. Boeking- en facturatiegegevens bewaren we 7 jaar conform de Belgische boekhoudwetgeving.",
    },
    {
        title: "5. Delen met derden",
        content: "Wij delen uw gegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van de overeenkomst (bijv. locatie, technische partners) of wettelijk verplicht. Wij maken geen gebruik van tracking-cookies of advertentie-netwerken.",
    },
    {
        title: "6. Uw rechten",
        content: "U heeft het recht op inzage, rectificatie, verwijdering en overdraagbaarheid van uw persoonsgegevens. U kunt ook bezwaar maken tegen de verwerking. Neem hiervoor contact op via bookings@cannix.be.",
    },
    {
        title: "7. Contact & klachten",
        content: "Voor vragen over dit beleid kunt u ons bereiken via bookings@cannix.be. U heeft ook het recht een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA): www.gegevensbeschermingsautoriteit.be.",
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <section className="py-10 sm:py-16 px-4 sm:px-6 container">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex-shrink-0">
                            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-accent-blue-bright" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-accent-blue-bright uppercase tracking-wider">Privacybeleid</span>
                    </div>

                    <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 break-words">
                        Privacy Policy
                    </h1>
                    <p className="text-fg-muted text-sm sm:text-base mb-2">
                        Laatst bijgewerkt: augustus 2026
                    </p>
                    <p className="text-fg-muted leading-relaxed mb-8 sm:mb-12 text-sm sm:text-lg">
                        Wij respecteren uw privacy en verbinden ons ertoe uw persoonsgegevens te beschermen in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG / GDPR).
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
                        <Link href="/terms" className="hover:text-accent-blue-bright transition-colors py-1">Algemene Voorwaarden</Link>
                        <Link href="/cookies" className="hover:text-accent-blue-bright transition-colors py-1">Cookiebeleid</Link>
                        <Link href="/contact" className="hover:text-accent-blue-bright transition-colors py-1">Contact</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
