import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Pokedex from "./Components/Pokedex";
import PokemonPage from "./Components/PokemonPage";
import Leaderboard from "./Components/Leaderboard";
import FightPage from "./Components/FightPage";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Error from "./Components/Error";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:id" element={<PokemonPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/pokefight" element={<FightPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
