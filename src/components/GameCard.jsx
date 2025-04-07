import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import "../styles/gamecard.css";

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.some((fav) => fav.id === game.id)
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  return (
    <div className="game-card">
      
      <Link to={`/game/${game.id}`} className="game-link">
        <img src={game.background_image} alt={game.name} />
        <h3>{game.name}</h3>
      </Link>

      
      <p className="game-category">
        🎮 {game.genres.map((genre) => genre.name).join(", ")}
      </p>

     
      <p className="game-tags">
        🏷️ {game.tags.slice(0, 3).map((tag) => tag.name).join(", ")}
      </p>

     
      <p className="game-rating">⭐ {game.rating}</p>

      
      <button onClick={toggleFavorite} className="fav-btn">
        {isFavorite ? "💔 Remove" : "❤️ Favorite"}
      </button>
    </div>
  );
};

export default GameCard;
