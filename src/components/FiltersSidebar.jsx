import React,{ useState} from "react";
import "../styles/filters.css";

const FiltersSidebar = ({ onFilterChange, isVisible, onToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ selectedCategory, selectedTag, selectedYear, sortBy });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSelectedYear("");
    setSortBy("");
    onFilterChange({ selectedCategory: "", selectedTag: "", selectedYear: "", sortBy: "" });
  };

  const handleClose = () => {
    if (onToggle) onToggle(); 
  };

  return (
    <div className={`filters-sidebar ${isVisible ? "show" : ""}`}>
  <button1 className="close-btn" onClick={handleClose}>X</button1>
  <h3>🎮 Filters</h3>
 

      <label>Category:</label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="RPG">RPG</option>
      </select>

      <label>Tags:</label>
      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        <option value="">All</option>
        <option value="Multiplayer">Multiplayer</option>
        <option value="Open World">Open World</option>
        <option value="Shooter">Shooter</option>
      </select>

      <label>Release Year:</label>
      <input type="number" placeholder="Year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />

      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">None</option>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
      <button className="clear-filters-btn" onClick={clearFilters}>Clear All Filters</button>
    </div>
  );
};

export default FiltersSidebar;