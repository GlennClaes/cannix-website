import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import MainLayout from "@/app/(main)/layout";
import { LanguageProvider, type Language } from "@/lib/i18n";
import { isLanguage } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "fr", "de"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLanguage(locale) || locale === "nl") notFound();

  return (
    <LanguageProvider initialLanguage={locale as Language}>
      <MainLayout>{children}</MainLayout>
    </LanguageProvider>
  );
}
