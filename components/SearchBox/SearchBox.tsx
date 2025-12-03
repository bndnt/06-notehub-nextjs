import css from "./SearchBox.module.css";
interface SearchBoxProps {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBox = ({ search, onChange }: SearchBoxProps) => {
  return (
    <div>
      <input
        value={search}
        onChange={onChange}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBox;
