import type { Metadata } from "next";
import Link from 'next/link';
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found page",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://08-zustand-mu-ten.vercel.app/notes",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "illustration - 404 Not Found",
      }
    ]
  }  
}  

export default function NotFound() {
  return (
    <div>
        <h1 className={css.h1}>404 - Page not found</h1>
            <p>
                Sorry, the page you are looking for does not exist at all.
            </p>
        <Link href="/">Go back home</Link>
    </div>
  );
};