"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Youtube, ExternalLink } from "lucide-react";
import { videos, type VideoItem } from "@/content/videos";
import { Card, CardContent, Button } from "@/app/components/ui";
import { cn } from "@/lib/utils";

export default function VideosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const openModal = (video: VideoItem) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

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
          {videos.map((video, index) => (
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
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent" />
                  <button
                    onClick={() => openModal(video)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={`Bekijk: ${video.title}`}
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
                  <h3 className="font-display text-lg font-bold mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-fg-muted line-clamp-2">{video.description}</p>
                </CardContent>
              </Card>
            </motion.article>
          ))}
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
            <h2 className="section-title mb-4">Meer content op onze kanalen</h2>
            <p className="text-fg-muted mb-8 max-w-xl mx-auto">Volg ons voor nieuwe uploads, live streams en exclusive behind-the-scenes content.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={videos[0]?.embedUrl.replace("/embed/", "/").split("?")[0] || "#"} target="_blank" rel="noopener noreferrer">
                <Button icon={<Youtube className="h-5 w-5" />} iconPosition="left">
                  YouTube Kanaal
                </Button>
              </a>
              <a href="https://instagram.com/djcannix" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
                  Instagram Reels
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
                title={selectedVideo.title}
                className="w-full h-full rounded-xl border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-bg-surface/50 backdrop-blur border border-border-subtle hover:border-accent-blue-bright hover:bg-bg-surface transition-colors text-fg-primary"
              aria-label="Sluiten video"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center"
            >
              <h3 className="font-display text-lg font-bold mb-1">{selectedVideo.title}</h3>
              <p className="text-sm text-fg-muted">{selectedVideo.description}</p>
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