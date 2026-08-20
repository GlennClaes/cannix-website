import type {Metadata} from "next";
import {DM_Sans, JetBrains_Mono, Syne} from "next/font/google";
import "./globals.css";

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Cannix | DJ & Producer",
    description:
        "Officiële website van Cannix — DJ & producer. Allround fuifmuziek, meezingers, harde remixes en Drum & Bass. Bekijk foto's, video's en boek Cannix voor jouw event.",

    metadataBase: new URL("https://cannix.be"),

    openGraph: {
        title: "Cannix | DJ & Producer",
        description:
            "DJ & producer met een passie voor fuifmuziek, meezingers, harde remixes en Drum & Bass. Altijd gericht op energie, beweging en het publiek.",
        type: "website",
        locale: "nl_BE",
        url: "https://cannix.be",
        siteName: "Cannix",
    },

    twitter: {
        card: "summary_large_image",
        title: "Cannix | DJ & Producer",
        description:
            "DJ & producer — fuifmuziek, harde remixes, Drum & Bass, Jump Up, Hardstyle & Jumpstyle.",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="nl"
            className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
            data-scroll-behavior="smooth"
        >
        <body>{children}</body>
        </html>
    );
}