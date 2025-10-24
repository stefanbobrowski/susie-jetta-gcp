import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve frontend build
app.use(express.static(new URL("../public", import.meta.url).pathname));

// API route example
app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from Susie Jetta API 🎉" });
});

// ✅ Fallback for React Router routes
app.get(/.*/, (_, res) => {
  res.sendFile(new URL("../public/index.html", import.meta.url).pathname);
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
