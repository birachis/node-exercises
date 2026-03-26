import { createBookData, getbookDataById, getBooksData, updateBookData, deleteBookData, getTotalBooksCount } from "../repositories/book.repository.js";

export const getBooks = (
    page: number = 1,
    limit: number = 10,
    name?: string,
    isInStore?: boolean,
    sortBy: string = "id",
    sortOrder:  "asc" | "desc" = "asc"
) => {
    const offset = (page - 1) * limit;
    const books = getBooksData(offset, limit, name, isInStore, sortBy, sortOrder);
    const totalBooks = getTotalBooksCount(name, isInStore);
    const totalPages = Math.ceil(totalBooks / limit);

    const response = {
        status: "success",
        message: "List of books",
        data: books,
        pagination: {
            total: totalBooks,
            page: Number(page),
            limit: Number(limit),
            totalPages: totalPages
        },
        filters: {
            name,
            isInStore
        },
        sorting: {
            sortBy,
            sortOrder
        },
        statusCode: 200,
        error: null
    };

    return response;
};

export const getBookById = (id: any) => {

  const book = getbookDataById(id);

  const response = {
        status: "success",
        message: "Book data",
        data: book,
        statusCode: 200,
        error: null
    };

  return response;
}

export const createBook = (book: any) => {

  const resp = createBookData(book );

  const response = {
        status: "success",
        message: "Book created successfully",
        data: [resp],
        statusCode: 201,
        error: null
    };

  return response;
}

export const updateBook = (id: any, book: any) => {

  const resp = updateBookData(id, book);
  if (!resp) {
    const response = {
        status: "error",
        message: "Book not found",
        data: null,
        statusCode: 404,
        error: "Book with the given ID does not exist"
    };

    return response;
  }

  const response = {
        status: "success",
        message: "Book updated successfully",
        data: resp,
        statusCode: 201,
        error: null
    };

  return response;
}

export const deleteBook = (id: any) => {

  const resp = deleteBookData(id);
  if (!resp) {
    const response = {
        status: "error",
        message: "Book not found",
        data: null,
        statusCode: 404,
        error: "Book with the given ID does not exist"
    };

    return response;
  }

  const response = {
        status: "success",
        message: "Book deleted successfully",
        data: resp,
        statusCode: 204,
        error: null
    };

  return response;
}