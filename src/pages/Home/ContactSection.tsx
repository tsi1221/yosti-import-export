import React from "react";
import { Form, Input, Button, message } from "antd";
import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import headerImg from "../../assets/image7.png";

// Custom red marker with text above
const redPinIcon = new L.DivIcon({
  html: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="
        background-color: red;
        color: white;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 4px;
        margin-bottom: 4px;
        white-space: nowrap;
      ">Shanghai Office</div>
      <div style="
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid red;
      "></div>
    </div>
  `,
  className: "",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const shanghaiOffice = { name: "Shanghai Office, China", position: [31.2304, 121.4737] };

const ContactSection: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Your message has been sent successfully!");
    form.resetFields();
  };

  return (
    <section className="w-full bg-gray-50" id="contact">
      {/* Header Image */}
      <div className="w-full h-64 md:h-96 relative">
        <img src={headerImg} alt="Contact Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] text-center px-4">
            Get in Touch with Us
          </h1>
        </div>
      </div>

      {/* Section Heading */}
      <div className="text-center mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3952]">Contact Us</h2>
        <div className="w-20 h-1 bg-[#FFD700] mx-auto rounded-full mt-2"></div>
      </div>

      {/* Contact Info + Form */}
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-10 mb-12">
        {/* Contact Info */}
        <div className="flex-1 flex flex-col space-y-8">
          <div className="flex items-start gap-4">
            <EnvironmentOutlined className="text-3xl text-[#FFD700]" />
            <div>
              <h4 className="font-semibold text-[#0F3952] text-lg">Our Office</h4>
              <p className="text-gray-700">Shanghai Office, China</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneOutlined className="text-3xl text-[#FFD700]" />
            <div>
              <h4 className="font-semibold text-[#0F3952] text-lg">Contact</h4>
              <p className="text-gray-700">Phone: +86 123 456 7890</p>
              <p className="text-gray-700">WhatsApp: +86 987 654 3210</p>
              <p className="text-gray-700">Email: contact@yosti.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ClockCircleOutlined className="text-3xl text-[#FFD700]" />
            <div>
              <h4 className="font-semibold text-[#0F3952] text-lg">Business Hours</h4>
              <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-700">Sat - Sun: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-lg ml-12 lg:ml-16">
          <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                placeholder="Your Name"
                size="large"
                className="w-full max-w-[600px] border-[#FFD700] focus:border-[#FFD700] outline-none"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Your Email"
                size="large"
                className="w-full max-w-[600px] border-[#FFD700] focus:border-[#FFD700] outline-none"
              />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Your Message"
                size="large"
                className="w-full max-w-[600px] border-[#FFD700] focus:border-[#FFD700] outline-none"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="!bg-[#0F3952] border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#0a2b46] w-full max-w-[600px] transition-all duration-300"
                size="large"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Static Leaflet Map */}
      <div className="w-full">
        <MapContainer
          center={shanghaiOffice.position}
          zoom={14}
          style={{ height: "310px", width: "100%" }}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={shanghaiOffice.position} icon={redPinIcon} />
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactSection;
