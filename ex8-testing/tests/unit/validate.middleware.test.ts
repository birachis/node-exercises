import { validateUserName } from "../../src/middlewares/validate.middleware";

describe("validateUserName", () => {
  it("returns 400 when name is missing", () => {
    const req: any = { body: {} };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    validateUserName(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Name must be at least 2 characters" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when name is too short", () => {
    const req: any = { body: { name: "A" } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    validateUserName(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when name is valid", () => {
    const req: any = { body: { name: "Alice" } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    validateUserName(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
