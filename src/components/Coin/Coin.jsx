import "./coin.css";
const Coin = ({ coin, isFavorite, onToggleFavorite }) => {
  const handleToggleFavorite = () => {
    onToggleFavorite(coin);
  };

  return (
    <div className="coin">
      {isFavorite ? (
        <i
          className="codicon codicon-star-full icon-star"
          onClick={handleToggleFavorite}
        ></i>
      ) : (
        <i
          className="codicon codicon-star-empty icon-star"
          onClick={handleToggleFavorite}
        ></i>
      )}
      <p>{coin}</p>
    </div>
  );
};

export default Coin;
