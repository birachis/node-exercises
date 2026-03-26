import { UserRole } from "./auth.interface.js";

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    resetToken?: string | null;
    resetTokenExpiresAt?: number | null;
}