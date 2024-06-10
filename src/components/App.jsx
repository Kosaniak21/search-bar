import "./app.css";
import { useState, useEffect } from "react";
import Button from "./Button/Button";
import SearchBar from "./SearchBar/SearchBar";
import "@vscode/codicons/dist/codicon.css";

function App() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearchBar = (event) => {
    event.stopPropagation();
    setSearchVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    console.log(event.target);
    console.log(event.target.closest(".search-bar"));
    if (!event.target.closest(".search-bar")) {
      console.log(event.target.className);
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchVisible(false);
      }
    };

    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchVisible]);

  return (
    <div className="navigation">
      <Button
        isActive={isSearchVisible}
        onClick={toggleSearchBar}
        className={"button-search"}
      >
        <i className="codicon codicon-search icon-button"></i>
        SEARCH
      </Button>
      {isSearchVisible && <SearchBar />}
    </div>
  );
}

export default App;
