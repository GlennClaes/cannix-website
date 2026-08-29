"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Calendar, Users, Music } from "lucide-react";
import { bio } from "@/content/bio";
import { ContactForm } from "@/app/components/ContactForm";
import { Card, CardContent } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import { SoundCloudIcon } from "@/app/components/SocialIcons";
import { useLanguage } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useLanguage();
  const faqs = [1, 2, 3, 4, 5, 6].map((index) => ({ q: t(`faq.${index}q`), a: t(`faq.${index}a`) }));
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="container relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl text-center mx-auto">
            <span className="inline-block px-3 py-1 text-sm font-medium text-accent-blue-bright mb-4">{t("contact.title")}</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              {t("contact.heading")}
            </h1>
            <p className="text-lg text-fg-muted leading-relaxed">
              {t("contact.intro")}
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
              <h2 className="font-display text-2xl font-bold mb-6">{t("contact.send")}</h2>
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
                <h3 className="font-display text-xl font-bold mb-6">{t("contact.direct")}</h3>
                <div className="space-y-4">
                  <a href={`mailto:${bio.contact.email}`} className={cn("flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group")}>
                    <span className={cn("p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex-shrink-0 group-hover:bg-accent-blue/20")}><Mail className="h-5 w-5 text-accent-blue-bright" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">{t("contact.bookings")}</p>
                      <p className="break-all font-medium">{bio.contact.email}</p>
                    </div>
                  </a>
                  <a href={`tel:${bio.contact.phone}`} className={cn("flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group")}>
                    <span className={cn("p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex-shrink-0 group-hover:bg-accent-blue/20")}><Phone className="h-5 w-5 text-accent-blue-bright" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">{t("contact.phone")}</p>
                      <p className="font-medium">{bio.contact.phone}</p>
                    </div>
                  </a>
                  <div className="flex min-w-0 items-start gap-3 text-fg-muted">
                    <span className="p-2 rounded-xl bg-bg-deep border border-border-subtle"><MapPin className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-fg-muted/60">{t("contact.location")}</p>
                      <p className="font-medium">{t("contact.locationValue")}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">{t("contact.whatNeed")}</h3>
                <p className="text-fg-muted mb-4">{t("contact.needIntro")}</p>
                <ul className="space-y-3 text-fg-muted">
                  {[
                    { icon: Calendar, text: t("contact.date") },
                    { icon: MapPin, text: t("contact.venue") },
                    { icon: Users, text: t("contact.attendees") },
                    { icon: Music, text: t("contact.vibe") },
                    { icon: Calendar, text: t("contact.budget") },
                  ].map((item, i) => (
                    <li key={`contact-detail-${i}`} className="flex items-center gap-3 group">
                      <span className="p-2 rounded-lg bg-bg-deep border border-border-subtle group-hover:border-accent-blue/50"><item.icon className="h-5 w-5" /></span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">{t("contact.socials")}</h3>
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
            <h2 className="section-title mb-4">{t("contact.faq")}</h2>
            <p className="text-fg-muted">{t("contact.faqIntro")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <article
                key={`faq-${index}`}
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
