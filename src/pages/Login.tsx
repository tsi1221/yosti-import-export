// src/pages/Login.tsx
import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";
import type { LoginFormValues } from "./interface";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../components/Sidebar";

interface LoginProps {
  setRole: (role: Role) => void;
}

const Login: React.FC<LoginProps> = ({ setRole }) => {
  const navigate = useNavigate();
  const { login, loading } = useAuth(setRole);

  const onFinish = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#0F3952]">
          Login
        </h2>

        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
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
