import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { getQueryClient } from "@/components/TanStackProvider/getQueryClient";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const tag =
    !slug || slug[0] === "all"
      ? undefined
      : slug[0];

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag,
        search: "",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}


