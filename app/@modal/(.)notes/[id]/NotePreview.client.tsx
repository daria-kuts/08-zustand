"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import css from "./NotePreview.module.css";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        
        <button className={css.backBtn} onClick={handleClose}>
          ← Back
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <span className={css.tag}>{data.tag}</span>
          </div>

          <p className={css.content}>{data.content}</p>

          <p className={css.date}>
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}
