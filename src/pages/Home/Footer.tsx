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
      title: "Logo",
      links: [
        { label: "Yosti Import & Export", href: "#" },
        { label: "yosti2@gmail.com", href: "mailto:yosti2@gmail.com" },
        { label: "+251 9********", href: "tel:+2519********" },
      ],
    },
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 pt-28">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Social + Branding */}
          <div className="lg:w-1/4">
            <h3 className="text-2xl font-semibold mb-4">Yosti</h3>
            <p className="text-gray-300 mb-6">
              Bridging the import-export gap with trust and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FacebookOutlined className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <TwitterOutlined className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <LinkedinOutlined className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <InstagramOutlined className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:w-3/4">
            {columns.slice(1).map((col, idx) => (
              <div key={idx}>
                <h4 className="text-lg mb-4 font-medium">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="hover:text-gray-300 transition-colors"
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

        {/* Divider */}
        <hr className="border-gray-500 my-8 " />

        {/* Copyright */}
        <p className="text-center text-gray-300  text-sm">
          © 2025 Yosti Import & Export | Bridging Gap with Trust
        </p>
      </div>
    </footer>
  );
};

export default Footer;
