import { httpClient } from "@/shared/api";
import type { CreateUserData } from "./types";

export const createUser = (data: CreateUserData) => httpClient.post("/users", data);
