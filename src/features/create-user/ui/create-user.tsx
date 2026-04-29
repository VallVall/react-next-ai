import { Button } from "@/shared/ui/button";
import { useCreateUser } from "../model";
import type { CreateUserFeatureProps } from "./types";

export function CreateUser(props: CreateUserFeatureProps) {
  const { data, onSuccess, onError } = props;
  const createUser = useCreateUser();

  const handleCreateUser = () => {
    createUser.mutate(data, { onSuccess, onError });
  };

  return <Button onClick={handleCreateUser}>Create User</Button>;
}
