import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Hoe Cannix omgaat met cookies en vergelijkbare technologieën.",
  alternates: { canonical: "/cookies", languages: localizedAlternates(["cookies"]) },
};

export default function CookiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
