import { NavLink } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
      <NavLink to="/pokedex">
        <img src="/pokedex_nav.png" />
      </NavLink>
      <NavLink to="/pokefight">
        <img src="/Pokefight_nav.png" />
      </NavLink>
      <NavLink to="/">
        <img src="/logo.png" />
      </NavLink>
      <NavLink to="/leaderboard">
        <img src="/leaderboard_nav.png" />
      </NavLink>
      <NavLink to="/aboutUs">
        <img src="/about_us_nav.png" />
      </NavLink>
    </div>
  );
}
