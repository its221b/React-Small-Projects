import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && progress < 100) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, progress]);

  const handleStart = () => {
    if (progress >= 100) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setProgress(0);
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  return (
    <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
      <h1>Progress Bar</h1>

      <div
        style={{
          height: "25px",
          background: "#eee",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "green",
            transition: "width 0.1s ease-in-out",
          }}
        ></div>
      </div>

      <p>{progress}%</p>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleStart} disabled={isRunning || progress >= 100}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning || progress >= 100}>
          Pause
        </button>
        <button
          onClick={handleStop}
          disabled={progress === 0 || progress >= 100}
        >
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
