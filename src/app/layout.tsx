import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { isProductionSite, siteUrl } from "@/lib/site-config";
import { LanguageProvider } from "@/lib/i18n";

const syne = localFont({
    src: "../../public/fonts/Syne-Variable.ttf",
    variable: "--font-display",
    display: "swap",
    weight: "400 800",
});

const dmSans = localFont({
    src: "../../public/fonts/DM-Sans-Variable.ttf",
    variable: "--font-body",
    display: "swap",
    weight: "100 1000",
});

const jetBrainsMono = localFont({
    src: "../../public/fonts/JetBrains-Mono-Variable.ttf",
    variable: "--font-mono",
    display: "swap",
    weight: "100 800",
});

export const metadata: Metadata = {
    title: {
        default: "Cannix | Belgische DJ & Producer",
        template: "%s | Cannix",
    },
    description:
        "Boek Cannix, Belgische DJ en producer voor fuiven, clubs, private events en festivals. Energieke sets met fuifmuziek, meezingers, harde remixes en Drum & Bass.",
    metadataBase: new URL(siteUrl),
    applicationName: "Cannix",
    authors: [{ name: "Cannix" }],
    creator: "Cannix",
    publisher: "Cannix",
    category: "music",
    keywords: [
        "Cannix",
        "DJ Cannix",
        "Belgische DJ",
        "DJ boeken",
        "DJ Limburg",
        "DJ boeken Limburg",
        "DJ België",
        "DJ Halen",
        "fuif DJ",
        "Drum and Bass DJ",
        "Jump Up",
        "Hardstyle",
        "Loksbergen",
        "Vlaanderen",
    ],
    alternates: {
        canonical: "/",
        languages: {
            nl: "/",
            en: "/en",
            fr: "/fr",
            de: "/de",
            "x-default": "/",
        },
    },
    icons: {
        icon: { url: "/images/favicon.webp", type: "image/webp" },
        shortcut: "/images/favicon.webp",
        apple: "/images/favicon.webp",
    },
    manifest: "/site.webmanifest",
    openGraph: {
        title: "Cannix | Belgische DJ & Producer",
        description:
            "Boek Cannix voor fuiven, clubs, private events en festivals. Energieke sets met fuifmuziek, meezingers, harde remixes en Drum & Bass.",
        type: "website",
        locale: "nl_BE",
        url: siteUrl,
        siteName: "Cannix",
        images: [
            {
                url: "/images/PEMP_2024.jpg",
                width: 1200,
                height: 630,
                alt: "DJ Cannix live",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cannix | Belgische DJ & Producer",
        description:
            "Boek Cannix voor fuiven, clubs, private events en festivals.",
        images: ["/images/PEMP_2024.jpg"],
    },
    robots: {
        index: isProductionSite,
        follow: isProductionSite,
        googleBot: {
            index: isProductionSite,
            follow: isProductionSite,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const requestLocale = (await headers()).get("x-cannix-locale");
    const htmlLang = requestLocale === "en" || requestLocale === "fr" || requestLocale === "de"
        ? requestLocale
        : "nl-BE";
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                url: siteUrl,
                name: "Cannix",
                inLanguage: "nl-BE",
                publisher: { "@id": `${siteUrl}/#person` },
            },
            {
                "@type": "Person",
                "@id": `${siteUrl}/#person`,
                name: "Cannix",
                jobTitle: "DJ en producer",
                url: siteUrl,
                image: `${siteUrl}/images/PEMP_2024.jpg`,
                genre: ["Allround", "Drum & Bass", "Jump Up", "Hardstyle", "Jumpstyle"],
                areaServed: ["Belgium", "Europe"],
                email: "bookings@cannix.be",
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "booking",
                    email: "bookings@cannix.be",
                    telephone: "+32 471 74 36 77",
                    areaServed: "BE",
                    availableLanguage: ["nl", "en"],
                },
                sameAs: [
                    "https://www.instagram.com/cannix_dnb/",
                    "https://facebook.com/djcannix",
                    "https://soundcloud.com/cannix_dnb",
                ],
            },
            {
                "@type": "ProfessionalService",
                "@id": `${siteUrl}/#dj-booking-service`,
                name: "Cannix DJ booking",
                url: `${siteUrl}/contact`,
                description:
                    "DJ booking voor fuiven, clubs, festivals en private events in Limburg, België en Europa.",
                serviceType: "DJ booking and live entertainment",
                provider: { "@id": `${siteUrl}/#person` },
                areaServed: [
                    { "@type": "AdministrativeArea", name: "Limburg, Belgium" },
                    { "@type": "Country", name: "Belgium" },
                    { "@type": "Place", name: "Europe" },
                ],
                availableLanguage: ["nl-BE", "en", "fr", "de"],
            },
        ],
    };

    return (
        <html
            lang={htmlLang}
            className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
            data-scroll-behavior="smooth"
        >
        <body suppressHydrationWarning>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <SpeedInsights />
        </body>
        </html>
    );
}
