import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { fetchGames } from "../Services/api";
import GameCard from "../components/GameCard";
import FiltersSidebar from "../components/FiltersSidebar";
import "../styles/homepage.css";

const HomePage = forwardRef(({ searchQuery, onToggleFilters, isSidebarVisible, setResetRef }, ref) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    selectedCategory: "",
    selectedTag: "",
    selectedYear: "",
    sortBy: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 18;

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames(1);
        if (Array.isArray(data) && data.length > 0) {
          setGames(data);
          setFilteredGames(data);
        } else {
          throw new Error("No games found in API response.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  useEffect(() => {
    let filtered = games;
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((game) => game.name && game.name.toLowerCase().includes(lowerQuery));
    }
    if (filters.selectedCategory) {
      filtered = filtered.filter((game) => game.genres.some((genre) => genre.name === filters.selectedCategory));
    }
    if (filters.selectedTag) {
      filtered = filtered.filter((game) => game.tags.some((tag) => tag.name === filters.selectedTag));
    }
    if (filters.selectedYear) {
      filtered = filtered.filter((game) => new Date(game.released).getFullYear().toString() === filters.selectedYear);
    }
    if (filters.sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "popularity") {
      filtered = filtered.sort((a, b) => b.reviews_count - a.reviews_count);
    }
    setFilteredGames(filtered);
    setCurrentPage(1); 
  }, [searchQuery, games, filters]);

  useImperativeHandle(setResetRef, () => ({
    resetToDefault() {
      setCurrentPage(1);
      setFilters({
        selectedCategory: "",
        selectedTag: "",
        selectedYear: "",
        sortBy: "",
      });
    },
  }));

  useEffect(() => {
    if (setResetRef) setResetRef.current = { resetToDefault: () => setCurrentPage(1) };
  }, [setResetRef]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const handleToggleFilters = () => {
    if (onToggleFilters) onToggleFilters();
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <p className="loading-text">Loading games...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="homepage">
      <div className={`game-container ${isSidebarVisible ? "sidebar-visible" : ""}`}>
        <div className={`game-list ${isSidebarVisible ? "sidebar-visible" : ""}`}>
          {currentGames.length > 0 ? (
            currentGames.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className="no-games-text">No games found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <FiltersSidebar onFilterChange={setFilters} isVisible={isSidebarVisible} onToggle={handleToggleFilters} />
    </div>
  );
});

export default HomePage;
