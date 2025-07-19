import type { Metadata } from "next";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Note Hub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes.",
  openGraph: {
    title: "Note Hub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://notehub-public.goit.study/api",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "note",
      }
    ]
  }  
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
