import { useState, useContext, useEffect } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import "./BattleGame.css";

const BattleGame = () => {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [userPokemonHPCurrent, setUserPokemonHPCurrent] = useState(null);
  const [opponentPokemonHPCurrent, setOpponentPokemonHPCurrent] =
    useState(null);

  // Ensure userPokemonHPCurrent is initialized with correct value
  useEffect(() => {
    if (userPokemon) {
      setUserPokemonHPCurrent(userPokemon.base.HP);
    }
  }, [userPokemon]);

  // Ensure opponentPokemonHPCurrent is initialized with correct value
  useEffect(() => {
    if (opponentPokemon) {
      setOpponentPokemonHPCurrent(opponentPokemon.base.HP);
    }
  }, [opponentPokemon]);

  // Function to handle attacks
  const handleAttack = () => {
    if (userPokemonHPCurrent !== null) {
      const newHealth = userPokemonHPCurrent - 10; // Decrease user's Pokémon health by 10
      setUserPokemonHPCurrent(newHealth); // Update the state
    }
  };

  const handleHeal = () => {
    if (userPokemonHPCurrent !== null) {
      const newHealth = userPokemonHPCurrent + 10; // Decrease user's Pokémon health by 10
      setUserPokemonHPCurrent(newHealth); // Update the state
    }
  };

  const handleOpponentAttack = () => {
    if (opponentPokemonHPCurrent !== null) {
      const newHealth = opponentPokemonHPCurrent - 10; // Decrease opponent's Pokémon health by 10
      setOpponentPokemonHPCurrent(newHealth); // Update the state
    }
  };

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
        <div className="PokemonDisplays">
          <div className="pokemon">
            <img src={userPokemon.url} alt={userPokemon.name.english} />
            <h3>{userPokemon.name.english}</h3>
            {/* Health bar for userPokemon */}
            <progress
              id="UserPokehealth"
              value={userPokemonHPCurrent}
              max={userPokemon ? userPokemon.base.HP : 0}
            ></progress>
          </div>
          <div className="pokemon">
            <img src={opponentPokemon.url} alt={opponentPokemon.name.english} />
            <h3>{opponentPokemon.name.english}</h3>
            {/* Health bar for opponentPokemon */}
            <progress
              id="OpponentPokehealth"
              value={opponentPokemonHPCurrent}
              max={opponentPokemon ? opponentPokemon.base.HP : 0}
            ></progress>
          </div>
        </div>
        <div className="ActionContainer">
          <button onClick={handleAttack}>Attack</button>
          <button onClick={handleHeal}>Heal</button>
          <button onClick={handleOpponentAttack}>Opponent Attack</button>
        </div>
      </div>
    );
  };

  const renderPokemonWinScreen = () => {
    return (
      <div className="pokemon-win-screen">
        <h2>Congratulations! You won!</h2>
        <button onClick={() => setUserPokemon(null)}>Play again</button>
      </div>
    );
  };

  const renderPokemonLoseScreen = () => {
    return (
      <div className="pokemon-lose-screen">
        <h2>Oh no! You lost!</h2>
        <button onClick={() => setUserPokemon(null)}>Play again</button>
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

  if (opponentPokemonHPCurrent === 0) {
    return renderPokemonWinScreen();
  }

  if (userPokemonHPCurrent === 0) {
    return renderPokemonLoseScreen();
  }

  return <div className="battle-game-container">{renderBattleScreen()}</div>;
};

export default BattleGame;
