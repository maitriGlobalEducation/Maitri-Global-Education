import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Navbar from "@/components/Common Components/Navbar";
import Footer from "@/components/Home Page Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maitri Global Education",
  description:
    "Explore international education opportunities with Maitri Global Education.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
