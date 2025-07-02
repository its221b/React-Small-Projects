import React, { useState, useEffect, useRef } from "react";

// Max 3 progress bars running at a time
const MAX_RUNNING = 3;
const MAX_PROGRESS = 100;

// ProgressBar Component
const ProgressBar = ({ progress }) => (
  <div
    style={{
      border: "1px solid #000",
      width: "100%",
      height: 25,
      marginBottom: 10,
      position: "relative",
      backgroundColor: "#eee",
      borderRadius: 4,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${progress}%`,
        height: "100%",
        backgroundColor: progress === 100 ? "green" : "#4caf50",
        transition: "width 0.3s ease",
      }}
    />
    <span
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        height: "100%",
        textAlign: "center",
        lineHeight: "25px",
        fontWeight: "bold",
        color: "#000",
      }}
    >
      {progress}%
    </span>
  </div>
);

export default function App() {
  const [progressBars, setProgressBars] = useState([]);
  const intervalsRef = useRef({}); // Stores running intervals by bar id

  // Add new progress bar
  const addProgressBar = () => {
    const newBar = {
      id: Date.now() + Math.random(),
      progress: 0,
      status: "waiting", // "waiting", "running", or "done"
    };
    setProgressBars((prev) => [...prev, newBar]);
  };

  // Start the progress logic for a specific bar
  const startProgress = (barId) => {
    intervalsRef.current[barId] = setInterval(() => {
      setProgressBars((prevBars) =>
        prevBars.map((bar) => {
          if (bar.id === barId) {
            const newProgress = bar.progress + 10;
            if (newProgress >= MAX_PROGRESS) {
              clearInterval(intervalsRef.current[barId]);
              delete intervalsRef.current[barId];
              return { ...bar, progress: 100, status: "done" };
            }
            return { ...bar, progress: newProgress };
          }
          return bar;
        })
      );
    }, 1000);
  };

  // Watch the state and start waiting bars if slots are free
  useEffect(() => {
    const running = progressBars.filter((bar) => bar.status === "running");
    const waiting = progressBars.filter((bar) => bar.status === "waiting");

    if (running.length < MAX_RUNNING && waiting.length > 0) {
      const slots = MAX_RUNNING - running.length;
      const toStart = waiting.slice(0, slots);

      toStart.forEach((bar) => {
        startProgress(bar.id);
      });

      setProgressBars((prevBars) =>
        prevBars.map((bar) =>
          toStart.find((b) => b.id === bar.id)
            ? { ...bar, status: "running" }
            : bar
        )
      );
    }
  }, [progressBars]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Progress Bars (Max 3 Running)</h2>
      <button
        onClick={addProgressBar}
        style={{ padding: "8px 16px", fontSize: 16 }}
      >
        Add Progress Bar
      </button>

      <div style={{ marginTop: 30 }}>
        {progressBars.map((bar) => (
          <ProgressBar key={bar.id} progress={bar.progress} />
        ))}
      </div>
    </div>
  );
}
