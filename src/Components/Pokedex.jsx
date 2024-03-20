import { useEffect, useState } from "react";

export default function Pokedex() {
  const [allPokemons, setAllPokemons] = useState([
    { id: "", name: { english: "" }, type: [], url: "" },
  ]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  const fetchAPI = () => {
    try {
      fetch("https://pokenode-56qg.onrender.com/pokemon")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAllPokemons(data.data);
          setLoading(false); // Set loading to false when data fetching is complete
        });
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false); // In case of error, set loading to false
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

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
