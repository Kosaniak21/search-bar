import { useDeferredValue, useState } from "react";
import "./searchbar.css";
import CoinsList from "@components/CoinsList/CoinsLIst";
import Button from "@components/Button/Button";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);
  const [filterType, setFilterType] = useState("all");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <i className="codicon codicon-search icon-search-input"></i>
        {searchValue && (
          <i
            className="codicon codicon-close icon-close"
            onClick={clearSearchValue}
          ></i>
        )}
        <input
          type="text"
          placeholder="Search..."
          tabIndex={2}
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="search-bar__navigation">
        <Button
          className="button-favorites"
          tabIndex={3}
          onClick={() => setFilterType("favorites")}
        >
          <i className="codicon codicon-star-full icon-star"></i>FAVORITES
        </Button>
        <Button
          className="button-all-coins"
          tabIndex={4}
          onClick={() => setFilterType("all")}
        >
          ALL COINS
        </Button>
      </div>
      <CoinsList searchValue={deferredSearchValue} filterType={filterType} />
    </div>
  );
};

export default SearchBar;
