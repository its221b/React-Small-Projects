import { useState } from "react";
import "./styles.css";

const generateNumber = () => Math.floor(Math.random() * 6) + 1;

export default function App() {
  const [diceOne, setDiceOne] = useState(generateNumber());
  const [diceTwo, setDiceTwo] = useState(generateNumber());
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      setDiceOne(generateNumber());
      setDiceTwo(generateNumber());
      setIsRolling(false);
    }, 600);
  };

  const diceStyle = {
    height: 80,
    width: 80,
    backgroundColor: "#6a0dad",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
    trasformStyle: "preserve-3d",
    animation: isRolling ? "rotateDice 0.6s ease-in-out" : "none",
  };

  return (
    <div className="App">
      <h1>Rolling Dice</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          marginBottom: 20,
        }}
      >
        <div style={diceStyle}>{diceOne}</div>
        <div style={diceStyle}>{diceTwo}</div>
      </div>
      <button
        onClick={rollDice}
        style={{
          width: 120,
          height: 45,
          borderRadius: 10,
          border: "none",
          backgroundColor: isRolling ? "#444" : "green",
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          cursor: isRolling ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}
