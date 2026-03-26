import { prisma } from "../prisma.js";

export type ListUsersFilters = {
	page: number;
	limit: number;
	search?: string;
};

const paginate = (page: number, limit: number) => ({
	skip: (page - 1) * limit,
	take: limit,
});

export const usersRepository = {
	create(data: { name: string; email: string }) {
		return prisma.user.create({ data });
	},

	async list(filters: ListUsersFilters) {
		const where = filters.search
			? {
					OR: [
						{ name: { contains: filters.search } },
						{ email: { contains: filters.search } },
					],
				}
			: {};

		const [total, items] = await Promise.all([
			prisma.user.count({ where }),
			prisma.user.findMany({
				where,
				...paginate(filters.page, filters.limit),
				orderBy: { createdAt: "desc" },
			}),
		]);

		return { total, items };
	},

	findById(id: number) {
		return prisma.user.findUnique({
			where: { id },
			include: { books: true },
		});
	},

	update(id: number, data: Partial<{ name: string; email: string }>) {
		return prisma.user.update({
			where: { id },
			data,
		});
	},

	delete(id: number) {
		return prisma.user.delete({ where: { id } });
	},
};
