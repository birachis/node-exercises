import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUserName } from "../middlewares/validate.middleware";
import {
  createUser,
  deleteUser,
  findUserById,
  listUsers,
  updateUser,
} from "../data/user.store";

const router = Router();

router.use(authMiddleware);

router.get("/", (_req, res) => {
  res.json(listUsers());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

router.post("/", validateUserName, (req, res) => {
  const { name } = req.body as { name: string };
  const user = createUser(name.trim());

  return res.status(201).json(user);
});

router.put("/:id", validateUserName, (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body as { name: string };

  const user = updateUser(id, name.trim());
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const removedUser = deleteUser(id);

  if (!removedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(204).send();
});

export default router;
