import styles from "../Styles/Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/home_banner.png" />
      <Link to="/pokedex">
        <button className={styles.btn}>
          <img src="/Pokedex_CTA.png" />
        </button>
      </Link>
    </div>
  );
}
