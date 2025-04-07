const API_KEY = "3d71fad70582446991079142be3c5c7c"; 
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchGames = async (page = 1, pageSize = 40, searchQuery = "") => {
  try {
    let url = `${BASE_URL}?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Page ${page} API Response:`, data);

    if (data?.results && Array.isArray(data.results)) {
      return data.results;
    } else {
      throw new Error("❌ Invalid data format: 'results' not found.");
    }
  } catch (error) {
    console.error("🚨 Error fetching games:", error);
    return [];
  }
};

export const fetchGameById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const game = await response.json();
    console.log("✅ Game Details Response:", game);

    
    if (game.platforms) {
      game.platforms = game.platforms.map((p) => ({
        platform: p.platform,
        requirements: p.requirements || { minimum: "N/A", recommended: "N/A" }
      }));
    }

    return game;
  } catch (error) {
    console.error("🚨 Error fetching game details:", error);
    return null;
  }
};
