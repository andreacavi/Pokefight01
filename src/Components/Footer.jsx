import styles from "../Styles/Footer.module.css";

export default function Footer() {
  return (

    <div className={styles.container}>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c4696e",
        height: "100%",
      }}
    >

      PokeFight | Group 01 | Marco, Andrea, Moritz | WBS Cooding School 2023
    </div>
  );
}
