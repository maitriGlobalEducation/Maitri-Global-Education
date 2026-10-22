import Link from "next/link";

interface ButtonProps {
  text: string;
  to: string;
}

export default function Button({ text, to }: ButtonProps) {
  return (
    <Link
      href={to}
      className="
  group relative inline-flex min-h-12 w-fit shrink-0
  items-center justify-center overflow-hidden
  border border-white bg-black px-6 py-3
  text-center text-white uppercase
  cursor-pointer whitespace-nowrap

  before:absolute before:inset-0 before:bg-white
  before:[clip-path:polygon(100%_0,100%_100%,0_100%,100%_100%)]
  before:transition-[clip-path] before:duration-200
  before:ease-in-out
  hover:before:[clip-path:polygon(100%_0,0_0,0_100%,100%_100%)]

  sm:min-h-13 sm:px-7
"
    >
      <span className="relative block overflow-hidden">
        <span
          className="
    relative block whitespace-nowrap
    text-[10px] font-black
    mix-blend-difference
    group-hover:animate-[move-up-alternate_0.3s_ease_forwards]
    sm:text-xs
  "
        >
          {text}
        </span>
      </span>
    </Link>
  );
}
