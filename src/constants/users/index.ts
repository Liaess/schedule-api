export type UserCreateData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UserLoginData = {
  email: string;
  password: string;
};
