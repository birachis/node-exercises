import { Router } from "express";
import { validateRequest } from "../middleware/validate.js";
import {
	bookIdParamsSchema,
	createBookBodySchema,
	listBooksQuerySchema,
	updateBookBodySchema,
} from "../schemas/book.schema.js";
import {
	createBook,
	deleteBook,
	getBookById,
	listBooks,
	updateBook,
} from "../controllers/books.controller.js";

const router = Router();

router.post("/", validateRequest({ body: createBookBodySchema }), createBook);
router.get("/", validateRequest({ query: listBooksQuerySchema }), listBooks);
router.get("/:id", validateRequest({ params: bookIdParamsSchema }), getBookById);
router.put(
	"/:id",
	validateRequest({ params: bookIdParamsSchema, body: updateBookBodySchema }),
	updateBook,
);
router.delete("/:id", validateRequest({ params: bookIdParamsSchema }), deleteBook);

export default router;
