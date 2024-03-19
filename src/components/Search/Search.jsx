import useDebounce from '../../hooks/useDebounce';
import './Search.css';

const Search = ({ updateSearchTerm }) => {
    const debouncedUpdateSearch = useDebounce((e) =>
        updateSearchTerm(e.target.value)
    );
    return (
        <input
            type="text"
            placeholder="which pokemon you are looking for ?"
            id="search-pokemon"
            onChange={debouncedUpdateSearch}
        />
    );
};

export default Search;
