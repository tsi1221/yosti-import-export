import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SearchOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  RightOutlined,
} from "@ant-design/icons";

const servicesData = [
  {
    icon: <ShoppingCartOutlined />,
    title: "Product Sourcing",
    desc: "Find the best products from verified suppliers with competitive pricing and quality.",
    link: "/services/product-sourcing",
  },
  {
    icon: <CheckCircleOutlined />,
    title: "Supplier Verification",
    desc: "Ensure your suppliers meet compliance and quality standards before engaging.",
    link: "/services/supplier-verification",
  },
  {
    icon: <TruckOutlined />,
    title: "Shipping & Logistics",
    desc: "Seamless coordination for sea, air, and express shipping across borders.",
    link: "/services/shipping-logistics",
  },
  {
    icon: <SearchOutlined />,
    title: "Quality Inspection",
    desc: "Pre-shipment inspections and sample checks to guarantee product quality.",
    link: "/services/quality-inspection",
  },
  {
    icon: <CarOutlined />,
    title: "Business Trips & Visa Support",
    desc: "Assistance with business trips, visa invitations, and local travel arrangements.",
    link: "/services/business-trips",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "After-Sales Assistance",
    desc: "Support for refunds, replacements, or resolving post-shipment issues.",
    link: "/services/after-sales",
  },
];

const ServicesSection: React.FC = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(servicesData.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      { threshold: 0.3 } // trigger when 30% of card is visible
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      cardRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 w-full" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F3952] mb-3">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-[#0F3952] mx-auto rounded-full mb-12 shadow-lg"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el!)}
              className={`relative bg-white rounded-2xl p-8 flex flex-col items-center
                shadow-md transition-transform transition-opacity duration-700
                ${visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                hover:-translate-y-2 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="mb-5 flex justify-center items-center w-16 h-16 rounded-full bg-[#0F3952] text-white text-3xl shadow-lg transition-all duration-300">
                {React.cloneElement(service.icon, {
                  style: { color: "#FFD700", fontSize: "2rem" },
                })}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F3952] mb-3">
                {service.title}
              </h3>
              <p className="text-[#0F3952] text-base mb-5 flex-grow">{service.desc}</p>
              <a
                href={service.link}
                className="text-[#0F3952] font-semibold text-base inline-flex items-center justify-center"
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
