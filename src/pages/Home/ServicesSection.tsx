import React from "react";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SearchOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  RightOutlined,
} from "@ant-design/icons";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <ShoppingCartOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "Product Sourcing",
      desc: "Find the best products from verified suppliers with competitive pricing and quality.",
      link: "/services/product-sourcing",
    },
    {
      icon: <CheckCircleOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "Supplier Verification",
      desc: "Ensure your suppliers meet compliance and quality standards before engaging.",
      link: "/services/supplier-verification",
    },
    {
      icon: <TruckOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "Shipping & Logistics",
      desc: "Seamless coordination for sea, air, and express shipping across borders.",
      link: "/services/shipping-logistics",
    },
    {
      icon: <SearchOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "Quality Inspection",
      desc: "Pre-shipment inspections and sample checks to guarantee product quality.",
      link: "/services/quality-inspection",
    },
    {
      icon: <CarOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "Business Trips & Visa Support",
      desc: "Assistance with business trips, visa invitations, and local travel arrangements.",
      link: "/services/business-trips",
    },
    {
      icon: <CustomerServiceOutlined style={{ color: "#1E90FF" }} className="text-4xl" />,
      title: "After-Sales Assistance",
      desc: "Support for refunds, replacements, or resolving post-shipment issues.",
      link: "/services/after-sales",
    },
  ];

  return (
    <section className="py-14 bg-gray-100 w-full" id="services">
      <div className="w-full px-3 sm:px-6 md:px-10 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-3 ">
          Our Services
        </h2>
            <div className="w-20 h-0.5 bg-[#0021f5b4] mx-auto rounded-full mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 w-full flex flex-col text-center hover:shadow-2xl transition-transform transform hover:scale-[0.999]"
            >
              <div className="mb-5 flex justify-center">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-medium text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 text-base mb-5 flex-grow">
                {service.desc}
              </p>
              <a
                href={service.link}
                className="text-[#0021f59e] font-medium hover:underline text-base inline-flex items-center justify-center"
              >
                Learn More <RightOutlined className="ml-2 text-xs" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
