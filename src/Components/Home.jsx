import styles from "../Styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/home_banner.png" />
      <button to="/pokedex" className={styles.btn}>
        <img src="/Pokedex_CTA.png" />
      </button>
    </div>
  );
}
