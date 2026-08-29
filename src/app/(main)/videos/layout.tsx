import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Live sets en video's",
  description:
    "Bekijk live sets en video's van Cannix tijdens fuiven, festivals, clubs en andere events.",
  alternates: { canonical: "/videos", languages: localizedAlternates(["videos"]) },
};

export default function VideosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
