import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Cannix",
  description: "Leer Cannix kennen: Belgische DJ en producer met een brede sound van fuifmuziek tot Drum & Bass en Hardstyle.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
