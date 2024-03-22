import { useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import styles from "../Styles/PokemonPage.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PokemonPage() {
  const { allPokemons } = useContext(PokemonAPIContext);

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
    <div className={styles.container}>
      <div className={styles.upperPart}>
        <a className={styles.arrow} href="/" onClick={prevPokemon}>
          <img src="/ArrowLeft.png" alt="Previous Pokemon" />
        </a>
        <div className={styles.PokemonNameContainer}>
          <h1 className={styles.Pokename}>Bulbasaur</h1>
          <img src="/Pika.png" alt="Pokemon" className={styles.image} />
        </div>
        <a className={styles.arrow} href="/" onClick={nextPokemon}>
          <img src="/arrowRight.png" alt="Next Pokemon" />
        </a>
      </div>
      <div className={styles.downPart}>
        <div>
          <ProgressBar variant="success" now={80} label="40%" max={120} />
          <ProgressBar variant="info" now={20} label="20%" />
          <ProgressBar variant="warning" now={60} label="60%" />
          <ProgressBar variant="danger" now={80} label="80%" />
        </div>
        {/* This should be the white part with all the infos */}
      </div>
    </div>
  );
}
