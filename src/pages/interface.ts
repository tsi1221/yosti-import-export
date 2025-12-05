// values for Login
export interface LoginFormValues {
  email: string | unknown;
  password: string | unknown;
}

// values for Register
export interface RegisterFormValues {
  [key: string]: string | unknown;
}

// User 
export interface User {
  email: string | unknown;
  password: string | unknown;
  role: string | unknown;
}
