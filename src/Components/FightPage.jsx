import { useState } from "react";
import StartMenu from "./StartMenu";
import BattlePage from "./BattlePage";

export default function FightPage() {
  const [mode, setMode] = useState("start");

  const onStartClick = () => {
    setMode("battle");
  };

  return (
    <div>
      {mode === "start" && <StartMenu onStartClick={onStartClick} />}
      {mode === "battle" && <BattlePage />}
      {mode === "gameOver" && <div>Game Over</div>}
    </div>
  );
}
