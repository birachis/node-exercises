import { Router } from "express";
import { getBooksData, getBookDataById, createBookData, updateBookData, deleteBookData } from "../controllers/book.controller.js";
import { validate  } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id", authMiddleware, getBookDataById);
router.get("/", authMiddleware, getBooksData);
router.post("/", authMiddleware, authorizeRoles("ADMIN"), validate(createBookSchema), createBookData);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), validate(updateBookSchema), updateBookData);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteBookData);

export default router;
