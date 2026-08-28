"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Calendar, Users, Music } from "lucide-react";
import { bio } from "@/content/bio";
import { ContactForm } from "@/app/components/ContactForm";
import { Card, CardContent } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import { SoundCloudIcon } from "@/app/components/SocialIcons";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="container relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl text-center mx-auto">
            <span className="inline-block px-3 py-1 text-sm font-medium text-accent-blue-bright mb-4">Contact & Boekingen</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Laten we <span className="gradient-text">samenwerken</span>
            </h1>
            <p className="text-lg text-fg-muted leading-relaxed">
              Heb je een fuif, rave, festival, private party of ander event? Vul het formulier in en we nemen binnen 24u contact op.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section container">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="p-4 sm:p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Stuur een bericht</h2>
              <ContactForm />
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-6 lg:sticky lg:top-24">
              <Card className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">Direct contact</h3>
                <div className="space-y-4">
                  <a href={`mailto:${bio.contact.email}`} className={cn("flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group")}>
                    <span className={cn("p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex-shrink-0 group-hover:bg-accent-blue/20")}><Mail className="h-5 w-5 text-accent-blue-bright" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">Boekingen & Info</p>
                      <p className="break-all font-medium">{bio.contact.email}</p>
                    </div>
                  </a>
                  <a href={`tel:${bio.contact.phone}`} className={cn("flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group")}>
                    <span className={cn("p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex-shrink-0 group-hover:bg-accent-blue/20")}><Phone className="h-5 w-5 text-accent-blue-bright" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">Telefoon</p>
                      <p className="font-medium">{bio.contact.phone}</p>
                    </div>
                  </a>
                  <div className="flex min-w-0 items-start gap-3 text-fg-muted">
                    <span className="p-2 rounded-xl bg-bg-deep border border-border-subtle"><MapPin className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">Locatie</p>
                      <p className="font-medium">Belgium (Europees boekbaar)</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">Wat we nodig hebben</h3>
                <p className="text-fg-muted mb-4">Voor een passend voorstel helpen deze details:</p>
                <ul className="space-y-3 text-fg-muted">
                  {[
                    { icon: Calendar, text: "Datum & tijdstip" },
                    { icon: MapPin, text: "Locatie / venue" },
                    { icon: Users, text: "Verwacht aantal bezoekers" },
                    { icon: Music, text: "Muzikale richting / vibe" },
                    { icon: Calendar, text: "Budget indicatie" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group">
                      <span className="p-2 rounded-lg bg-bg-deep border border-border-subtle group-hover:border-accent-blue/50"><item.icon className="h-5 w-5" /></span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">Socials</h3>
                <div className="flex flex-wrap gap-3">
                  <a href={bio.socials.instagram} target="_blank" rel="noopener noreferrer" className={cn("btn-ghost px-4 py-2 group")}><Instagram className="h-5 w-5" /><span className="ml-2 hidden sm:inline">Instagram</span></a>
                  <a href={bio.socials.facebook} target="_blank" rel="noopener noreferrer" className={cn("btn-ghost px-4 py-2 group")}><Facebook className="h-5 w-5" /><span className="ml-2 hidden sm:inline">Facebook</span></a>
                  <a href={bio.socials.soundcloud} target="_blank" rel="noopener noreferrer" className={cn("btn-ghost px-4 py-2 group")}><SoundCloudIcon className="h-5 w-5" /><span className="ml-2 hidden sm:inline">SoundCloud</span></a>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="section-title mb-4">Veelgestelde vragen</h2>
            <p className="text-fg-muted">De meest voorkomende vragen over boekingen.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Hoe ver van tevoren moet ik boeken?", a: "Voor weekends en festivals raden we 2–3 maanden van tevoren aan. Weekdagen en last-minute zijn soms mogelijk, afhankelijk van de agenda." },
              { q: "Wat is de prijs van een set?", a: "Prijzen variëren op basis van duur, locatie, dag van de week, uitrusting en of het een club/festival/private event is. Stuur een aanvraag voor een maatwerk offerte." },
              { q: "Breng je eigen apparatuur?", a: "Standaard speel ik op de house gear (CDJ-3000 / mixer). Voor specifieke riders of eigen controller: overleg van tevoren." },
              { q: "Speel je ook op bruiloften / corporate events?", a: "Absoluut. Ik heb ruime ervaring met private events en pas de muziek volledig aan aan de sfeer en gewensten van de organisator." },
              { q: "Hoe ver reis je?", a: "Vanaf België Europees. Reis- en verblijfkosten komen niet bovenop de prijs voor optredens buiten Europa." },
              { q: "Kan ik een demo of live set horen?", a: "Zeker. Luister naar mixes en producties op SoundCloud of vraag een live demo aan via het formulier." },
            ].map((faq) => (
              <article
                key={faq.q}
                className="card h-full p-6 group"
              >
                <h3 className="font-display font-bold mb-2 text-fg-primary group-hover:text-accent-blue-bright transition-colors">{faq.q}</h3>
                <p className="text-fg-muted text-sm leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
