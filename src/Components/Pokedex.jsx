import { useContext } from "react";
import { PokemonAPIContext } from "../Context/PokemonAPIContext";

export default function Pokedex() {

  const { allPokemons, loading } = useContext(PokemonAPIContext);
  return (
    <>
      {loading ? ( // Check if loading state is true
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src="Loading.gif" />
          <h1 style={{ marginTop: "2rem" }}>Loading...</h1>
        </div>
      ) : (
        <div
          className="AllCardsContainer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {allPokemons.map((pokemon) => (
            <div
              className="CardContainer"
              style={{
                margin: "1rem",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                border: "1px solid black",
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)}",
                width: "200px",
              }}
              key={pokemon.id}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                className="PokemonImg"
                src={pokemon.url}
                alt={pokemon.name.english}
              />
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
    </>
  );
}
