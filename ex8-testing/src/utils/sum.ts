export const sum = (a: number, b: number) => a + b;

export const sub = (a: number, b: number) => a - b;

export const mult = (a: number, b: number) => a * b;

export const div = (a: number, b: number) => {
  if (b === 0) {
    const er = new Error("Division by zero is not allowed");
    return er;
  }
  return a / b;
};