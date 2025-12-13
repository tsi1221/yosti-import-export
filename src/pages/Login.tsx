import { useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";
import type { Role } from "../components/Sidebar";

/* ================= MOCK USERS ================= */
const MOCK_USERS: { email: string; password: string; role: Role }[] = [
  { email: "buyer@example.com", password: "password123", role: "buyer" },
  { email: "admin@example.com", password: "password123", role: "admin" },
];

/* ================= PROPS ================= */
interface LoginProps {
  setRole: (role: Role | null) => void;
  setEmail: (email: string | null) => void; // added
}

/* ================= FORM VALUES ================= */
interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

/* ================= COMPONENT ================= */
const Login: React.FC<LoginProps> = ({ setRole, setEmail }) => {
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

    // Save role and email
    if (values.remember) {
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);
    } else {
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("email", user.email);
    }

    setRole(user.role);
    setEmail(user.email); // set email in state

    message.success("Login successful!");

    // Redirect
    navigate(`/${user.role}/dashboard`, { replace: true });

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
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
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
              className="!bg-[#0F3952]"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-4">
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
