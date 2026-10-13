import "server-only";

import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

interface BlogContentProps {
  content: Record<string, unknown>;
}

const PublicImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: "auto",

        parseHTML: (element) =>
          element.getAttribute("width") || element.style.width || "auto",

        renderHTML: (attributes) => ({
          style: `width: ${
            attributes.width === "auto"
              ? "auto"
              : typeof attributes.width === "number"
                ? `${attributes.width}px`
                : attributes.width
          }; max-width: 100%; height: auto;`,
        }),
      },
    };
  },
});

export default function BlogContent({ content }: BlogContentProps) {
  const html = generateHTML(content as never, [
    StarterKit,

    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer",
        class: "blog-link",
      },
    }),

    PublicImage.configure({
      inline: false,
      allowBase64: false,
      HTMLAttributes: {
        class: "blog-image",
      },
    }),

    Table.configure({
      resizable: false,
      HTMLAttributes: {
        class: "blog-table",
      },
    }),

    TableRow,
    TableHeader,
    TableCell,
  ]);

  return (
    <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
