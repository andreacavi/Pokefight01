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
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleMessage, setBattleMessage] = useState("");

  const userPokemonAttack = 10;

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

  const handleAttack = () => {
    if (playerTurn && userPokemonHPCurrent !== null) {
      const newHealth = opponentPokemonHPCurrent - 10; // Decrease opponent's Pokémon health by 10
      setOpponentPokemonHPCurrent(newHealth); // Update the state
      setBattleMessage("Player attacked!");
      setPlayerTurn(false); // Switch turns to AI
    }
  };

  const handleHeal = () => {
    if (playerTurn && userPokemonHPCurrent !== null) {
      const newHealth = userPokemonHPCurrent + 10; // Increase user's Pokémon health by 10
      setUserPokemonHPCurrent(newHealth); // Update the state
      setBattleMessage("Player healed their Pokémon!");
      setPlayerTurn(false); // Switch turns to AI
    }
  };

  useEffect(() => {
    if (!playerTurn && opponentPokemonHPCurrent !== null) {
      const aiAction = Math.random() < 0.5 ? "attack" : "heal"; // Randomly choose AI action
      if (aiAction === "attack") {
        const newHealth = userPokemonHPCurrent - 10; // Decrease user's Pokémon health by 10
        setUserPokemonHPCurrent(newHealth); // Update the state
        setBattleMessage("Opponent attacked!");
      } else if (aiAction === "heal") {
        const newHealth = opponentPokemonHPCurrent + 10; // Increase opponent's Pokémon health by 10
        setOpponentPokemonHPCurrent(newHealth); // Update the state
        setBattleMessage("Opponent healed their Pokémon!");
      }
      setPlayerTurn(true); // Switch turns back to player
    }
  }, [playerTurn]);

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
        <div className="LogicDisplay">
          <div className="ActionContainer">
            <button
              className="ActionButtons"
              onClick={handleAttack}
              disabled={!playerTurn}
            >
              Attack
            </button>
            <button
              className="ActionButtons"
              onClick={handleHeal}
              disabled={!playerTurn}
            >
              Heal
            </button>
          </div>

          <div className="BattleMessage">{battleMessage}</div>
        </div>
      </div>
    );
  };

  const renderPokemonWinScreen = () => {
    return (
      <div className="pokemon-win-screen">
        <img className="endImg" src="/won.png" alt="You Win!" />

        <button className="TryagainButton" onClick={() => setUserPokemon(null)}>
          <img className="endImgT" src="/try.png" alt="try again?" />
        </button>
      </div>
    );
  };

  const renderPokemonLoseScreen = () => {
    return (
      <div className="pokemon-lose-screen">
        <img className="endImg" src="/lost.png" alt="You lose!" />
        <button className="TryagainButton" onClick={() => setUserPokemon(null)}>
          <img className="endImgT" src="/try.png" alt="try again?" />
        </button>
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

  if (opponentPokemonHPCurrent <= 0) {
    return renderPokemonWinScreen();
  }

  if (userPokemonHPCurrent <= 0) {
    return renderPokemonLoseScreen();
  }

  return <div className="battle-game-container">{renderBattleScreen()}</div>;
};

export default BattleGame;
