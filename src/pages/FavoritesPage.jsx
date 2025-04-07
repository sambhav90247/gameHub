import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import "../styles/favorites.css";

const FavoritesPage = ({ searchQuery = "", isSidebarVisible, onToggleFilters }) => {
  const favorites = useSelector((state) => state.favorites);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [filters, setFilters] = useState({
    selectedCategory: "",
    selectedTag: "",
    selectedYear: "",
    sortBy: "",
  });

  useEffect(() => {
    let filtered = [...favorites];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) => game.name && game.name.toLowerCase().includes(lowerQuery)
      );
    }

    if (filters.selectedCategory) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) => genre.name === filters.selectedCategory)
      );
    }

    if (filters.selectedTag) {
      filtered = filtered.filter((game) =>
        game.tags.some((tag) => tag.name === filters.selectedTag)
      );
    }

    if (filters.selectedYear) {
      filtered = filtered.filter(
        (game) => new Date(game.released).getFullYear().toString() === filters.selectedYear
      );
    }

    if (filters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "popularity") {
      filtered.sort((a, b) => b.reviews_count - a.reviews_count);
    }

    setFilteredFavorites(filtered);
  }, [favorites, searchQuery, filters]);

  return (
    <div className="favorites-wrapper">
      <h2 className="favorites-heading">❤️ Favorite Games</h2>

      <div className={`favorites-content ${isSidebarVisible ? "sidebar-visible" : ""}`}>
        <FiltersSidebar
          onFilterChange={setFilters}
          isVisible={isSidebarVisible}
          onToggle={onToggleFilters}
        />

        <div className="favorites-container">
          {filteredFavorites.length === 0 ? (
            <p className="no-fav">No favorite games found.</p>
          ) : (
            filteredFavorites.map((game) => (
              <div key={game.id} className="favorite-card">
                <Link to={`/game/${game.id}`} className="game-link">
                  <img src={game.background_image} alt={game.name} />
                  <h3>{game.name}</h3>
                  <p>⭐ {game.rating}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
