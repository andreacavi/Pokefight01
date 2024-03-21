import { useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/Pokedex.module.css";

export default function Pokedex() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  return (
    <div className={styles.main_pokedex_wrapper_container}>
      {loading ? ( // Check if loading state is true
        <div className={styles.pokedex_container}>
          <img src="Loading.gif" />
          <h1 style={{ marginTop: "2rem" }}>Loading...</h1>
        </div>
      ) : (
        <div className={styles.allcardscontainer}>
          {allPokemons.map((pokemon) => (
            <div className={styles.card_container} key={pokemon.id}>
              <img
                style={{ width: "150px", height: "150px" }}
                className={styles.pokemon_pic}
                src={pokemon.url}
                alt={pokemon.name.english}
              />
              <div className={styles.card_back}>BACK</div>
              <div className={styles.card_front}></div>
              <h3 className="PokemonName">{pokemon.name.english}</h3>
              <div className="PokemonTypes">
                {pokemon.type.map((type) => (
                  <p key={type} className="PokemonType">
                    {type}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
