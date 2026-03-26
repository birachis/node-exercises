import { Request, Response } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../services/user.service.js";

export const getBooksData = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const books = getBooks(page, limit);

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