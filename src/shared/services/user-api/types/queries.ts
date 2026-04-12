export type LoginQuery = {
  username: string;
  password: string;
};

export type SignupQuery = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
