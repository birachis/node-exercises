import { NextFunction, Request, Response } from "express";
import { booksService } from "../services/books.service.js";

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const created = await booksService.create(
			req.body as { title: string; isbn: string; price: number; stock: number; userId: number },
		);
		res.status(201).json({ success: true, data: created });
	} catch (error) {
		next(error);
	}
};

export const listBooks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { page, limit, title, userId, minPrice, maxPrice, inStock, sortBy, sortOrder } =
			req.query as unknown as {
				page: number;
				limit: number;
				title?: string;
				userId?: number;
				minPrice?: number;
				maxPrice?: number;
				inStock?: boolean;
				sortBy: "createdAt" | "price" | "title";
				sortOrder: "asc" | "desc";
			};

		const { total, items } = await booksService.list({
			page,
			limit,
			sortBy,
			sortOrder,
			...(typeof title === "string" ? { title } : {}),
			...(typeof userId === "number" ? { userId } : {}),
			...(typeof minPrice === "number" ? { minPrice } : {}),
			...(typeof maxPrice === "number" ? { maxPrice } : {}),
			...(typeof inStock === "boolean" ? { inStock } : {}),
		});

		res.json({ success: true, data: items, meta: { page, limit, total } });
	} catch (error) {
		next(error);
	}
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const item = await booksService.getById(id);
		res.json({ success: true, data: item });
	} catch (error) {
		next(error);
	}
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const updated = await booksService.update(
			id,
			req.body as Partial<{ title: string; isbn: string; price: number; stock: number; userId: number }>,
		);
		res.json({ success: true, data: updated });
	} catch (error) {
		next(error);
	}
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params as unknown as { id: number };
		const deleted = await booksService.remove(id);
		res.json({ success: true, data: deleted });
	} catch (error) {
		next(error);
	}
};
