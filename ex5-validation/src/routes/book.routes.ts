import { Router } from "express";
import { getBooksData, getBookDataById, createBookData, updateBookData, deleteBookData } from "../controllers/book.controller.js";
import { validate  } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema.js";

const router = Router();

router.get("/:id", getBookDataById);
router.get("/", getBooksData);
router.post("/", validate(createBookSchema), createBookData);
router.put("/:id", validate(updateBookSchema), updateBookData);
router.delete("/:id", deleteBookData);

export default router;
