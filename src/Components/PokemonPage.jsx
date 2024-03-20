import { useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";

export default function PokemonPage() {
  const { allPokemons, loading } = useContext(PokemonAPIContext);

  return <div>hello im PokemonPage</div>;
}
