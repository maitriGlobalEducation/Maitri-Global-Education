import Button from "./Button";

interface HeroCTA {
  label: string;
  url: string;
  enabled: boolean;
}

interface HeroTitleProps {
  heading: string;
  subtitle: string;
  cta1: HeroCTA;
  cta2: HeroCTA;
}

function HeroTitle({ heading, subtitle, cta1, cta2 }: HeroTitleProps) {
  return (
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl flex flex-col items-center justify-center z-10 px-2 mt-10">
      <div className="flex flex-col items-center gap-3">
        <h1
          style={{ fontFamily: "Epika" }}
          className="bg-linear-to-r from-[#d4af37] via-[#f5deb3] to-[#b8860b] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold tracking-wide text-center uppercase drop-shadow-lg"
        >
          {heading}
        </h1>

        <h2
          style={{ fontFamily: "Epika" }}
          className="w-full max-w-xl sm:text-lg md:text-2xl leading-tight font-semibold text-center bg-linear-to-r from-[#ffefbb] via-[#fddc99] to-[#e0c97d] bg-clip-text text-transparent drop-shadow-md"
        >
          {subtitle}
        </h2>

        <div className="mt-2 flex w-fit flex-col items-center gap-3 min-[400px]:flex-row min-[400px]:gap-5">
          {cta1.enabled && cta1.label && cta1.url && (
            <Button text={cta1.label} to={cta1.url} />
          )}

          {cta2.enabled && cta2.label && cta2.url && (
            <Button text={cta2.label} to={cta2.url} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroTitle;
