import { useContext, useState } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/Pokedex.module.css";
import { Link } from "react-router-dom";

export default function Pokedex() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  return (
    <div className={styles.main_pokedex_wrapper_container}>
      {loading ? (
        <div className={styles.pokedex_container}>
          <img src="Loading.gif" />
          <h1 style={{ marginTop: "2rem" }}>Loading...</h1>
        </div>
      ) : (
        <div className={styles.allcardscontainer}>
          {allPokemons.map((pokemon, index) => (
            <Link key={pokemon.id} to={`/pokedex/${pokemon.id}`}>
              <div
                className={`${styles.card} ${
                  hoveredCard === index ? styles.flipped : ""
                }`}
                key={pokemon.id}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardFront}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      className={styles.pokemon_pic}
                      src={pokemon.url}
                      alt={pokemon.name.english}
                    />
                    <h3 className="PokemonName">{pokemon.name.english}</h3>
                    {pokemon.type.map((type) => (
                      <div
                        key={type}
                        className="PokemonType"
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "nowrap",
                        }}
                      >
                        <img
                          style={{ height: "auto", maxWidth: "8rem" }}
                          src={`/types/${type}.png`}
                          alt={type}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.cardBack}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      className={styles.pokemon_pic}
                      src={pokemon.url}
                      alt={pokemon.name.english}
                    />

                    <div>
                      <h3 className="PokemonName">Stats:</h3>
                      <div className="StatPs">
                        <p>Attack:{pokemon.base.Attack}</p>
                        <p>Defense:{pokemon.base.Defense}</p>
                        <p>Health:{pokemon.base.HP}</p>
                        <p>Speed:{pokemon.base.Speed} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
