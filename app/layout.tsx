import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Common Components/Navbar";
import Footer from "@/components/Home Page Components/Footer";
import { ToastContainer } from "react-toastify";

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
      <body className="flex min-h-full flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
