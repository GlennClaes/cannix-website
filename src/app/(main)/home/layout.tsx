import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ boeken voor fuiven, clubs en festivals",
  description: "Boek Cannix als Belgische DJ en producer voor fuiven, clubs, festivals en private events.",
  alternates: { canonical: "/home" },
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
