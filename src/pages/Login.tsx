import React, { useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";

const MOCK_USERS = [
  { email: "buyer@example.com", password: "password123", role: "buyer" },
  { email: "admin@example.com", password: "password123", role: "admin" },
];

interface LoginProps {
  setRole: (role: string) => void;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC<LoginProps> = ({ setRole }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      message.error("Invalid email or password");
      setLoading(false);
      return;
    }

    // Save role based on "Remember Me"
    if (values.remember) {
      localStorage.setItem("role", user.role);
    } else {
      sessionStorage.setItem("role", user.role);
    }

    setRole(user.role);
    message.success("Login successful! Redirecting...");

    // Redirect based on role
    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "buyer":
        navigate("/buyer/dashboard");
        break;
      default:
        navigate("/dashboard");
        break;
    }

    setLoading(false);
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="text-sm text-[#0F3952]">Remember Me</Checkbox>
          </Form.Item>

          <div className="flex justify-between mb-4 text-sm">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-[#0F3952] cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

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
