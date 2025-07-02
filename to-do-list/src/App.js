import { useState } from "react";
import "./styles.css";

export default function App() {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    const trimmedItem = item.trim();
    if (trimmedItem === "") return;

    const newTodo = {
      id: Date.now(),
      title: trimmedItem,
    };

    setTodos((prev) => [...prev, newTodo]);
    setItem("");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleEditTodo = (id, currentTitle) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const handleSaveEdit = (id) => {
    if (editingText.trim() === "") return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: editingText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div
      className="App"
      style={{
        padding: 20,
        maxWidth: 600,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#4a4a4a" }}>📝 To Do List</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <input
          placeholder="Add item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          style={{
            flex: 1,
            padding: "10px 15px",
            fontSize: 16,
            border: "1px solid #ccc",
            borderRadius: 8,
            outline: "none",
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No items added yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                background: "#f8f8f8",
                padding: "10px 15px",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {editingId === todo.id ? (
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: "6px 10px",
                    marginRight: 10,
                    border: "1px solid #ccc",
                    borderRadius: 6,
                  }}
                />
              ) : (
                <span style={{ fontSize: 18 }}>{todo.title}</span>
              )}

              <div style={{ display: "flex", gap: "8px" }}>
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(todo.id)}
                      style={buttonStyle("#3498db")}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={buttonStyle("#95a5a6")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTodo(todo.id, todo.title)}
                      style={buttonStyle("#f39c12")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={buttonStyle("#e74c3c")}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  fontSize: 14,
  cursor: "pointer",
});
