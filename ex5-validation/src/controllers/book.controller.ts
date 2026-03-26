import { Request, Response } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../services/book.service.js";

import { getBooksQuerySchema } from "../schemas/book.schema.js";

export const getBooksData = (req: Request, res: Response) => {
  const result = getBooksQuerySchema.safeParse(req.query);
  
  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Invalid query parameters",
      errors: result.error.format(),
      statusCode: 400
    });
  }

  const { page, limit, name, isInStore, sortBy, sortOrder } = result.data;

  const books = getBooks(page, limit, name, isInStore, sortBy, sortOrder);

  res.json(books);
};

export const getBookDataById = (req: Request, res: Response) => {
  const id = req.params.id;

  const book = getBookById(id);

  res.json(book);
}

export const createBookData = (req: Request, res: Response) => {
  const book = createBook(req.body);
  res.status(201).json(book);
};

export const updateBookData = (req: Request, res: Response) => {
  const id = req.params.id;
  const book = updateBook(id, req.body);
  res.status(200).json(book);
};

export const deleteBookData = (req: Request, res: Response) => {
  const id = req.params.id;
  const book = deleteBook(id);
  res.status(200).json(book);
};