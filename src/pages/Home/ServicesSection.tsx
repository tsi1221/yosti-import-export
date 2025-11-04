import React from "react";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SearchOutlined,
  CarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <ShoppingCartOutlined className="text-4xl text-[#f5b400]" />,
      title: "Product Sourcing",
      desc: "Find the best products from verified suppliers with competitive pricing and quality.",
      link: "/services/product-sourcing",
    },
    {
      icon: <CheckCircleOutlined className="text-4xl text-[#f5b400]" />,
      title: "Supplier Verification",
      desc: "Ensure your suppliers meet compliance and quality standards before engaging.",
      link: "/services/supplier-verification",
    },
    {
      icon: <TruckOutlined className="text-4xl text-[#f5b400]" />,
      title: "Shipping & Logistics",
      desc: "Seamless coordination for sea, air, and express shipping across borders.",
      link: "/services/shipping-logistics",
    },
    {
      icon: <SearchOutlined className="text-4xl text-[#f5b400]" />,
      title: "Quality Inspection",
      desc: "Pre-shipment inspections and sample checks to guarantee product quality.",
      link: "/services/quality-inspection",
    },
    {
      icon: <CarOutlined className="text-4xl text-[#f5b400]" />,
      title: "Business Trips & Visa Support",
      desc: "Assistance with business trips, visa invitations, and local travel arrangements.",
      link: "/services/business-trips",
    },
    {
      icon: <CustomerServiceOutlined className="text-4xl text-[#f5b400]" />,
      title: "After-Sales Assistance",
      desc: "Support for refunds, replacements, or resolving post-shipment issues.",
      link: "/services/after-sales",
    },
  ];

  return (
    <section className="py-12 bg-white" id="services">
      <div className="container mx-auto px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-10">
          Our Services
        </h2>

        <div className="grid grid-cols-1 mlsm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col h-full hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-medium text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-4 flex-grow">{service.desc}</p>
              <a
                href={service.link}
                className="text-[#0021f59e] font-medium hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
