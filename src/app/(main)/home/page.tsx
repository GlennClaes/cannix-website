"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Instagram, Facebook } from "lucide-react";
import { bio } from "@/content/bio";
import { Button } from "@/app/components/ui";
import { SoundCloudIcon } from "@/app/components/SocialIcons";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { t, languageInfo } = useLanguage();
  const upcomingGig = {
    date: "2026-09-19",
    event: "Kermisfuif Loksbergen",
    location: "Loksbergen, Kerkplein",
    time: "01:30 - 03:00",
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <div className="container relative z-10 flex flex-col items-center text-center py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/15 px-3 py-1.5 text-center text-sm font-semibold leading-snug text-accent-blue-bright sm:px-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue-bright opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue-bright"></span>
              </span>
              {t("home.nextGig")}: {new Date(`${upcomingGig.date}T12:00:00+02:00`).toLocaleDateString(languageInfo.htmlLang, { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Brussels" })}
            </span>

            <h1 className="mx-auto mb-6 max-w-[18ch] font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Energy. Bass. <span className="gradient-text">Connection.</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl px-2 text-lg leading-relaxed text-fg-secondary sm:text-xl">
              {t("home.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button glow={true} className="w-full sm:w-auto px-8 py-3.5 text-base font-bold uppercase tracking-wider">
                  {t("booking")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {bio.stats.map((stat, i) => (
              <motion.div
                key={`${stat.label}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="p-5 rounded-2xl bg-bg-surface/50 border border-border-subtle/50 backdrop-blur-sm"
              >
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-accent-blue-bright">{stat.value}</div>
                <div className="text-sm text-fg-muted font-medium mt-1">{({
                  Leeftijd: t("home.stats.age"),
                  "Jaar ervaring": t("home.stats.experience"),
                  Optredens: t("home.stats.shows"),
                  Festivals: t("home.stats.festivals"),
                } as Record<string, string>)[stat.label] || stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Gig Card */}
      <section className="section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-4 sm:p-6 md:p-8 bg-bg-surface/60 border border-border-subtle/50 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="shrink-0 rounded-2xl border border-accent-blue/30 bg-accent-blue/15 p-3 sm:p-4">
                  <Calendar className="h-6 w-6 text-accent-blue-bright sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-fg-muted font-medium">{t("home.nextEvent")}</p>
                  <h2 className="font-display text-xl font-bold leading-tight sm:text-3xl">{upcomingGig.event}</h2>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-left text-sm text-fg-muted sm:grid-cols-2 xl:flex xl:flex-wrap xl:items-center xl:gap-x-5 xl:gap-y-3">
                <div className="flex min-w-0 items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue-bright" />
                  <span className="min-w-0 break-words">{upcomingGig.location}</span>
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue-bright" />
                  <span className="min-w-0 break-words">{new Date(`${upcomingGig.date}T12:00:00+02:00`).toLocaleDateString(languageInfo.htmlLang, { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Brussels" })}</span>
                </div>
                <div className="flex min-w-0 items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue-bright" />
                  <span className="min-w-0 break-words">{upcomingGig.time}</span>
                </div>
              </div>
            </div>
            <Link href="/contact" className="w-full shrink-0 lg:w-auto">
              <Button glow={true} className="w-full px-6 py-3 text-sm font-bold lg:w-auto">
                {t("home.tickets")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="section container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-xs font-semibold text-accent-blue-bright uppercase tracking-wider mb-4">
              {t("home.about")}
            </span>
            <h2 className="section-title mb-4">{t("home.musicConnects")}</h2>
            <p className="text-fg-muted mb-6 leading-relaxed text-base sm:text-lg">{t("bio.long.1")}</p>
            <p className="text-fg-muted mb-6 leading-relaxed text-base sm:text-lg">{t("bio.long.3")}</p>
            <Link href="/about" className="link inline-flex items-center gap-2 font-semibold">
              {t("home.readMore")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-subtle/50">
              <Image
                src="/images/PEMP_2024.jpg"
                alt="DJ Cannix live op PEMP 2024"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative mt-4 max-w-none rounded-2xl border border-border-subtle/60 bg-bg-surface/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6 md:absolute md:-bottom-8 md:-right-8 md:mt-0 md:max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div>
                  <p className="font-semibold text-fg-primary">{t("home.bookingsOpen")}</p>
                  <p className="text-sm text-fg-muted">{t("home.availability")}</p>
                </div>
              </div>
              <Link href="/contact">
                <Button fullWidth={true} variant="secondary" className="py-2 text-xs font-semibold">
                  {t("home.contact")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genres & Social Proof */}
      <section className="section container">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-6">{t("home.genres")}</h3>
            <div className="flex flex-wrap gap-3">
              {bio.genres.map((genre, index) => (
                <span key={`${genre}-${index}`} className="px-4 py-2 rounded-full bg-bg-surface/70 border border-border-subtle/60 text-fg-muted hover:border-accent-blue/50 hover:text-accent-blue-bright transition-colors cursor-default">
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6">{t("home.follow")}</h3>
            <div className="flex flex-wrap gap-3">
              <a href={bio.socials.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<Instagram className="h-4 w-4" />}>Instagram</Button>
              </a>
              <a href={bio.socials.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<Facebook className="h-4 w-4" />}>Facebook</Button>
              </a>
              <a href={bio.socials.soundcloud} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<SoundCloudIcon className="h-4 w-4" />}>SoundCloud</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
