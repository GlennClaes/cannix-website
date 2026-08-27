import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ boeken en contact",
  description: "Vraag beschikbaarheid en een offerte van Cannix aan voor jouw fuif, festival, clubavond, rave of private event.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
