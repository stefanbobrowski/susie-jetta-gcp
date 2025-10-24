import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => r.json())
      .then((d) => setMessage(d.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <main className="app">
      <h1>Susie Jetta ✨</h1>
      <p>{message}</p>
    </main>
  );
}
