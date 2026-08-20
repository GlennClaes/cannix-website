import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SoundCloudIcon } from "./SocialIcons";
import { bio } from "@/content/bio";
import { StaticLogo } from "./AnimatedLogo";
import { Button } from "./ui";

export function Footer() {
  return (
    <footer className="bg-transparent text-fg-primary">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 items-start text-center md:text-left">
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <Link href="/home" className="flex items-center mb-4" aria-label="DJ Cannix home">
              <StaticLogo size="lg" glow={true} />
            </Link>
            <p className="text-fg-muted max-w-sm mb-6 text-sm leading-relaxed">{bio.shortBio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a href={bio.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-bg-surface/70 border border-border-subtle/60 text-fg-muted hover:text-accent-blue-bright hover:border-accent-blue/50 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={bio.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-bg-surface/70 border border-border-subtle/60 text-fg-muted hover:text-accent-blue-bright hover:border-accent-blue/50 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={bio.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-bg-surface/70 border border-border-subtle/60 text-fg-muted hover:text-accent-blue-bright hover:border-accent-blue/50 transition-colors cursor-pointer" aria-label="SoundCloud">
                <SoundCloudIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-fg-muted text-sm flex flex-col items-center md:items-start">
              <a href={bio.contact.email} className="flex items-center gap-2 hover:text-accent-blue-bright transition-colors">
                <Mail className="h-4 w-4 text-accent-blue-bright flex-shrink-0" />
                {bio.contact.email}
              </a>
              <a href={`tel:${bio.contact.phone}`} className="flex items-center gap-2 hover:text-accent-blue-bright transition-colors">
                <Phone className="h-4 w-4 text-accent-blue-bright flex-shrink-0" />
                {bio.contact.phone}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-blue-bright flex-shrink-0" />
                België (Wereldwijd)
              </div>
            </address>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-lg font-bold mb-4">Navigatie</h3>
            <nav className="space-y-2.5 text-sm" aria-label="Footer navigatie">
              <Link href="/home" className="block text-fg-muted hover:text-accent-blue-bright transition-colors">Home</Link>
              <Link href="/about" className="block text-fg-muted hover:text-accent-blue-bright transition-colors">Over Cannix</Link>
              <Link href="/gallery" className="block text-fg-muted hover:text-accent-blue-bright transition-colors">Foto's</Link>
              <Link href="/videos" className="block text-fg-muted hover:text-accent-blue-bright transition-colors">Videos</Link>
              <Link href="/contact" className="block text-fg-muted hover:text-accent-blue-bright transition-colors">Contact & Boekingen</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-fg-muted/60 text-sm">© {new Date().getFullYear()} DJ Cannix. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-6 text-sm text-fg-muted/60">
            <Link href="/privacy" className="hover:text-accent-blue-bright transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-accent-blue-bright transition-colors">Voorwaarden</Link>
            <Link href="/cookies" className="hover:text-accent-blue-bright transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}