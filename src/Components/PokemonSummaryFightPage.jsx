import styles from "../Styles/PokemonSummaryFightPage.module.css";

function PokemonSummaryFightPage({ pokemon_player_main }) {
  const leftPokemon = "#821200";
  const rightPokemon = "#1953cb";
  return (
    <div
      className={styles.pokemon_player_main}
      style={{
        backgroundColor: pokemon_player_main ? leftPokemon : rightPokemon,
      }}
    >
      <h1>Name Pokemon</h1>
    </div>
  );
}

export default PokemonSummaryFightPage;
