import { useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const { id } = useParams();

  const pokemonId = parseInt(id, 10);
  const onePokemon = allPokemons.find((el) => el.id === pokemonId);
  console.log(onePokemon);
  return (
    <div>
      {loading ? (
        <div>Loading Pokemon...</div>
      ) : onePokemon ? (
        <>
          <h1>{onePokemon.name.english}</h1>
          <img src={onePokemon.url} alt={onePokemon.name.english} />
        </>
      ) : (
        <div>Pokemon with ID {id} not found.</div>
      )}
    </div>
  );
}
