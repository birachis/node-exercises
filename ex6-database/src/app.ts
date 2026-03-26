import express from "express";
import { AppError, errorHandler } from "./middleware/errorHandler.js";
import usersRouter from "./routes/users.route.js";
import booksRouter from "./routes/books.route.js";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use((_, __, next) => {
  next(new AppError(404, "ROUTE_NOT_FOUND", "Route not found"));
});

app.use(errorHandler);

export default app;
