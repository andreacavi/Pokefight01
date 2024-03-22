import React, { useContext, useState } from "react";
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
        return allPokemons.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const nextPokemon = () => {
    setCurrentPokemon((prev) => {
      if (prev === allPokemons.length - 1) {
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
              <a className={styles.arrow} href="/" onClick={prevPokemon}>
                <img src="/ArrowLeft.png" alt="Previous Pokemon" />
              </a>
              <div className={styles.PokemonNameContainer}>
                <h1 className={styles.PokemonName}>
                  {onePokemon.name.english}
                </h1>
                <img
                  src={onePokemon.url}
                  alt="Pokemon"
                  className={styles.image}
                />
              </div>
              <a className={styles.arrow} href="/" onClick={nextPokemon}>
                <img src="/arrowRight.png" alt="Next Pokemon" />
              </a>
            </div>
            <div className={styles.downPart}>
              <div>
                <ProgressBar variant="success" now={20} label={20} max={120} />
                <ProgressBar variant="info" now={20} label={20} />
                <ProgressBar variant="warning" now={20} label={20} />
                <ProgressBar variant="danger" now={20} label={20} />
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
