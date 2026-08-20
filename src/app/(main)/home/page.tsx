"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Calendar, MapPin, Users, Instagram, Facebook } from "lucide-react";
import { bio } from "@/content/bio";
import { Button } from "@/app/components/ui";
import { SoundCloudIcon } from "@/app/components/SocialIcons";

export default function HomePage() {
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue-bright text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue-bright opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue-bright"></span>
              </span>
              Volgende gig: {new Date(upcomingGig.date).toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })}
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Energy. Bass. <span className="gradient-text">Connection.</span>
            </h1>

            <p className="text-fg-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Belgische DJ gespecialiseerd in energieke festivalsets, fuifclassics, meezingers en harde remixes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button glow={true} className="w-full sm:w-auto px-8 py-3.5 text-base font-bold uppercase tracking-wider">
                  Boek Cannix
                </Button>
              </Link>
              <Link href="/videos" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold">
                  Bekijk Videos
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
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="p-5 rounded-2xl bg-bg-surface/50 border border-border-subtle/50 backdrop-blur-sm"
              >
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-accent-blue-bright">{stat.value}</div>
                <div className="text-sm text-fg-muted font-medium mt-1">{stat.label}</div>
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
          className="rounded-3xl p-6 md:p-8 bg-bg-surface/60 border border-border-subtle/50 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-accent-blue/15 border border-accent-blue/30">
                <Calendar className="h-8 w-8 text-accent-blue-bright" />
              </div>
              <div>
                <p className="text-sm text-fg-muted font-medium">Volgend evenement</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold">{upcomingGig.event}</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
              <div className="flex items-center gap-2 text-fg-muted">
                <MapPin className="h-5 w-5 text-accent-blue-bright" />
                <span>{upcomingGig.location}</span>
              </div>
              <div className="flex items-center gap-2 text-fg-muted">
                <Calendar className="h-5 w-5 text-accent-blue-bright" />
                <span>{new Date(upcomingGig.date).toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })}</span>
              </div>
              <div className="flex items-center gap-2 text-fg-muted">
                <Users className="h-5 w-5 text-accent-blue-bright" />
                <span>{upcomingGig.time}</span>
              </div>
            </div>
            <Link href="/contact">
              <Button glow={true} className="px-6 py-3 text-sm font-bold">
                Tickets & Info
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
              Over Cannix
            </span>
            <h2 className="section-title mb-4">Muziek die verbindt</h2>
            <p className="text-fg-muted mb-6 leading-relaxed text-base sm:text-lg">{bio.longBio.split("\n")[0].trim()}</p>
            <p className="text-fg-muted mb-6 leading-relaxed text-base sm:text-lg">{bio.longBio.split("\n")[2].trim()}</p>
            <Link href="/about" className="link inline-flex items-center gap-2 font-semibold">
              Lees meer
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
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 p-6 bg-bg-surface/90 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-accent-blue/15"><Play className="h-6 w-6 text-accent-blue-bright" /></div>
                <div>
                  <p className="font-semibold text-fg-primary">Live set beschikbaar</p>
                  <p className="text-sm text-fg-muted">PEMP 2024 - Full set</p>
                </div>
              </div>
              <Link href="/videos">
                <Button fullWidth={true} variant="secondary" className="py-2 text-xs font-semibold">
                  Bekijk op Videos
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
            <h3 className="font-display text-2xl font-bold mb-6">Genres</h3>
            <div className="flex flex-wrap gap-3">
              {bio.genres.map((genre) => (
                <span key={genre} className="px-4 py-2 rounded-full bg-bg-surface/70 border border-border-subtle/60 text-fg-muted hover:border-accent-blue/50 hover:text-accent-blue-bright transition-colors cursor-default">
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
            <h3 className="font-display text-2xl font-bold mb-6">Volg de vibe</h3>
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
