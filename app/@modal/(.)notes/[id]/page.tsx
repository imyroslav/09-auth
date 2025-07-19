import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
  import { fetchNoteById } from '../../../../lib/api';
  import NotePreview from './NotePreview.client';
  
  type NotePreviewProps = {
    params: Promise<{ id: string }>;
  };
  
  export default async function NoteModalPage({ params }: NotePreviewProps) {
    const queryClient = new QueryClient();
  
    const { id } = await params;
  
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview />
      </HydrationBoundary>
    );
  }