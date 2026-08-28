"use client";

import { motion } from "framer-motion";
import { bio } from "@/content/bio";
import { Card } from "@/app/components/ui";
import { Award, Clock, Globe, Mail, Music, Phone } from "lucide-react";

const statIcons = {
    "Jaar ervaring": Clock,
    "Optredens": Music,
    "Festivals": Award,
    "Landen": Globe,
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[45vh] flex items-center justify-center">
                <div className="container relative z-10 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue-bright text-sm font-semibold tracking-wider uppercase mb-6">
                            Over Cannix
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                            Energie, Beats & Unieke Sfeer
                        </h1>
                        <p className="text-fg-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                            Passie voor het meeslepen van de dansvloer, van meezingers en fuifclassics tot harde DnB & hardstyle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bio Content */}
            <section className="section container">
                <div className="grid lg:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="prose prose-invert max-w-none">
                            {bio.longBio.split("\n").map((paragraph, i) => (
                                <p
                                    key={i}
                                    className="text-fg-muted leading-relaxed text-base sm:text-lg mb-6"
                                >
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>

                        <div className="border-t border-border-subtle pt-8">
                            <h2 className="font-display text-2xl font-bold mb-4">
                                Mijn Muziek & Stijl
                            </h2>

                            <p className="text-fg-muted leading-relaxed mb-6 text-base sm:text-lg">
                                Als allround DJ draai ik vooral herkenbare fuifmuziek,
                                echte meezingers en hardere remixes. Daarnaast draai en
                                produceer ik Drum & Bass, met een focus op onder andere
                                Jump Up. Ook Hardstyle en Jumpstyle komen regelmatig terug
                                in mijn sets.
                            </p>

                            <p className="text-fg-muted leading-relaxed mb-6 text-base sm:text-lg">
                                Ik ben altijd op zoek naar nieuwe muziek en nieuwe sounds.
                                Wat ik draai hangt af van het publiek, de locatie en de
                                sfeer van het moment. Het belangrijkste is dat mensen
                                bewegen en betrokken blijven bij de muziek.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {bio.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-4 py-2 rounded-full bg-bg-surface border border-border-subtle text-fg-primary hover:border-accent-blue/50 hover:text-accent-blue-bright transition-colors"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="space-y-6 lg:sticky lg:top-24">
                            <Card className="p-6">
                                <h3 className="font-display text-xl font-bold mb-6">
                                    Cijfers
                                </h3>

                                <div className="space-y-6">
                                    {bio.stats.map((stat) => {
                                        const Icon =
                                            statIcons[stat.label as keyof typeof statIcons] ||
                                            Music;

                                        return (
                                            <div
                                                key={stat.label}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="p-3 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex-shrink-0">
                                                    <Icon className="h-6 w-6 text-accent-blue-bright" />
                                                </div>

                                                <div>
                                                    <div className="font-display text-2xl font-bold text-accent-blue-bright">
                                                        {stat.value}
                                                    </div>

                                                    <div className="text-sm text-fg-muted">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-display text-xl font-bold mb-6">
                                    Boekingen & Contact
                                </h3>

                                <p className="text-fg-muted mb-4">
                                    Interesse in een booking? Stuur gerust een bericht voor
                                    meer informatie en beschikbaarheid.
                                </p>

                                <div className="space-y-3">
                                    <a
                                        href={`mailto:${bio.contact.email}`}
                                        className="flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group"
                                    >
                                        <span className="p-2 rounded-lg bg-bg-deep border border-border-subtle group-hover:border-accent-blue/50">
                                            <Mail className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0 break-all">{bio.contact.email}</span>
                                    </a>

                                    <a
                                        href={`tel:${bio.contact.phone}`}
                                        className="flex min-w-0 items-start gap-3 text-fg-muted hover:text-accent-blue-bright transition-colors group"
                                    >
                                        <span className="p-2 rounded-lg bg-bg-deep border border-border-subtle group-hover:border-accent-blue/50">
                                            <Phone className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0 break-words">{bio.contact.phone}</span>
                                    </a>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What drives Cannix */}
            <section className="section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="section-title mb-4">Waar het om draait</h2>

                        <p className="text-fg-muted text-lg">
                            Muziek draaien gaat voor mij vooral om de sfeer en het publiek.
                        </p>
                    </motion.div>

                    <div className="grid items-stretch gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "Energie",
                                desc: "Een goede set moet energie geven en ervoor zorgen dat de dansvloer blijft bewegen.",
                            },
                            {
                                title: "Muziek",
                                desc: "Van bekende meezingers tot DnB en hardere remixes. Ik blijf graag nieuwe muziek ontdekken.",
                            },
                            {
                                title: "Publiek",
                                desc: "Ik kijk naar de zaal en speel in op wat er op dat moment gebeurt. Het publiek bepaalt mee de richting.",
                            },
                        ].map((value) => (
                            <article
                                key={value.title}
                                className="card h-full p-8 text-center group"
                            >
                                <h3 className="font-display text-xl font-bold mb-2">
                                    {value.title}
                                </h3>

                                <p className="text-fg-muted">
                                    {value.desc}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
