import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub application",
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
      <body>
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
