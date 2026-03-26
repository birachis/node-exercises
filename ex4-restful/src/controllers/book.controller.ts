import { Request, Response } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../services/book.service.js";


export const getBooksData = (req: Request, res: Response) => {
  const { page, limit, name, isInStore, sortBy, sortOrder } = req.query;

  const pageNum = page !== undefined ? Number(page) : undefined;
  const limitNum = limit !== undefined ? Number(limit) : undefined;

  const nameStr = typeof name === "string" ? name : undefined;
  const isInStoreStr = typeof isInStore === "string" ? isInStore : undefined;
  const sortByStr = typeof sortBy === "string" ? sortBy : undefined;
  const sortOrderStr = typeof sortOrder === "string" && (sortOrder === "asc" || sortOrder === "desc") ? sortOrder as "asc" | "desc" : undefined;

  const isInStoreBool = isInStoreStr === undefined ? undefined : isInStoreStr === "true";

  const books = getBooks(pageNum, limitNum, nameStr, isInStoreBool, sortByStr, sortOrderStr);

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