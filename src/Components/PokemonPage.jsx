import { useContext, useState } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/PokemonPage.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const { id } = useParams();
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [currentPokemon, setCurrentPokemon] = useState(parseInt(id, 10));
  const pokemonId = parseInt(id, 10);
  const onePokemon = allPokemons.find((el) => el.id === pokemonId);
  console.log(onePokemon);

  const prevPokemon = () => {
    setCurrentPokemon((prev) => {
      if (prev === 0) {
        return onePokemon.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const nextPokemon = () => {
    setCurrentPokemon((prev) => {
      if (prev === onePokemon.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading Pokemon...</div>
      ) : onePokemon ? (
        <>
          <div className={styles.container}>
            <div className={styles.upperPart}>
              <a
                className={styles.arrow}
                onClick={prevPokemon}
                href={`/pokedex/${currentPokemon - 1}`}
              >
                <img
                  src="/PokeArrowLeft.png"
                  alt="Previous Pokemon"
                  className={styles.arrowImage}
                />
              </a>

              <div className={styles.tagsContainer}>
                {onePokemon.type.map((type, index) => (
                  <img
                    className={styles.tags}
                    key={index}
                    style={{ height: "auto", maxWidth: "8rem" }}
                    src={`/types/${type}.png`}
                    alt={type}
                  />
                ))}
              </div>

              <div className={styles.PokemonNameContainer}>
                <h1 className={styles.Pokename}>{onePokemon.name.english}</h1>
                <img
                  src={onePokemon.url}
                  alt="Pokemon"
                  className={styles.image}
                />
              </div>
              <a
                className={styles.arrow}
                href="/"
                onClick={nextPokemon}
                href={`/pokedex/${currentPokemon + 1}`}
              >
                <img
                  src="/PokeArrowRight-1.png"
                  alt="Next Pokemon"
                  className={styles.arrowImage}
                />
              </a>
            </div>
            <div className={styles.downPart}>
              <div className={styles.barContainer}>
                <div className={styles.stats}>
                  {onePokemon.name.english}'s Stats
                </div>
                <div className={styles.textStats}>HP:</div>
                <ProgressBar
                  className={styles.bar}
                  variant="success"
                  now={onePokemon.base.HP}
                  label={onePokemon.base.HP}
                  max={150}
                  style={{ height: "40px" }}
                />
                <div className={styles.textStats}>DF:</div>
                <ProgressBar
                  variant="info"
                  now={onePokemon.base.Defense}
                  label={onePokemon.base.Defense}
                  style={{ height: "40px" }}
                  max={150}
                />
                <div className={styles.textStats}>SP:</div>
                <ProgressBar
                  variant="warning"
                  now={onePokemon.base.Speed}
                  label={onePokemon.base.Speed}
                  style={{ height: "40px" }}
                  max={150}
                />
                <div className={styles.textStats}>AT:</div>
                <ProgressBar
                  variant="danger"
                  now={onePokemon.base.Attack}
                  label={onePokemon.base.Attack}
                  style={{ height: "40px" }}
                  max={150}
                />
              </div>
              {/* This should be the white part with all the infos */}
            </div>
          </div>
        </>
      ) : (
        <div>Pokemon with ID {id} not found.</div>
      )}
    </div>
  );
}
