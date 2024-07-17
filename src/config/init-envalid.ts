import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  CLIENT_ID: str(),
  TOKEN: str(),
  DATABASE_URL: str(),
});
