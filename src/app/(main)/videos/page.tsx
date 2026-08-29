"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Youtube, ExternalLink } from "lucide-react";
import { videos, type VideoItem } from "@/content/videos";
import { Card, CardContent, Button } from "@/app/components/ui";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export default function VideosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { t } = useLanguage();

  const openModal = (video: VideoItem, trigger?: HTMLElement) => {
    previousFocusRef.current = trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (modalOpen) {
      const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => window.cancelAnimationFrame(frame);
    }
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === "Tab" && modalRef.current) {
        const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button, iframe"));
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
  }, [modalOpen]);

  const getEmbedUrl = (video: VideoItem) => {
    if (video.type === "youtube") {
      return `${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`;
    }
    if (video.type === "vimeo") {
      return `${video.embedUrl}?autoplay=1&badge=0&byline=0&portrait=0`;
    }
    return video.embedUrl;
  };

  return (
    <div>
      {/* Video Grid */}
      <section className="section container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video, index) => {
            const title = t(`video.${index + 1}.title`);
            const description = t(`video.${index + 1}.description`);
            return (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="group"
            >
              <Card className="overflow-hidden h-full border-0 group-hover:shadow-glow-blue transition-shadow duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent" />
                  <button
                    onClick={(event) => openModal(video, event.currentTarget)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={t("videos.watch", { title })}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-full bg-accent-blue-bright text-white shadow-glow-blue"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </motion.div>
                  </button>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-bg-deep/90 backdrop-blur text-xs font-mono text-fg-muted">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-accent-blue/90 text-xs font-medium text-white">
                    {video.type.toUpperCase()}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-xs text-fg-muted mb-2">
                    <span className="px-2 py-0.5 rounded bg-bg-deep border border-border-subtle">{video.year}</span>
                    {video.event && <span>· {video.event}</span>}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1 line-clamp-2">{title}</h3>
                  <p className="text-sm text-fg-muted line-clamp-2">{description}</p>
                </CardContent>
              </Card>
            </motion.article>
          )})}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-4">{t("videos.more")}</h2>
            <p className="text-fg-muted mb-8 max-w-xl mx-auto">{t("videos.follow")}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={videos[0]?.embedUrl.replace("/embed/", "/").split("?")[0] || "#"} target="_blank" rel="noopener noreferrer">
                <Button icon={<Youtube className="h-5 w-5" />} iconPosition="left">
                  {t("videos.youtube")}
                </Button>
              </a>
              <a href="https://instagram.com/djcannix" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
                  {t("videos.instagram")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {modalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[600] bg-black/98 backdrop-blur flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
            ref={modalRef}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-video max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={getEmbedUrl(selectedVideo)}
                title={t(`video.${videos.findIndex((video) => video.id === selectedVideo.id) + 1}.title`)}
                className="w-full h-full rounded-xl border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>

            <button
              onClick={closeModal}
              ref={closeButtonRef}
              className="absolute top-4 right-4 p-2 rounded-full bg-bg-surface/50 backdrop-blur border border-border-subtle hover:border-accent-blue-bright hover:bg-bg-surface transition-colors text-fg-primary"
              aria-label={t("videos.close")}
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center"
            >
              <h3 className="font-display text-lg font-bold mb-1">{t(`video.${videos.findIndex((video) => video.id === selectedVideo.id) + 1}.title`)}</h3>
              <p className="text-sm text-fg-muted">{t(`video.${videos.findIndex((video) => video.id === selectedVideo.id) + 1}.description`)}</p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-fg-muted/60">
                <span>{selectedVideo.year}</span>
                {selectedVideo.event && <span>· {selectedVideo.event}</span>}
                <span>· {selectedVideo.duration}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}