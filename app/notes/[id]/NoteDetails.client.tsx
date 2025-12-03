"use client";
import css from "../Notes.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import Link from "next/link";
const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  // { data: todo } - деструктуризація обєкта з переіменуванням
  const {
    data: note,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) {
    return (
      <div>
        <Link className="backBtn" href="/notes">
          <span className="backBtnSpan">←</span> Go back
        </Link>
        <p className={css.error}>
          ❌ Error: Failed to load the note.
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
  return (
    <div>
      <Link className="backBtn" href={`/notes`}>
        <span className="backBtnSpan">←</span> Go back
      </Link>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
