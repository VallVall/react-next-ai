type CreateUserProps = object;

export type CreateUserFeatureProps = {
  data: CreateUserProps;
  onSuccess: () => void;
  onError: () => void;
};
