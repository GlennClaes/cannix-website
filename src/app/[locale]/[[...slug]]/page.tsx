import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/app/(main)/about/page";
import ContactPage from "@/app/(main)/contact/page";
import CookiesPage from "@/app/(main)/cookies/page";
import GalleryPage from "@/app/(main)/gallery/page";
import HomePage from "@/app/(main)/home/page";
import PrivacyPage from "@/app/(main)/privacy/page";
import TermsPage from "@/app/(main)/terms/page";
import VideosPage from "@/app/(main)/videos/page";
import { type Language } from "@/lib/i18n";
import { isLanguage, localizedAlternates, normalizePageSlug } from "@/lib/locales";
import { siteUrl } from "@/lib/site-config";

const pages = {
  "": { component: HomePage, titles: { nl: "DJ boeken in Limburg en België", en: "Book a DJ in Limburg and Belgium", fr: "Réserver un DJ dans le Limbourg et en Belgique", de: "DJ in Limburg und Belgien buchen" }, descriptions: { nl: "Boek Cannix voor fuiven, clubs, festivals en private events in Limburg en heel België.", en: "Book Cannix for parties, clubs, festivals and private events in Limburg and across Belgium.", fr: "Réservez Cannix pour vos fêtes, clubs, festivals et événements privés dans le Limbourg et en Belgique.", de: "Buchen Sie Cannix für Partys, Clubs, Festivals und private Events in Limburg und ganz Belgien." } },
  about: { component: AboutPage, titles: { nl: "Over Cannix", en: "About Cannix", fr: "À propos de Cannix", de: "Über Cannix" }, descriptions: { nl: "Ontdek de stijl, ervaring en muziek van DJ en producer Cannix.", en: "Discover the style, experience and music of DJ and producer Cannix.", fr: "Découvrez le style, l'expérience et la musique de Cannix, DJ et producteur.", de: "Entdecken Sie den Stil, die Erfahrung und die Musik von DJ und Produzent Cannix." } },
  gallery: { component: GalleryPage, titles: { nl: "Foto's van optredens", en: "Live event photo gallery", fr: "Galerie photo des événements", de: "Fotogalerie von Live-Events" }, descriptions: { nl: "Bekijk foto's van Cannix tijdens fuiven, festivals en clubs in België.", en: "View photos of Cannix at parties, festivals and clubs in Belgium.", fr: "Découvrez les photos de Cannix lors de fêtes, festivals et clubs en Belgique.", de: "Sehen Sie Fotos von Cannix bei Partys, Festivals und Clubs in Belgien." } },
  videos: { component: VideosPage, titles: { nl: "Video's en live sets", en: "Videos and live sets", fr: "Vidéos et sets live", de: "Videos und Live-Sets" }, descriptions: { nl: "Bekijk live sets en aftermovies van DJ Cannix.", en: "Watch live sets and aftermovies from DJ Cannix.", fr: "Regardez les sets live et aftermovies de DJ Cannix.", de: "Sehen Sie Live-Sets und Aftermovies von DJ Cannix." } },
  contact: { component: ContactPage, titles: { nl: "DJ boeken en contact", en: "Book a DJ and get in touch", fr: "Réserver un DJ et contact", de: "DJ buchen und Kontakt" }, descriptions: { nl: "Vraag beschikbaarheid en een offerte van Cannix aan voor jouw event in Limburg of België.", en: "Request availability and a quote from Cannix for your event in Limburg or Belgium.", fr: "Demandez les disponibilités et un devis de Cannix pour votre événement dans le Limbourg ou en Belgique.", de: "Fragen Sie Verfügbarkeit und ein Angebot von Cannix für Ihr Event in Limburg oder Belgien an." } },
  privacy: { component: PrivacyPage, titles: { nl: "Privacybeleid", en: "Privacy policy", fr: "Politique de confidentialité", de: "Datenschutz" }, descriptions: { nl: "Lees het privacybeleid van Cannix.", en: "Read Cannix's privacy policy.", fr: "Consultez la politique de confidentialité de Cannix.", de: "Lesen Sie die Datenschutzrichtlinie von Cannix." } },
  terms: { component: TermsPage, titles: { nl: "Algemene voorwaarden", en: "Terms and conditions", fr: "Conditions générales", de: "Allgemeine Geschäftsbedingungen" }, descriptions: { nl: "Lees de algemene voorwaarden voor boekingen met Cannix.", en: "Read the terms and conditions for bookings with Cannix.", fr: "Consultez les conditions générales de réservation avec Cannix.", de: "Lesen Sie die Bedingungen für Buchungen mit Cannix." } },
  cookies: { component: CookiesPage, titles: { nl: "Cookiebeleid", en: "Cookie policy", fr: "Politique des cookies", de: "Cookie-Richtlinie" }, descriptions: { nl: "Lees het cookiebeleid van Cannix.", en: "Read Cannix's cookie policy.", fr: "Consultez la politique des cookies de Cannix.", de: "Lesen Sie die Cookie-Richtlinie von Cannix." } },
} as const;

type PageKey = keyof typeof pages;

function getPage(slug?: string[]) {
  const page = normalizePageSlug(slug);
  return page in pages ? pages[page as PageKey] : undefined;
}

export function generateStaticParams() {
  return ["en", "fr", "de"].flatMap((locale) =>
    ["", "home", "about", "gallery", "videos", "contact", "privacy", "terms", "cookies"].map((slug) => ({
      locale,
      slug: slug ? [slug] : undefined,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLanguage(rawLocale) ? rawLocale : "en";
  const page = getPage(slug);
  if (!page) return {};

  const canonical = localizedAlternates(slug)[locale];
  return {
    title: page.titles[locale],
    description: page.descriptions[locale],
    alternates: {
      canonical,
      languages: localizedAlternates(slug),
    },
    openGraph: {
      title: page.titles[locale],
      description: page.descriptions[locale],
      url: `${siteUrl}${canonical}`,
      locale: `${locale}_BE`,
      type: "website",
    },
  };
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLanguage(rawLocale) || rawLocale === "nl") notFound();
  const page = getPage(slug);
  if (!page) notFound();
  const Page = page.component;
  return <Page />;
}
