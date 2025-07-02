import { useState } from "react";
import "./styles.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const dropedFiles = e.dataTransfer.files;
    if (dropedFiles.length > 0) {
      setFile(dropedFiles[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div style={{ width: 400, margin: "50px auto" }}>
      <h1>Drag & Drop File Upload</h1>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging ? "2px dashed #4caf50" : "2px dashed #aaa",
          padding: 40,
          borderRadius: 8,
          textAlign: "center",
          transition: "0.3s ease",
          backgroundColor: dragging ? "#e8f5e9" : "#f9f9f9",
        }}
      >
        <p>
          {dragging ? "Drag file here" : "Drag a file here or click to upload"}
        </p>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        <label
          style={{ cursor: "pointer", color: "#2196f3" }}
          htmlFor="fileUpload"
        >
          Browse Files
        </label>
      </div>
      {file && (
        <div style={{ marginTop: 20 }}>
          <h4>Selected File:</h4>
          <p>{file.name}</p>
          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ width: "100%", marginTop: 10, border: 6 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
