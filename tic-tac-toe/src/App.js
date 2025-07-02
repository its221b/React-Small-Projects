import { useState } from "react";
import "./styles.css";

export default function App() {
  const [gridSize, setGridSize] = useState("");
  const [board, setBoard] = useState([]);
  const [start, setStart] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const startGame = () => {
    const size = parseInt(gridSize);
    if (!size || size < 3) return alert("Required minimum 3 size of Grid");
    const newBoard = Array(size)
      .fill()
      .map(() => Array(size).fill(""));
    setBoard(newBoard);
    setStart(true);
    setWinner(null);
    setCurrentPlayer("X");
  };

  const resetGame = () => {
    setGridSize("");
    setBoard([]);
    setCurrentPlayer("X");
    setWinner(null);
    setStart(false);
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? currentPlayer : c))
    );

    setBoard(newBoard);
    const result = checkWinner(newBoard, row, col);
    if (result) setWinner(result);
    else setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (board, row, col) => {
    const size = board.length;
    const symbol = board[row][col];

    let winRow = board[row].every((cell) => cell === symbol);
    let winCol = board.every((row) => row[col] === symbol);
    let winDiag1 = row === col && board.every((r, i) => r[i] === symbol);
    let winDiag2 =
      row + col === size - 1 &&
      board.every((r, i) => r[size - 1 - i] === symbol);

    if (winRow || winCol || winDiag1 || winDiag2) return symbol;

    const isDraw = board.every((r) => r.every((cell) => cell));
    return isDraw ? "Draw" : null;
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      {!start && (
        <div>
          <input
            type="number"
            placeholder="Enter Grid Size"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
          />
          <button style={{ margin: "20px" }} onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {start && (
        <>
          <h2> Player Turn : {currentPlayer}</h2>
          {winner && (
            <h2>{winner === "Draw" ? "It's a Draw" : `Winner ${winner}`}</h2>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${board.length}, 60px)`,
              justifyContent: "center",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid black",
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
          <button onClick={resetGame} style={{ marginTop: "20px" }}>
            Reset Game
          </button>
        </>
      )}
    </div>
  );
}
