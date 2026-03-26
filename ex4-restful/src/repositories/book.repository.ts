export interface Book {
  id: number;
  name: string;
  isInStore: boolean;
  amountInStore: number;
  createdAt: Date; 
  updatedAt: Date; 
  isDeleted: boolean; 
  deletedAt: Date | null; 
}

const books: Book[] = [
    { 
      id: 1, 
      name: "Book 1", 
      isInStore: true,
      amountInStore: 10,
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false, 
      deletedAt: null 
    },
    { 
      id: 2, 
      name: "Book 2", 
      isInStore: true,
      amountInStore: 10,
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false, 
      deletedAt: null 
    },
    { 
      id: 3, 
      name: "Book 3", 
      isInStore: true,
      amountInStore: 10,
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false, 
      deletedAt: null 
    },
    { 
      id: 4, 
      name: "Book 4", 
      isInStore: true,
      amountInStore: 10,
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false, 
      deletedAt: null 
    },
    { 
      id: 5, 
      name: "Book 5", 
      isInStore: true,
      amountInStore: 10,
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false, 
      deletedAt: null 
    },
];

export const getBooksData = (
  offset: number = 0,
  limit: number = 10,
  name?: string,
  isInStore?: boolean,
  sortBy: string = "id",
  sortOrder: "asc" | "desc" = "asc"
) => {
  let filteredBooks = books.filter((b) => !b.isDeleted);

  if (name) {
    filteredBooks = filteredBooks.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (isInStore !== undefined) {
    filteredBooks = filteredBooks.filter((b) => b.isInStore === isInStore);
  }

  filteredBooks.sort((a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filteredBooks.slice(offset, offset + limit);
};

export const getTotalBooksCount = (name?: string, isInStore?: boolean) => {
  let filteredBooks = books.filter((b) => !b.isDeleted);

  if (name) {
    filteredBooks = filteredBooks.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (isInStore !== undefined) {
    filteredBooks = filteredBooks.filter((b) => b.isInStore === isInStore);
  }

  return filteredBooks.length;
};

export const getbookDataById = (id: any ) => {

  id  = Number(id); // Convert id to number for comparison
  const oneBook = books.find((b) => b.id == id  && !b.isDeleted);
  return oneBook;
};

export const createBookData = (book: any) => {

  const getlastid = books[books.length - 1]?.id ?? 0;

  const newBook = {
    id: getlastid + 1,
    name: book.name,
    isInStore: book.isInStore,
    amountInStore: book.amountInStore,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    deletedAt: null
  };

  books.push(newBook);
  return newBook;
};

export const updateBookData = (id: any, book: any) => {
  const index = books.findIndex((b) => b.id == id && !b.isDeleted);

  if (index !== -1) {
    const existingBook = books[index];
    if (existingBook) {
      books[index] = { ...existingBook, ...book, updatedAt: new Date() };
      return books[index];
    }
  }
  return null;
};

export const deleteBookData = (id: any) => {
  const index = books.findIndex((b) => b.id == id && !b.isDeleted);

  if (index !== -1) {
    const existingBook = books[index];
    if (existingBook) {
      books[index] = { ...existingBook, isDeleted: true, deletedAt: new Date(), updatedAt: new Date() };
      return books[index];
    }
  }

  return null;
}