import Coin from "@components/Coin/Coin";
import "./coinslist.css";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

const CoinsList = ({ searchValue, filterType }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(15);
  const [favorites, setFavorites] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchDataAndLoadFavorites = async () => {
      try {
        const response = await fetch("/coins.json");
        const data = await response.json();
        setCoinsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    };

    fetchDataAndLoadFavorites();
  }, []);

  const sortedData = useMemo(() => {
    let filteredData = coinsData;

    if (searchValue) {
      filteredData = filteredData.filter((coin) =>
        coin.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (filterType === "favorites") {
      filteredData = filteredData.filter((coin) => favorites.includes(coin));
    }

    return [...filteredData].sort().filter((coin) => coin !== "");
  }, [coinsData, searchValue, filterType, favorites]);

  const updateVisibleData = useCallback(() => {
    setVisibleData(sortedData.slice(startIndex, endIndex));
  }, [sortedData, startIndex, endIndex]);

  useEffect(() => {
    updateVisibleData();
  }, [sortedData, startIndex, endIndex, updateVisibleData]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;

      if (scrollTop + containerHeight >= contentHeight - 20) {
        setEndIndex((prevEndIndex) => prevEndIndex + 10);
      }
    }
  };

  const toggleFavorite = (coin) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(coin)
        ? prevFavorites.filter((fav) => fav !== coin)
        : [...prevFavorites, coin];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div
      className="coins-list"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: "400px", overflowY: "auto" }}
    >
      {visibleData.length > 0 ? (
        visibleData.map((coin) => (
          <Coin
            key={coin}
            coin={coin}
            isFavorite={favorites.includes(coin)}
            onToggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <div>NO COINS</div>
      )}
    </div>
  );
};

export default CoinsList;
