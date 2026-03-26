import { AppError } from "../middleware/errorHandler.js";
import { booksRepository, type ListBooksFilters } from "../repositories/books.repository.js";

const hasCode = (error: unknown, code: string) =>
  typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === code;

const mapPrismaError = (error: unknown): AppError => {
  if (hasCode(error, "P2025")) {
    return new AppError(404, "BOOK_NOT_FOUND", "Book not found");
  }
  if (hasCode(error, "P2002")) {
    return new AppError(409, "CONFLICT", "Unique constraint violation");
  }
  if (hasCode(error, "P2003")) {
    return new AppError(400, "FOREIGN_KEY_VIOLATION", "Invalid relation reference");
  }
  return new AppError(500, "INTERNAL_SERVER_ERROR", "Internal server error");
};

export const booksService = {
  create(data: { title: string; isbn: string; price: number; stock: number; userId: number }) {
    return booksRepository.create(data);
  },

  list(filters: ListBooksFilters) {
    return booksRepository.list(filters);
  },

  async getById(id: number) {
    const book = await booksRepository.findById(id);
    if (!book) {
      throw new AppError(404, "BOOK_NOT_FOUND", "Book not found");
    }

    return book;
  },

  async update(
    id: number,
    data: Partial<{ title: string; isbn: string; price: number; stock: number; userId: number }>,
  ) {
    try {
      return await booksRepository.update(id, data);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  async remove(id: number) {
    try {
      await booksRepository.delete(id);
      return { id, deleted: true };
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};