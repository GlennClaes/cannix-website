import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Hoe Cannix omgaat met cookies en vergelijkbare technologieën.",
};

export default function CookiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
