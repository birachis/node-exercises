import { Router } from "express";
import { getBooksData, getBookDataById, createBookData, updateBookData, deleteBookData } from "../controllers/book.controller.js";

const router = Router();

router.get("/:id", getBookDataById);
router.get("/", getBooksData);
router.post("/", createBookData);
router.put("/:id", updateBookData);
router.delete("/:id", deleteBookData);

export default router;
