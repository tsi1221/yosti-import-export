import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import yostiLogo from "../../assets/yostilogo.png";

const Footer: React.FC = () => {
  const columns = [
    {
      title: "Our Company",
      links: [
        { label: "Who We Are", href: "#" },
        { label: "About Company", href: "#" },
        { label: "Services We Provide", href: "#" },
        { label: "Our Contact", href: "#" },
      ],
    },
    {
      title: "Our Services",
      links: [
        { label: "Import Services", href: "#" },
        { label: "Export Services", href: "#" },
        { label: "Logistics Service", href: "#" },
        { label: "Consulting", href: "#" },
      ],
    },
    {
      title: "Contact Details",
      links: [
        { label: "China and Ethiopia", href: "#" },
        { label: "+251-911535147", href: "tel:+251911535147" },
        { label: "+251-911997915", href: "tel:+251911997915" },
        { label: "info@yosti.com", href: "mailto:info@yosti.com" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F3952] text-white w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 pt-24">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Brand + Social */}
          <div className="lg:w-1/3">
            <div className="flex items-center mb-4">
              <img src={yostiLogo} alt="Yosti" className="w-12 h-12 mr-3" />
              <h3 className="text-3xl font-extrabold text-yellow-400">Yosti</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Bridging the import-export gap with trust, efficiency, and
              transparency. Your gateway to reliable global trade.
            </p>

            <div className="flex space-x-5">
              <a className="text-yellow-400 text-2xl hover:text-yellow-300 transition">
                <FacebookOutlined />
              </a>
              <a className="text-yellow-400 text-2xl hover:text-yellow-300 transition">
                <TwitterOutlined />
              </a>
              <a className="text-yellow-400 text-2xl hover:text-yellow-300 transition">
                <LinkedinOutlined />
              </a>
              <a className="text-yellow-400 text-2xl hover:text-yellow-300 transition">
                <InstagramOutlined />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:w-2/3">
            {columns.map((col, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-yellow-400 transition"
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
        <hr className="border-gray-500 my-8" />

        {/* Bottom Text */}
        <p className="text-center text-gray-300 text-sm leading-relaxed">
          © 2025 Yosti Import & Export Trading  
          <br />All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
