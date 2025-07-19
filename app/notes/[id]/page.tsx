import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { Metadata } from "next";
import { type Note } from "../../../types/note"

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  console.log(id)

  return (
    {
      title: note.title,
      description: note.content,
      openGraph: {
        title: note.title,
        description: note.content,
        url: `https://08-zustand-mu-ten.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "note",
          }
        ]
      }  
    }
    
  ) 
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id], 
    queryFn: () => fetchNoteById(id),  
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}