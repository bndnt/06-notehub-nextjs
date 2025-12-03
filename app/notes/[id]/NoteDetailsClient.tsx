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
  if (error || !note)
    return (
      <>
        <h1>{error?.name}</h1>
        <h3>{error?.message}</h3>
        <Link className="backBtn" href={`/notes`}>
          <span className="backBtnSpan">←</span> Go back
        </Link>
      </>
    );
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
