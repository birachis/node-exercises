import { Request } from "express";

export type UserRole = "USER" | "ADMIN";

export interface AuthTokenPayload {
	id: number;
	email: string;
	role: UserRole;
	iat?: number;
	exp?: number;
}

export interface AuthenticatedRequest extends Request {
	user?: AuthTokenPayload;
}
