import { useState, useContext, useEffect } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import "./BattleGame.css"; // Ensure this path matches your updated CSS file

const BattleGame = () => {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [userPokemonHPCurrent, setUserPokemonHPCurrent] = useState(null);
  const [opponentPokemonHPCurrent, setOpponentPokemonHPCurrent] =
    useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleMessage, setBattleMessage] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerName, setPlayerName] = useState(" ");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    if (userPokemon) {
      setUserPokemonHPCurrent(userPokemon.base.HP);
    }
  }, [userPokemon]);

  useEffect(() => {
    if (opponentPokemon) {
      setOpponentPokemonHPCurrent(opponentPokemon.base.HP);
    }
  }, [opponentPokemon]);

  const handleAttack = () => {
    if (playerTurn && opponentPokemonHPCurrent !== null && userPokemon) {
      const baseDamage = 20;
      const damageDealt = Math.max(
        1,
        (userPokemon.base.Attack / opponentPokemon.base.Defense) * baseDamage
      );
      const newHealth = Math.max(0, opponentPokemonHPCurrent - damageDealt);

      setOpponentPokemonHPCurrent(newHealth);
      setBattleMessage(
        `${userPokemon.name.english} attacked ${
          opponentPokemon.name.english
        } for ${damageDealt.toFixed(0)} damage!`
      );
      setPlayerTurn(false);
      setIsAttacking(true);
      setTimeout(() => {
        setIsAttacking(false);
      }, 800); // Time for animation
    }
  };

  const handleHeal = () => {
    if (playerTurn && userPokemonHPCurrent !== null) {
      const newHealth = Math.min(
        userPokemonHPCurrent + 20,
        userPokemon.base.HP
      );
      setUserPokemonHPCurrent(newHealth);
      setBattleMessage("Player healed their Pokémon!");
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    const aiTurn = () => {
      if (userPokemonHPCurrent <= 0 || opponentPokemonHPCurrent <= 0) {
        return; // End the AI turn if the game is over
      }

      if (!playerTurn && opponentPokemonHPCurrent !== null) {
        const aiAction = Math.random() < 0.5 ? "attack" : "heal";
        let newHealth;
        if (aiAction === "attack") {
          newHealth = Math.max(0, userPokemonHPCurrent - 10);
          setUserPokemonHPCurrent(newHealth);
          setBattleMessage("Opponent attacked!");
        } else {
          newHealth = Math.min(
            opponentPokemonHPCurrent + 20,
            opponentPokemon.base.HP
          );
          setOpponentPokemonHPCurrent(newHealth);
          setBattleMessage("Opponent healed their Pokémon!");
        }
        setPlayerTurn(true);
      }
    };

    if (!playerTurn) {
      const timeoutId = setTimeout(aiTurn, 1000);
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [playerTurn, userPokemonHPCurrent, opponentPokemonHPCurrent]);

  const submitScore = async () => {
    try {
      const response = await fetch("http://localhost:8080/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playername: playerName, score: playerScore }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }
      console.log("Score submitted successfully");
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    // Check if the game is won and if the playerName should be set
    if (!playerName && opponentPokemonHPCurrent <= 0) {
      setShowNameInput(true);
      setPlayerScore(playerScore + 100); // Increment score by 100 when the player wins
      submitScore(); // This could be conditional based on whether playerName is already set
    } else {
      setShowNameInput(false);
    }
  }, [opponentPokemonHPCurrent, playerName, playerScore, submitScore]);

  const handleSelectPokemon = (pokemon) => {
    setUserPokemon(pokemon);
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    setOpponentPokemon(allPokemons[randomIndex]);
  };

  useEffect(() => {
    // Submit the score when the user wins
    if (opponentPokemonHPCurrent <= 0) {
      setPlayerScore(playerScore + 100); // Increment score and submit it
    }
  }, [opponentPokemonHPCurrent]);

  const renderPokemonSelectMenu = () => (
    <div className="pokemon-menu">
      <h1>Select Your Pokemon</h1>
      <div className="pokemon-list">
        {allPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-option"
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <img
              src={pokemon.url}
              alt={pokemon.name.english}
              className="pokeOptPic"
            />
            <button className="SelectPokeBut">
              Select <br /> {pokemon.name.english}{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBattleScreen = () => (
    <div className="battle-screen">
      <div className="PokemonDisplays">
        <div className="pokemon">
          <img
            src={userPokemon.url}
            alt={userPokemon.name.english}
            className={`pokemon-image ${
              isAttacking ? "pokemon-attacking" : ""
            }`}
          />
          <h3>{userPokemon.name.english}</h3>
          <progress
            value={userPokemonHPCurrent}
            max={userPokemon ? userPokemon.base.HP : 0}
          ></progress>
        </div>
        <div className="pokemon">
          <img src={opponentPokemon.url} alt={opponentPokemon.name.english} />
          <h3>{opponentPokemon.name.english}</h3>
          <progress
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

  const renderPokemonWinScreen = () => {
    const handleNameSubmit = async () => {
      if (playerName.trim() !== "") {
        await submitScore();
        setPlayerScore(playerScore + 100); // Increment the player's score for win scenario
      } else {
        alert("Please enter a name.");
      }

      setUserPokemon(null);
      setOpponentPokemon(null);
    };

    return (
      <div className="pokemon-win-screen">
        <img className="endImg" src="/won.png" alt="You Win!" />
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleNameSubmit}>Submit Score</button>
        <button
          className="TryagainButton"
          onClick={() => {
            setUserPokemon(null);
            setOpponentPokemon(null);
            setBattleMessage("");
          }}
        >
          <img className="endImgT" src="/try.png" alt="try again?" />
        </button>
      </div>
    );
  };

  const renderPokemonLoseScreen = () => {
    const handleNameSubmit = async () => {
      if (playerName.trim() !== "") {
        await submitScore();
        setPlayerScore(0); // Reset the player's score for lose scenario
      } else {
        alert("Please enter a name.");
      }

      setUserPokemon(null);
      setOpponentPokemon(null);
    };

    return (
      <div className="pokemon-lose-screen">
        <img className="endImg" src="/lost.png" alt="You Lose!" />
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleNameSubmit}>Submit Score</button>
        <button
          className="TryagainButton"
          onClick={() => {
            setUserPokemon(null);
            setOpponentPokemon(null);
            setBattleMessage("");
          }}
        >
          <img className="endImgT" src="/try.png" alt="Try Again?" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="LoadingDisplay">
        <img src="Loading.gif" />
        <h1 style={{ marginTop: "5rem" }}>Loading...</h1>
      </div>
    );
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
