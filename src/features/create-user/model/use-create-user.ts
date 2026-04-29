import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api";

export const useCreateUser = () => useMutation({ mutationFn: createUser });
