import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Het privacybeleid van Cannix – hoe we omgaan met persoonsgegevens.",
  alternates: { canonical: "/privacy", languages: localizedAlternates(["privacy"]) },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
