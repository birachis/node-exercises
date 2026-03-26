import { Router } from "express";
import { validateRequest } from "../middleware/validate.js";
import {
	createUserBodySchema,
	listUsersQuerySchema,
	updateUserBodySchema,
	userIdParamsSchema,
} from "../schemas/user.schema.js";
import {
	createUser,
	deleteUser,
	getUserById,
	listUsers,
	updateUser,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/", validateRequest({ body: createUserBodySchema }), createUser);
router.get("/", validateRequest({ query: listUsersQuerySchema }), listUsers);
router.get("/:id", validateRequest({ params: userIdParamsSchema }), getUserById);
router.put(
	"/:id",
	validateRequest({ params: userIdParamsSchema, body: updateUserBodySchema }),
	updateUser,
);
router.delete("/:id", validateRequest({ params: userIdParamsSchema }), deleteUser);

export default router;
