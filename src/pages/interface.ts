import type { Role } from "../components/Sidebar";

// values for Login
export interface LoginFormValues {
  email: string | unknown;
  password: string | unknown;
}

// values for Register
export interface RegisterFormValues {
  [key: string]: string | null;
}

// User 
export interface User {
  email: string | null;
  password: string | null;
  role: Role |null;
}
