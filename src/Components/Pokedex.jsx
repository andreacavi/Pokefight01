import { useContext, useState } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/Pokedex.module.css";

export default function Pokedex() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (type) => {
    setSelectedType(type === "" ? "" : type);
  };

  const filteredPokemons =
    selectedType === ""
      ? allPokemons
      : allPokemons.filter((pokemon) => {
          return pokemon.type.some((type) => type === selectedType);
        });

  const buttonTypes = [
    "Bug",
    "Grass",
    "Poison",
    "Normal",
    "Water",
    "Ground",
    "Ghost",
    "Dragon",
    "Flying",
    "Fire",
    "Fighting",
    "Rock",
    "Electric",
    "Fairy",
    "Psychic",
    "Ice",
  ];

  const getColorBasedOnType = (type) => {
    switch (type) {
      case "Bug":
        return styles.button_color_bug;
      case "Grass":
        return styles.button_color_grass;
      // Add cases for other types with their corresponding color class names
      case "Poison":
        return styles.button_color_poison;
      default:
        return styles.filter_button; // Default color for non-matching types
    }
  };

  return (
    <div className={styles.main_pokedex_wrapper_container}>
      <div className={styles.container_button_all_pokemons}>
        <button
          key=""
          className={
            selectedType === ""
              ? styles.active_button_all
              : styles.filter_button_all
          }
          onClick={() => handleTypeChange("")}
        >
          Show All Pokémon
        </button>
      </div>

      <div className={styles.filter_buttons_container}>
        {buttonTypes.map((type) => (
          <button
            key={type}
            className={
              selectedType === type
                ? `${styles.active_button} ${getColorBasedOnType(type)}` // Concatenate styles
                : styles.filter_button
            }
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {loading ? (
        <div className={styles.pokedex_container}>
          <img src="Loading.gif" />
          <h1 style={{ marginTop: "2rem" }}>Loading...</h1>
        </div>
      ) : (
        <div className={styles.allcardscontainer}>
          {filteredPokemons.map((pokemon) => (
            <div className={styles.card_container} key={pokemon.id}>
              <img
                style={{ width: "150px", height: "150px" }}
                className={styles.pokemon_pic}
                src={pokemon.url}
                alt={pokemon.name.english}
              />
              <div className={styles.card_back}>BACK</div>
              <div className={styles.card_front}>
                <h3 className="PokemonName">{pokemon.name.english}</h3>
                <div className="PokemonTypes">
                  {pokemon.type.map((type) => (
                    <p key={type} className="PokemonType">
                      {type}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
