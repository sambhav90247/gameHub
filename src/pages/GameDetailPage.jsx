import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById } from "../Services/api";
import "../styles/gameDetails.css";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      const data = await fetchGameById(id);
      setGame(data);
    };
    loadGameDetails();
  }, [id]);

  if (!game) return <h2>Loading...</h2>;

  return (
    <div className="game-details">
      <button className="back-button" onClick={() => navigate("/")}>← Back to Home</button>
      
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="game-image" />
      <p>{game.description_raw || "No description available."}</p>

      <h3>Genres: {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}</h3>
      <h3>Released: {game.released || "N/A"}</h3>
      <h3>Metacritic Score: {game.metacritic || "N/A"}</h3>
      <h3>Ratings: {game.rating || "N/A"} / 5</h3>

     

      <h3>
        Developers: {game.developers ? game.developers.map((d) => d.name).join(", ") : "N/A"}
      </h3>

      <h3>System Requirements:</h3>
      {game.platforms && game.platforms.length > 0 ? (
        game.platforms.map((p, index) => {
          const requirements = p.requirements_en || p.requirements; 
          if (!requirements) return null; 

          return (
            <div key={index}>
              <h4>{p.platform?.name}</h4>
              {requirements.minimum && <p><strong>Minimum:</strong> {requirements.minimum}</p>}
              {requirements.recommended && <p><strong>Recommended:</strong> {requirements.recommended}</p>}
            </div>
          );
        })
      ) : (
        <p>System requirements not available.</p>
      )}
    </div>
  );
};

export default GameDetails;
