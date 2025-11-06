import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { Link } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout"; // make sure the path is correct

const { Option } = Select;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Registration successful!");
      console.log("Registered values:", values);
    } catch (error) {
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#002b5b]">
          Register
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item name="company_name" label="Company Name">
            <Input placeholder="Optional for individuals" />
          </Form.Item>

          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Select placeholder="Select your country">
              <Option value="Ethiopia">Ethiopia</Option>
              <Option value="China">China</Option>
              <Option value="Uganda">Uganda</Option>
            </Select>
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input placeholder="+251 9xxxxxxx" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="account_type" label="Account Type" rules={[{ required: true }]}>
            <Select placeholder="Select account type">
              <Option value="individual">Individual</Option>
              <Option value="business">Business</Option>
              <Option value="supplier">Supplier</Option>
              <Option value="logistics">Logistics</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language_preference" label="Language Preference" rules={[{ required: true }]}>
            <Select>
              <Option value="en">English</Option>
              <Option value="am">Amharic</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-[#002b5b] border-none"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#002b5b] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
