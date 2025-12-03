"use client";
import css from "./Notes.module.css";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import useModalControl from "@/hooks/useModalControl";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorHandler from "./error";
const NotesClient = () => {
  const { isModalOpen, openModal, closeModal } = useModalControl();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.value);
  //   setSearch(event.target.value);
  // };

  const { data, isFetching, isLoading, error, refetch } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
    staleTime: 10,
  });
  const debounceSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 30);
  if (error) {
    return <ErrorHandler error={error as Error} reset={() => refetch()} />;
  }
  const totalPages = data?.totalPages ?? 0;
  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox
            search={search}
            onChange={(e) => debounceSearch(e.target.value)}
          />
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </div>
        {isFetching && <Loader />}
        {data?.notes && data.notes.length > 0 && (
          <> {data && !isLoading && <NoteList notes={data.notes} />}</>
        )}
        {!isLoading &&
          data &&
          data.notes.length === 0 &&
          data.totalPages === 0 && <p>No notes found for your search ☹️</p>}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} onSuccess={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default NotesClient;
