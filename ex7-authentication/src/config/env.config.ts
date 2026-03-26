import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "defaultrefreshsecret",
};
