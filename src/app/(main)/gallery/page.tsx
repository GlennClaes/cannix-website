"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Instagram } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/content/gallery";
import { Card } from "@/app/components/ui";
import { cn, formatYear } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const years = ["All", ...Array.from(new Set(galleryItems.map((item) => item.year))).sort((a, b) => Number(b) - Number(a))];

export default function GalleryPage() {
  const [activeYear, setActiveYear] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { t } = useLanguage();

  const filteredItems = activeYear === "All" ? galleryItems : galleryItems.filter((item) => item.year === activeYear);
  const lightboxItem = filteredItems[lightboxIndex];

  const openLightbox = (index: number, trigger: HTMLElement) => {
    previousFocusRef.current = trigger;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (lightboxOpen) {
      const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => window.cancelAnimationFrame(frame);
    }
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setLightboxOpen(false);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((i) => (i + 1) % filteredItems.length);
      } else if (event.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>("button"));
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  return (
    <div>
      {/* Filter Tabs */}
      <section className="section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
          role="tablist"
          aria-label={t("gallery.filter")}
        >
          {years.map((year) => (
            <button
              key={year}
              role="tab"
              aria-selected={activeYear === year}
              onClick={() => setActiveYear(year)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeYear === year
                  ? "bg-accent-blue-bright text-white shadow-glow-blue"
                  : "bg-bg-surface text-fg-muted hover:text-fg-primary hover:border-accent-blue/50 border border-border-subtle",
              )}
            >
              {year === "All" ? t("gallery.all") : year}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="list"
          aria-label={t("gallery.list")}
        >
          {filteredItems.map((item, index) => (
            <motion.article
              key={`${item.src}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl cursor-zoom-in"
              role="listitem"
              tabIndex={0}
              aria-label={t("gallery.enlarge", { alt: item.alt })}
              onClick={(event) => openLightbox(filteredItems.indexOf(item), event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(filteredItems.indexOf(item), event.currentTarget);
                }
              }}
            >
              <Card className="h-full border-0 overflow-hidden">
                <div className="relative h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-fg-primary">{item.event}</p>
                        <p className="text-sm text-fg-muted flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded bg-bg-deep/80 backdrop-blur">{item.year}</span>
                          {item.location && <span>· {item.location}</span>}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); openLightbox(filteredItems.indexOf(item), e.currentTarget); }}
                        className="p-2 rounded-xl bg-bg-surface/90 backdrop-blur border border-border-subtle hover:border-accent-blue/50 hover:bg-bg-surface transition-colors"
                        aria-label={t("gallery.enlarge", { alt: item.alt })}
                      >
                        <Maximize2 className="h-5 w-5 text-fg-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-fg-muted">
            {t("gallery.none", { year: activeYear === "All" ? t("gallery.all") : activeYear })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[600] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery.photo", { current: lightboxIndex + 1, total: filteredItems.length })}
            ref={lightboxRef}
          >
            {/* Prev Button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length); }}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-3 sm:left-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-accent-blue/60 transition-colors cursor-pointer"
              aria-label={t("gallery.previous")}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
              className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full" style={{ maxHeight: "85vh", aspectRatio: "auto" }}>
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
                  priority
                  style={{ maxHeight: "80vh", width: "auto", maxWidth: "100%" }}
                />
              </div>
            </motion.div>

            {/* Next Button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % filteredItems.length); }}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 sm:right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-accent-blue/60 transition-colors cursor-pointer"
              aria-label={t("gallery.next")}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={() => setLightboxOpen(false)}
              ref={closeButtonRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-accent-blue/60 transition-colors cursor-pointer"
              aria-label={t("close")}
            >
              <X className="h-5 w-5 text-white" />
            </motion.button>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center px-4 max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-semibold text-white text-sm sm:text-base">{lightboxItem.event}</p>
              <p className="text-sm text-white/60 flex items-center justify-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur text-xs">{lightboxItem.year}</span>
                {lightboxItem.location && <span>· {lightboxItem.location}</span>}
              </p>
              <p className="text-xs text-white/40 mt-1">{lightboxIndex + 1} / {filteredItems.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
