import { AppError } from "../middleware/errorHandler.js";
import { usersRepository, type ListUsersFilters } from "../repositories/users.repository.js";

const hasCode = (error: unknown, code: string) =>
  typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === code;

const mapPrismaError = (error: unknown): AppError => {
  if (hasCode(error, "P2025")) {
    return new AppError(404, "USER_NOT_FOUND", "User not found");
  }
  if (hasCode(error, "P2002")) {
    return new AppError(409, "CONFLICT", "Unique constraint violation");
  }
  return new AppError(500, "INTERNAL_SERVER_ERROR", "Internal server error");
};

export const usersService = {
  create(data: { name: string; email: string }) {
    return usersRepository.create(data);
  },

  list(filters: ListUsersFilters) {
    return usersRepository.list(filters);
  },

  async getById(id: number) {
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    return user;
  },

  async update(id: number, data: Partial<{ name: string; email: string }>) {
    try {
      return await usersRepository.update(id, data);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  async remove(id: number) {
    try {
      await usersRepository.delete(id);
      return { id, deleted: true };
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};