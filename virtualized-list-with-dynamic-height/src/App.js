import React from "react";
import MyVirtualizedList from "./MyVirtualizedList";
const App = () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    text: `Item ${i + 1}: ${"Lorem ipsum dolor sit amet, ".repeat(
      Math.floor(Math.random() * 5) + 1
    )}`,
  }));

  return (
    <div style={{ height: "100vh" }}>
      <MyVirtualizedList items={items} />
    </div>
  );
};

export default App;
