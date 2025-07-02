import React, { useEffect, useState } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (direction === "up") {
          if (prevCount >= 10) {
            setDirection("down");
            return prevCount - 1;
          } else {
            return prevCount + 1;
          }
        } else {
          if (prevCount <= 0) {
            setDirection("up");
            return prevCount + 1;
          } else {
            return prevCount - 1;
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "40px" }}>
      <p>Timer: {count}</p>
      <p>Direction: {direction}</p>
    </div>
  );
};

export default Timer;
