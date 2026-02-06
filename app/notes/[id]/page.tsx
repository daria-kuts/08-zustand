import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { getQueryClient } from "../../../components/TanStackProvider/getQueryClient";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { id } = await params;

  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 120),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 120),
      url: `https://notehub.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

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
