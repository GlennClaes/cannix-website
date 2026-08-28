import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl } from "@/lib/site-config";

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
        "fuif DJ",
        "Drum and Bass DJ",
        "Jump Up",
        "Hardstyle",
        "Loksbergen",
        "Vlaanderen",
    ],
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: [
            { url: "/images/logo-cannix.svg", type: "image/svg+xml" },
            { url: "/images/logo_cannix.png", type: "image/png" },
        ],
        shortcut: "/images/logo_cannix.png",
        apple: "/images/logo_cannix.png",
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
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
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
    };

    return (
        <html
            lang="nl"
            className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
            data-scroll-behavior="smooth"
        >
        <body suppressHydrationWarning>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        </body>
        </html>
    );
}
