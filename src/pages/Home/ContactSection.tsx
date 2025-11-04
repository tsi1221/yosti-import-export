import React from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";

const ContactSection: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Your message has been sent successfully!");
    form.resetFields();
  };

  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
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
                <Input.TextArea rows={6} placeholder="Your Message" size="large" />
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

          {/* Side Info Box */}
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center space-y-6">
            <div className="flex items-start space-x-4">
              <EnvironmentOutlined className="text-2xl text-[#f5b400]" />
              <div>
                <h4 className="font-semibold text-black">Our Offices</h4>
                <p className="text-gray-700">Yiwu Office, China</p>
                <p className="text-gray-700">Shanghai Office, China</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <PhoneOutlined className="text-2xl text-[#f5b400]" />
              <div>
                <h4 className="font-semibold text-black">Contact</h4>
                <p className="text-gray-700">Phone: +86 123 456 7890</p>
                <p className="text-gray-700">WhatsApp: +86 987 654 3210</p>
                <p className="text-gray-700">Email: contact@yosti.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ClockCircleOutlined className="text-2xl text-[#f5b400]" />
              <div>
                <h4 className="font-semibold text-black">Business Hours</h4>
                <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Sat - Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
