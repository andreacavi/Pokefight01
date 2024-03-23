import React, { useState, useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import "./BattleGame.css";

const BattleGame = () => {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);

  const handleSelectPokemon = (pokemon) => {
    setUserPokemon(pokemon);
    // Select a random opponent
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    setOpponentPokemon(allPokemons[randomIndex]);
  };

  const renderPokemonSelectMenu = () => {
    return (
      <div className="pokemon-menu">
        <h2>Select Your Pokemon</h2>
        <div className="pokemon-list">
          {allPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-option">
              <img
                src={pokemon.url}
                alt={pokemon.name.english}
                className="pokeOptPic"
              />
              <button
                className="SelectPokeBut"
                onClick={() => handleSelectPokemon(pokemon)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBattleScreen = () => {
    return (
      <div className="battle-screen">
        <div className="pokemon">
          <img src={userPokemon.url} alt={userPokemon.name.english} />
          <h3>{userPokemon.name.english}</h3>
          {/* Health bar for userPokemon */}
        </div>
        <div className="pokemon">
          <img src={opponentPokemon.url} alt={opponentPokemon.name.english} />
          <h3>{opponentPokemon.name.english}</h3>
          {/* Health bar for opponentPokemon */}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allPokemons || allPokemons.length === 0) {
    return <div>Error: Unable to fetch Pokémon data</div>;
  }

  if (!userPokemon) {
    return renderPokemonSelectMenu();
  }

  return <div className="battle-game-container">{renderBattleScreen()}</div>;
};

export default BattleGame;
