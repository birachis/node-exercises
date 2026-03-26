import express from "express";
import bookRoutes from "./routes/book.routes.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use("/book", bookRoutes);

// Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
