import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import AuthLayout from "../components/BackgroundLayout";

const { Option } = Select;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    if (!values.terms) {
      message.error("You must accept the Terms & Conditions");
      return;
    }

    setLoading(true);
    console.log("Form Values:", values);
    // TODO: handle form submission to backend
    setTimeout(() => setLoading(false), 1000); // simulate loading
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#0F3952]">
          Create Your Account
        </h2>

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
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Input placeholder="Enter your country" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone / WhatsApp"
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
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <div className="grid sm:grid-cols-2 sm:gap-4">
            <Form.Item
              name="account_type"
              label="Account Type"
              rules={[{ required: true, message: "Select an account type" }]}
            >
              <Select placeholder="Choose account type" size="large">
                <Option value="buyer">Buyer</Option>
                <Option value="supplier">Supplier</Option>
                <Option value="logistics">Logistics</Option>
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
                <Option value="om">Oromiffa</Option>
                <Option value="cn">Chinese</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[{ required: true, message: "You must accept the Terms & Conditions" }]}
          >
            <Checkbox>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </Checkbox>
          </Form.Item>

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

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#0F3952] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
