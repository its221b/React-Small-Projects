import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setHasStarted(true);
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleRestart = () => {
    setHasStarted(false);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>StopWatch</h1>
      <div>
        <h2>{formatTime(time)}</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          margin: "20px",
        }}
      >
        {!hasStarted && (
          <button
            onClick={handleStart}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: 20,
            }}
          >
            Start
          </button>
        )}
        {hasStarted && (
          <>
            <button
              onClick={handlePauseResume}
              style={{
                padding: "10px 20px",
                backgroundColor: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={handleRestart}
              style={{
                padding: "10px 20px",
                backgroundColor: "#F44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              Restart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
