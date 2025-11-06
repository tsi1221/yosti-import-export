import React from "react";
import { Form, Input, Button, message } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const ContactSection: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Your message has been sent successfully!");
    form.resetFields();
  };

  return (
    <section className="py-10 bg-gray-50" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black text-center mb-2">
          Contact Us
        </h2>
        <div className="w-16 sm:w-20 h-0.5 bg-[#0021f5b4] mx-auto rounded-full mb-8"></div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Info Section */}
          <div className="flex-1 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            {/* Offices */}
            <div className="flex items-start space-x-4">
              <EnvironmentOutlined
                className="text-2xl sm:text-3xl"
                style={{ color: "blue" }}
              />
              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg">
                  Our Offices
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  Yiwu Office, China
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Shanghai Office, China
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start space-x-4">
              <PhoneOutlined
                className="text-2xl sm:text-3xl"
                style={{ color: "blue" }}
              />
              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg">
                  Contact
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  Phone: +86 123 456 7890
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  WhatsApp: +86 987 654 3210
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Email: contact@yosti.com
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-4">
              <ClockCircleOutlined
                className="text-2xl sm:text-3xl"
                style={{ color: "blue" }}
              />
              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg">
                  Business Hours
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Sat - Sun: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-2xl shadow-lg order-1 lg:order-2">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark="optional"
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <Input.TextArea rows={5} placeholder="Your Message" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#f5b400] border-none text-black hover:bg-[#e5a600] transition-all duration-300 w-full md:w-auto"
                  size="large"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
