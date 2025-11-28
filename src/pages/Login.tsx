// src/pages/Login.tsx
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";

// Complete mock users list
const MOCK_USERS = [
  { email: "buyer@example.com", password: "password123", role: "buyer" },
  { email: "supplier@example.com", password: "password123", role: "supplier" },
  { email: "admin@example.com", password: "password123", role: "admin" },
  { email: "superadmin@example.com", password: "password123", role: "super-admin" },
  { email: "logistics@example.com", password: "password123", role: "logistics" },
  { email: "student@example.com", password: "password123", role: "student" },
];

interface LoginProps {
  setRole: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ setRole }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const user = MOCK_USERS.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (!user) {
        message.error("Invalid email or password");
        return;
      }

      // Save token and role
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("role", user.role);
      setRole(user.role);

      message.success(`Welcome, ${user.role}!`);

      // Role-based navigation
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "super-admin":
          navigate("/superadmin/dashboard");
          break;
        case "supplier":
          navigate("/supplier/dashboard");
          break;
        case "buyer":
          navigate("/buyer/dashboard");
          break;
        case "logistics":
          navigate("/logistics/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#0F3952]">
          Login
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
          >
            <Input className="focus:border-[#FFD700] focus:ring-[#FFD700]" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password className="focus:border-[#FFD700] focus:ring-[#FFD700]" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="!bg-[#0F3952] border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#0b2c3e] transition-all duration-300"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-black mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#0F3952] font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
