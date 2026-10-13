import HeroTitle from "./HeroTitle";

interface HeroProps {
  hero: {
    backgroundVideo: {
      url: string;
      publicId: string;
    } | null;
    heading: string;
    subtitle: string;
    cta1: {
      label: string;
      url: string;
      enabled: boolean;
    };
    cta2: {
      label: string;
      url: string;
      enabled: boolean;
    };
    overlayOpacity: number;
    isVisible: boolean;
  };
}

export default function Hero({ hero }: HeroProps) {
  if (!hero.isVisible) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero-poster.webp"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-70"
      >
        {hero.backgroundVideo?.url && (
          <source src={hero.backgroundVideo.url} type="video/mp4" />
        )}
      </video>

      <div
        className="absolute top-0 left-0 w-full h-full bg-black z-0"
        style={{ opacity: hero.overlayOpacity / 100 }}
      />

      <HeroTitle
        heading={hero.heading || "Turn Your Study Abroad Dreams into REALITY"}
        subtitle={hero.subtitle || "Guiding You to a Global Future since 2009"}
        cta1={hero.cta1}
        cta2={hero.cta2}
      />
    </div>
  );
}
