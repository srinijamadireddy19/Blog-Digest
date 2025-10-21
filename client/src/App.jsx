import React, { useState } from "react";
import api from "./api/axiosConfig";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/process", { text: inputText });
      setResult(res.data.result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Text Processor (React + Flask)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
          style={{ padding: "10px", width: "250px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
          Send
        </button>
      </form>

      {result && (
        <h2 style={{ marginTop: "30px" }}>
          Processed Text: <span style={{ color: "green" }}>{result}</span>
        </h2>
      )}
    </div>
  );
}

export default App;
