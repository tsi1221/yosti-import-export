// src/pages/Register.tsx
import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";

const { Option } = Select;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log("Form Values:", values);
    // Here you can handle the form locally or pass it to a parent component
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6" style={{ color: "#0F3952" }}>
          Create Your Account
        </h2>

        {/* Form */}
        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[{ required: true, message: "Full name is required" }]}
          >
            <Input placeholder="John Doe" size="large" />
          </Form.Item>

          <Form.Item name="company_name" label="Company Name (optional)">
            <Input placeholder="Optional if you're an individual" size="large" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select a country" }]}
          >
            <Select placeholder="Choose your country" size="large">
              <Option value="Ethiopia">Ethiopia</Option>
              <Option value="China">China</Option>
              <Option value="Uganda">Uganda</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input placeholder="+251 9xxxxxxx" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="example@email.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }, { min: 6 }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="account_type"
            label="Account Type"
            rules={[{ required: true, message: "Select an account type" }]}
          >
            <Select placeholder="Choose user role" size="large">
              <Option value="individual">Individual</Option>
              <Option value="business">Business / Buyer</Option>
              <Option value="supplier">Supplier</Option>
              <Option value="logistics">Logistics</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="language_preference"
            label="Language Preference"
            rules={[{ required: true, message: "Choose a language" }]}
          >
            <Select size="large">
              <Option value="en">English</Option>
              <Option value="am">Amharic</Option>
            </Select>
          </Form.Item>

          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              style={{
                backgroundColor: "#0F3952",
                borderColor: "#0F3952",
                borderRadius: "10px",
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
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
