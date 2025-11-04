import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  const columns = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Sourcing", href: "/services/product-sourcing" },
        { label: "Logistics", href: "/services/shipping-logistics" },
        { label: "Inspection", href: "/services/quality-inspection" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "FAQs", href: "/faqs" },
        { label: "Export Lists", href: "/exports" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-[#002b5b] text-white w-full">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Tagline on the left */}
          <div className="lg:w-1/4">
           
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <FacebookOutlined className="text-xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <TwitterOutlined className="text-xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <LinkedinOutlined className="text-xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                <InstagramOutlined className="text-xl" />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-3/4">
            {columns.map((col, idx) => (
              <div key={idx}>
                <h4 className="text-lg mb-4 font-normal">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="hover:text-gray-300 transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Separator */}
        <hr className="border-gray-400 my-6" />

        {/* Bottom Note */}
        <p className="text-center text-gray-300 text-sm font-normal">
          © 2025 Yosti Import & Export | Bridging Gap with Trust
        </p>
      </div>
    </footer>
  );
};

export default Footer;
