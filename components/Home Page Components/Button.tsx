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
        group
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        border
        border-white
        bg-black
        px-8
        py-4
        text-white
        uppercase
        cursor-pointer

        before:absolute
        before:inset-0
        before:bg-white
        before:[clip-path:polygon(100%_0,100%_100%,0_100%,100%_100%)]
        before:transition-[clip-path]
        before:duration-200
        before:ease-in-out

        hover:before:[clip-path:polygon(100%_0,0_0,0_100%,100%_100%)]

        max-[600px]:w-full
        max-[600px]:px-0.5
        max-[600px]:py-2
      "
    >
      <span className="relative block overflow-hidden">
        <span
          className="
            relative
            block
            text-[10px]
            font-black
            mix-blend-difference

            group-hover:animate-[move-up-alternate_0.3s_ease_forwards]

            max-[600px]:text-xs
          "
        >
          {text}
        </span>
      </span>
    </Link>
  );
}
