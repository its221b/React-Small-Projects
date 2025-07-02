import { useEffect, useState } from "react";
import "./styles.css";

const GRID_SIZE = 4;

export default function App() {
  const totalCells = GRID_SIZE * GRID_SIZE;
  const [activeCells, setActiveCells] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  useEffect(() => {
    if (activeCells.length === totalCells) {
      setIsDeactivating(true);
      let i = totalCells;
      const interval = setInterval(() => {
        setActiveCells((prev) => {
          const updated = [...prev];
          updated.pop();
          return updated;
        });
        if (i === 0) {
          clearInterval(interval);
          setIsDeactivating(false);
        }
        i--;
      }, 300);
    }
  }, [activeCells, totalCells]);

  const handleClick = (index) => {
    if (!isDeactivating && activeCells.includes(index)) return;
    setActiveCells((prev) => [...prev, index]);
  };

  return (
    <div className="App">
      <h1>Grid LighBox</h1>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 60px)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => (
          <div
            key={index}
            className={`cell ${activeCells.includes(index) && "active"}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
