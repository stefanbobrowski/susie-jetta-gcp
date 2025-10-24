import express from "express";
// ⚠️ REMOVE: import path from "path";
const app = express();
const port = process.env.PORT || 8080;
// Serve frontend using pure ESM URLs
app.use(express.static(new URL("../public", import.meta.url).pathname));
app.get("/api/hello", (_, res) => {
    res.json({ message: "Hello from Susie Jetta API 🎉" });
});
app.get("*", (_, res) => {
    res.sendFile(new URL("../public/index.html", import.meta.url).pathname);
});
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
