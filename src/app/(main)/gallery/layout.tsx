import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foto's van optredens",
  description: "Bekijk foto's van Cannix tijdens fuiven, festivals, clubs en andere live events in België.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
