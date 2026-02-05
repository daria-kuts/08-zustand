import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
   title: "NoteHub",
  description: "NoteHub is a modern app for creating, organizing and managing your notes.",
  openGraph: {
    title: "NoteHub",
    description: "Create and manage notes easily with NoteHub.",
    url: "https://notehub.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}
            
          </main>
          {modal}
          <Footer />
        </TanStackProvider>

        <div id="modal-root"/>
      </body>
    </html>
  );
}
