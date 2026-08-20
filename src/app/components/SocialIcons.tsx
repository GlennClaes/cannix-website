import { Instagram, Facebook } from "lucide-react";

export function SoundCloudIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M11.56 8.87V17h8.76c1.85-.13 2.68-1.27 2.68-2.5 0-1.49-1.37-2.7-3.03-2.7-.31 0-.6.05-.87.12C18.89 9.62 17.07 8 14.84 8c-.98 0-1.88.36-2.58.96-.18.15-.23.38-.23.56v-.01l-.02.36h-.01zM8.15 9.67V17h1.5V9.4c-.47-.18-.97-.28-1.5-.28v.55zM6.09 12.27V17h1.5v-5.2c-.45.18-.98.47-1.5.47zM3.85 13.53V17h1.5v-3.85c-.34.14-.9.38-1.5.38zM1.56 15.47V17H3v-1.48c-.19.03-.95-.05-1.44-.05z" />
        </svg>
    );
}

export { Instagram, Facebook };
