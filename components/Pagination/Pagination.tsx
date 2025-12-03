import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}
const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        onPageChange={({ selected }) => setPage(selected + 1)}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        nextLabel="→"
        previousLabel="←"
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        marginPagesDisplayed={1}
      />
    </div>
  );
};

export default Pagination;
