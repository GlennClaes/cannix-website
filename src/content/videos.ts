export type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string; // YouTube/Vimeo embed URL or direct MP4
  duration: string;
  event?: string;
  year: string;
  type: "youtube" | "vimeo" | "mp4";
};

export const videos: VideoItem[] = [
  {
    id: "mexican-wave-2026",
    title: "Mexican Wave Party 2026 - Highlights",
    description: "Energieke set tijdens Mexican Wave Party 2026 met het volle publiek in de pit.",
    thumbnail: "/images/mexican_wave_party_2026.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    duration: "12:34",
    event: "Mexican Wave Party",
    year: "2026",
    type: "youtube",
  },
  {
    id: "silent-disco-2025",
    title: "Silent Disco 2025 - Full Set",
    description: "Unieke silent disco ervaring waar iedereen op zijn eigen frequentie danst.",
    thumbnail: "/images/silent_disco_2025.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    duration: "45:12",
    event: "Silent Disco",
    year: "2025",
    type: "youtube",
  },
  {
    id: "pemp-2024",
    title: "PEMP 2024 - DJ Cannix Live",
    description: "Live opname van het PEMP festival 2024.",
    thumbnail: "/images/PEMP_2024.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    duration: "38:56",
    event: "PEMP",
    year: "2024",
    type: "youtube",
  },
  {
    id: "blacklight-2024",
    title: "Blacklight Party 2024",
    description: "Neon vibes en blacklight energy met DJ Cannix.",
    thumbnail: "/images/Blacklight_2024.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    duration: "22:18",
    event: "Blacklight",
    year: "2024",
    type: "youtube",
  },
  {
    id: "mexican-wave-2024",
    title: "Mexican Wave Party 2024",
    description: "Een van de grootste Mexican Wave edities ooit.",
    thumbnail: "/images/mexican_wave_party_2024.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
    duration: "52:03",
    event: "Mexican Wave Party",
    year: "2024",
    type: "youtube",
  },
  {
    id: "tleerke-2025",
    title: "'t Leerke 2025 - Aftermovie",
    description: "Aftermovie van een onvergetelijke avond in 't Leerke.",
    thumbnail: "/images/tleerke_2025.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
    duration: "8:45",
    event: "'t Leerke",
    year: "2025",
    type: "youtube",
  },
];