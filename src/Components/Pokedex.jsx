import { useContext, useState } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/Pokedex.module.css";

export default function Pokedex() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Search should be case-insensitive
  };

  const handleTypeChange = (type) => {
    setSelectedType(type === "" ? "" : type);
  };

  const filteredPokemons =
    selectedType === ""
      ? allPokemons.filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(searchTerm)
        ) // Search all Pokemons by name
      : allPokemons
          .filter((pokemon) =>
            pokemon.type.some((type) => type === selectedType)
          )
          .filter((pokemon) =>
            pokemon.name.english.toLowerCase().includes(searchTerm)
          ); // Search filtered Pokemons by name

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
      case "Normal":
        return styles.button_color_normal;
      case "Water":
        return styles.button_color_water;
      case "Ground":
        return styles.button_color_ground;
      default:
        return styles.filter_button; // Default color for non-matching types
    }
  };

  const getCardColorBasedOnPokemonType = (pokemon) => {
    return getColorBasedOnType(pokemon.type[0]); // Use the first type for card background
  };

  return (
    <div className={styles.main_pokedex_wrapper_container}>
      <div className={styles.search_bar_container}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className={styles.search_bar_pokedex}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img src="Pokeball.png" />
      </div>
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
          All Pokémon
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
            <div
              className={`${
                styles.card_container
              } ${getCardColorBasedOnPokemonType(pokemon)}`}
              key={pokemon.id}
            >
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
