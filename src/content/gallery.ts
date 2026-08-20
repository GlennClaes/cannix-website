export type GalleryItem = {
  src: string;
  alt: string;
  event: string;
  year: string;
  location: string;
  featured?: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/mexican_wave_party_2026.jpg",
    alt: "Cannix live op Mexican Wave Party 2026",
    event: "Mexican Wave Party",
    year: "2026",
    location: "Belgium",
    featured: true,
  },
  {
    src: "/images/tleerke_2025.jpg",
    alt: "Cannix optreden in 't Leerke 2025",
    event: "'t Leerke",
    year: "2025",
    location: "Belgium",
  },
  {
    src: "/images/silent_disco_2025.jpg",
    alt: "Cannix tijdens Silent Disco 2025",
    event: "Silent Disco",
    year: "2025",
    location: "Belgium",
  },
  {
    src: "/images/mexican_wave_party_2024.jpg",
    alt: "Mexican Wave Party 2024 met Cannix",
    event: "Mexican Wave Party",
    year: "2024",
    location: "Belgium",
  },
  {
    src: "/images/PEMP_2024.jpg",
    alt: "Cannix op PEMP 2024",
    event: "PEMP",
    year: "2024",
    location: "Belgium",
  },
  {
    src: "/images/Blacklight_2024.jpg",
    alt: "Blacklight party 2024 met Cannix B2B Oblivion",
    event: "Blacklight",
    year: "2024",
    location: "Belgium",
  },
  {
    src: "/images/mexican_wave_party_2023.jpg",
    alt: "Mexican Wave Party 2023 met Cannix",
    event: "Mexican Wave Party",
    year: "2023",
    location: "Belgium",
  },
  {
    src: "/images/18_jarige_halen_2023.jpg",
    alt: "18-jarige Halen 2023 met Cannix",
    event: "18-jarige Halen",
    year: "2023",
    location: "Halen",
  },
  {
    src: "/images/jeughduis_rave_2023.jpg",
    alt: "Jeugdhuis rave 2023 met Cannix",
    event: "Jeugdhuis Rave",
    year: "2023",
    location: "Belgium",
  },
];