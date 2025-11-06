import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/BackgroundLayout"; // import the new layout

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", values);
      localStorage.setItem("token", res.data.token); // store JWT
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#002b5b]">
          Login
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-[#002b5b] border-none"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-black mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#002b5b] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
