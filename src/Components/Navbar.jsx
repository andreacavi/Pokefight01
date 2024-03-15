import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink to="/pokedex">Pokedex</NavLink>
      <NavLink to="/pokefight">Pokefight</NavLink>
      <NavLink to="/">
        <img src="/logo.png" />
      </NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
      <NavLink to="/aboutUs">About Us</NavLink>
    </div>
  );
}
