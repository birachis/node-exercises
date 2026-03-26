export interface User {
  id: number;
  name: string;
}

let users: User[] = [{ id: 1, name: "John" }];
let nextId = 2;

export const listUsers = () => users;

export const findUserById = (id: number) => users.find((user) => user.id === id);

export const createUser = (name: string) => {
  const newUser = { id: nextId++, name };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, name: string) => {
  const user = findUserById(id);
  if (!user) {
    return null;
  }

  user.name = name;
  return user;
};

export const deleteUser = (id: number) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }

  const [removed] = users.splice(index, 1);
  return removed;
};

export const resetUsers = () => {
  users = [{ id: 1, name: "John" }];
  nextId = 2;
};
