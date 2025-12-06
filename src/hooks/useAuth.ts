
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import type { LoginFormValues, User } from "../pages/interface";
import type { Role } from "../components/Sidebar";

const MOCK_USERS: User[] = [
  { email: "buyer@example.com", password: "password123", role: "buyer" },
  { email: "supplier@example.com", password: "password123", role: "supplier" },
  { email: "admin@example.com", password: "password123", role: "admin" },
  { email: "superadmin@example.com", password: "password123", role: "super-admin" },
  { email: "logistics@example.com", password: "password123", role: "logistics" },
  { email: "student@example.com", password: "password123", role: "student" },
];

export const useAuth = (setRole: (role: Role) => void) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 900));

      const user = MOCK_USERS.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (!user) {
        message.error("Invalid email or password");
        return;
      }

      localStorage.setItem("token", "mock-token");
      if (user.role) {
        
        localStorage.setItem("role", user.role);
        setRole(user.role);
      }

      message.success(`Welcome, ${user.role}!`);

      const roleRoutes: Record<string, string> = {
        admin: "/admin/dashboard",
        student: "/student/dashboard",
        "super-admin": "/superadmin/dashboard",
        supplier: "/supplier/dashboard",
        buyer: "/buyer/dashboard",
        logistics: "/logistics/dashboard",
      };

      navigate(roleRoutes[user.role??'/dashboard'] || "/dashboard");
    } catch {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
