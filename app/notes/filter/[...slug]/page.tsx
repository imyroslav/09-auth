import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { getNotes } from "../../../../lib/api";
import type { GetNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";
// import { fetchNoteById } from "../../../../lib/api";
// import { type Note } from "../../../../types/note"

type Props = {
  params: Promise<{ slug: string[] }>;
};

// type Props = {
//   params: Promise<{ id: string }>;
// };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All" : slug[0];
  

  return {
    title: `Notes: ${tag || "All"}`,
    description: `Notes filtered by tag: ${tag || "All"}`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Notes filtered by tag: ${tag || "All"}`,
      url: `https://08-zustand-mu-ten.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ]
    
    }
  }
}

export default async function NotesPage({ params }: Props) {

  const { slug } = await params; 

  const queryClient = new QueryClient();

  const rawTag = slug?.[0] || "";
  const tag = rawTag === "All" ? "" : rawTag;

  const data: GetNotes = await getNotes(1, 12, "", tag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag], 
    queryFn: () => Promise.resolve(data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} tag={tag} />
    </HydrationBoundary>
  );
}