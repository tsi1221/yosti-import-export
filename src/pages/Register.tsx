
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";
import type { RegisterFormValues } from "./interface";
import { useRegister } from "../hooks/useRegister";

const { Option } = Select;

const Register: React.FC = () => {
  const { loading, register } = useRegister();

  const handleSubmit = (values: RegisterFormValues) => {
    register(values);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-6" style={{ color: "#0F3952" }}>
          Create Your Account
        </h2>

        <Form<RegisterFormValues> layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
            <Input size="large" placeholder="John Doe" />
          </Form.Item>

          <Form.Item name="company_name" label="Company Name (optional)">
            <Input size="large" placeholder="Optional" />
          </Form.Item>

          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select country">
              <Option value="Ethiopia">Ethiopia</Option>
              <Option value="China">China</Option>
              <Option value="Uganda">Uganda</Option>
            </Select>
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input size="large" placeholder="+251 9xxxxxxx" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input size="large" placeholder="example@email.com" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item name="account_type" label="Account Type" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose role">
              <Option value="individual">Individual</Option>
              <Option value="business">Business / Buyer</Option>
              <Option value="supplier">Supplier</Option>
              <Option value="logistics">Logistics</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language_preference" label="Language Preference" rules={[{ required: true }]}>
            <Select size="large">
              <Option value="en">English</Option>
              <Option value="am">Amharic</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{ backgroundColor: "#0F3952", borderColor: "#0F3952", borderRadius: "10px" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0F3952" }} className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
