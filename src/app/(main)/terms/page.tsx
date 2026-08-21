import { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Algemene Voorwaarden | Cannix",
    description: "Algemene voorwaarden van Cannix voor boekingen en evenementen.",
};

const sections = [
    {
        title: "1. Toepassingsgebied",
        content: "Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en boekingen met Cannix (hierna 'Artiest'). Door een boeking te bevestigen, aanvaardt de klant (hierna 'Opdrachtgever') deze voorwaarden volledig.",
    },
    {
        title: "2. Boeking & Bevestiging",
        content: "Een boeking is pas definitief na schriftelijke bevestiging (e-mail) door de Artiest én de ontvangst van het gevraagde voorschot (indien van toepassing). Mondelinge afspraken zijn niet bindend zonder schriftelijke bevestiging.",
    },
    {
        title: "3. Gage & Betalingsvoorwaarden",
        content: "De gage wordt vastgelegd in de offerte en/of overeenkomst. Een voorschot van 25% is verschuldigd bij bevestiging. Het saldo dient uiterlijk 7 dagen vóór het optreden te worden voldaan, tenzij anders overeengekomen. Alle vermelde bedragen zijn exclusief BTW tenzij anders aangegeven.",
    },
    {
        title: "4. Annulatie door de Opdrachtgever",
        content: "Bij annulatie meer dan 30 dagen voor de datum: 25% van de gage. Tussen 14 en 30 dagen: 50% van de gage. Minder dan 14 dagen voor de datum: 100% van de gage is verschuldigd. Annulaties dienen schriftelijk te worden meegedeeld.",
    },
    {
        title: "5. Annulatie door de Artiest",
        content: "De Artiest behoudt het recht een boeking te annuleren wegens overmacht (ziekte, familiale omstandigheden, overheidsbevel). In dat geval wordt het volledige voorschot terugbetaald. De Artiest zal trachten een vervanger aan te bevelen.",
    },
    {
        title: "6. Technische Rider",
        content: "De Opdrachtgever zorgt voor de technische vereisten zoals vastgelegd in de rider (geluidsinstallatie, verlichting, speelruimte). Indien de vereisten niet beschikbaar zijn, behoudt de Artiest het recht de gage aan te passen of het optreden te weigeren zonder teruggave.",
    },
    {
        title: "7. Auteursrecht & Opnames",
        content: "Opnames (audio/video) van het optreden voor commercieel gebruik zijn slechts toegestaan met schriftelijke toestemming van de Artiest. Het gebruik van beeldmateriaal op sociale media voor promotionele doeleinden van het event is vrij.",
    },
    {
        title: "8. Aansprakelijkheid",
        content: "De Artiest is niet aansprakelijk voor schade ten gevolge van overmacht, technische storingen buiten zijn controle, of het handelen van derden. De aansprakelijkheid van de Artiest is in elk geval beperkt tot het bedrag van de overeengekomen gage.",
    },
    {
        title: "9. Toepasselijk recht",
        content: "Op alle overeenkomsten met Cannix is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbanken van het arrondissement van de vestigingsplaats van de Artiest.",
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <section className="py-10 sm:py-16 px-4 sm:px-6 container">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-accent-blue/15 border border-accent-blue/30 flex-shrink-0">
                            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-accent-blue-bright" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-accent-blue-bright uppercase tracking-wider">Juridisch</span>
                    </div>

                    <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 break-words">
                        Algemene Voorwaarden
                    </h1>
                    <p className="text-fg-muted text-sm sm:text-base mb-2">
                        Versie augustus 2026
                    </p>
                    <p className="text-fg-muted leading-relaxed mb-8 sm:mb-12 text-sm sm:text-lg">
                        Door het boeken van DJ Cannix verklaart u akkoord te gaan met de volgende voorwaarden. Lees ze aandachtig door.
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
                        <Link href="/privacy" className="hover:text-accent-blue-bright transition-colors py-1">Privacybeleid</Link>
                        <Link href="/cookies" className="hover:text-accent-blue-bright transition-colors py-1">Cookiebeleid</Link>
                        <Link href="/contact" className="hover:text-accent-blue-bright transition-colors py-1">Contact</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
