import css from "./App.module.css";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import useModalControl from "../../hooks/useModalControl";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";

function App() {
  const { isModalOpen, openModal, closeModal } = useModalControl();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.value);
  //   setSearch(event.target.value);
  // };

  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
    staleTime: 1000,
  });
  const debounceSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setPage(1);
    },
    300
  );
  const totalPages = data?.totalPages ?? 0;
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={search} onChange={debounceSearch} />
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </header>
        {isLoading && <Loader />}
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
}

export default App;
