import styles from "../Styles/Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/home_banner.png" />
      <Link to="/pokedex">
        <button className={`${styles.btn} ${styles.blinkClass}`}>
          <img src="/Pokedex_CTA.png" />
        </button>
      </Link>
    </div>
  );
}
