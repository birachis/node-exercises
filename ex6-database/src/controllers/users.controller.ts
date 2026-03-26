import { NextFunction, Request, Response } from "express";
import { usersService } from "../services/users.service.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const created = await usersService.create(req.body as { name: string; email: string });
		res.status(201).json({ success: true, data: created });
	} catch (error) {
		next(error);
	}
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { page, limit, search } = req.query as unknown as {
			page: number;
			limit: number;
			search?: string;
		};

		const { total, items } = await usersService.list({
			page,
			limit,
			...(typeof search === "string" ? { search } : {}),
		});
		res.json({ success: true, data: items, meta: { page, limit, total } });
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const item = await usersService.getById(id);
		res.json({ success: true, data: item });
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const updated = await usersService.update(id, req.body as Partial<{ name: string; email: string }>);
		res.json({ success: true, data: updated });
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const deleted = await usersService.remove(id);
		res.json({ success: true, data: deleted });
	} catch (error) {
		next(error);
	}
};
