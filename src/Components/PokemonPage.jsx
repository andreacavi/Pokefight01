import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonPage() {
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [singlePokemon, setSinglePokemon] = useState(null); // Change initial state to null
  const { id } = useParams();

  const fetchAPI = async () => {
    try {
      const response = await fetch(
        `https://pokenode-56qg.onrender.com/pokemon/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("transmitted data:", data.data);
      setSinglePokemon(data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching Pokemons:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [id]);

  if (loading) {
    return <div>Loading Pokemons...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img
        style={{ width: "500px", height: "auto" }}
        src={singlePokemon.url}
        alt={singlePokemon.name.english}
      />
      <h3 className="singlePokemonName">{singlePokemon.name.english}</h3>
      <div
        className="PokemonType"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        {/* Render types */}
        {singlePokemon.type.map((type, index) => (
          <img
            key={index}
            style={{ height: "auto", maxWidth: "8rem" }}
            src={`/types/${type}.png`}
            alt={type}
          />
        ))}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <div>
            <h3 className="singlePokemonName">Stats:</h3>
            {/* Check if singlePokemon.base exists before accessing its properties */}
            <p>Attack: {singlePokemon.base && singlePokemon.base.Attack}</p>
            <p>Defense: {singlePokemon.base && singlePokemon.base.Defense}</p>
            <p>Health: {singlePokemon.base && singlePokemon.base.HP}</p>
            <p>Speed: {singlePokemon.base && singlePokemon.base.Speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
