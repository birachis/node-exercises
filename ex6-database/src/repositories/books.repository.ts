import { prisma } from "../prisma.js";

export type ListBooksFilters = {
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

const paginate = (page: number, limit: number) => ({
	skip: (page - 1) * limit,
	take: limit,
});

export const booksRepository = {
	create(data: { title: string; isbn: string; price: number; stock: number; userId: number }) {
		return prisma.book.create({
			data,
			include: { user: true },
		});
	},

	async list(filters: ListBooksFilters) {
		const where = {
			...(filters.title ? { title: { contains: filters.title } } : {}),
			...(filters.userId ? { userId: filters.userId } : {}),
			...(typeof filters.inStock === "boolean"
				? { stock: filters.inStock ? { gt: 0 } : { equals: 0 } }
				: {}),
			...(typeof filters.minPrice === "number" || typeof filters.maxPrice === "number"
				? {
						price: {
							...(typeof filters.minPrice === "number" ? { gte: filters.minPrice } : {}),
							...(typeof filters.maxPrice === "number" ? { lte: filters.maxPrice } : {}),
						},
					}
				: {}),
		};

		const orderBy = {
			[filters.sortBy]: filters.sortOrder,
		};

		const [total, items] = await Promise.all([
			prisma.book.count({ where }),
			prisma.book.findMany({
				where,
				include: { user: true },
				orderBy,
				...paginate(filters.page, filters.limit),
			}),
		]);

		return { total, items };
	},

	findById(id: number) {
		return prisma.book.findUnique({
			where: { id },
			include: { user: true },
		});
	},

	update(
		id: number,
		data: Partial<{ title: string; isbn: string; price: number; stock: number; userId: number }>,
	) {
		return prisma.book.update({
			where: { id },
			data,
			include: { user: true },
		});
	},

	delete(id: number) {
		return prisma.book.delete({ where: { id } });
	},
};
