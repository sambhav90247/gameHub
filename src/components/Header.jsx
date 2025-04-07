import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import "../styles/header.css";

const Header = ({ onSearch, onToggleFilters, onResetHome }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleSearch = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleFavoritesClick = () => {
    if (isSignedIn) {
      navigate("/favorites");
    } else {
      navigate("/sign-in");
    }
  };

  const handleLogoClick = () => {
    setQuery(""); // Clear search input field
    if (onSearch) onSearch(""); // Reset search in parent
    if (onResetHome) onResetHome(); // Custom reset logic from parent
    navigate("/"); // Navigate to homepage
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={handleLogoClick}>🎮 GameHub</h1>

      <input
        type="text"
        placeholder="Search games..."
        className="search-bar"
        value={query}
        onChange={handleSearch}
      />

      <div className="header-buttons">
        <button className="filter-toggle-btn" onClick={onToggleFilters}>Show Filters</button>
        <button className="favorites-btn" onClick={handleFavoritesClick}>⭐ Favorites</button>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button className="signin-btn">Sign In</button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Header;
