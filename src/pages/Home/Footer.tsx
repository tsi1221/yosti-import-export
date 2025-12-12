import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  WechatOutlined,
  YoutubeOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  const columns = [
    {
      title: "Our Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Projects", href: "/Ourproject" },
        { label: "Why Choose Us", href: "/Whychoose" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Our Services",
      links: [
        { label: "All Services", href: "/services" },
        { label: "Import Services", href: "/services" },
        { label: "Export Services", href: "/services" },
        { label: "Consulting", href: "/services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog & News", href: "/blog/news" },
        { label: "PDF Forms & Templates", href: "/blog/news" },
        { label: "License Verification", href: "/blog/news" },
        { label: "Developer SDK", href: "/blog/news" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0f3952] text-white w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="lg:w-1/3">
            <div className="flex items-center mb-4">
              <img
                alt="Yosti"
                className="w-8 h-8 mr-3"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <h3 className="text-2xl font-bold text-yellow-400">Yosti Trading</h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              Bridging the import-export gap with trust, efficiency, and transparency. Your gateway to reliable global trade.
            </p>
            <h4 className="text-lg font-semibold mb-3 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-3 text-xs">
              Get the latest updates on trade, regulations, and product news.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 bg-white text-gray-800 border-none outline-none w-full text-sm focus:ring-1 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-black px-6 py-3 font-medium text-sm hover:bg-yellow-300 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 lg:w-2/3 mt-6 lg:mt-0">
            <div className="flex flex-col sm:flex-row gap-12">
              {columns.slice(0, 2).map((col, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-4 text-white">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.href}
                          className="text-gray-300 text-sm hover:text-yellow-400 transition"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-3">
                {columns[2].links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-yellow-400 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                <li className="pt-6">
                  <p className="text-white font-semibold mb-1 text-sm">Questions? Contact us:</p>
                  <a
                    href="mailto:muller@yostitrading.com"
                    className="text-yellow-400 text-sm hover:text-yellow-300 transition flex items-center"
                  >
                    <MailOutlined className="mr-2" /> muller@yostitrading.com
                  </a>
                  <p className="text-gray-400 text-xs mt-1 pl-4">Response Time: 24 Hours</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-white text-sm">Follow Us:</p>
            <div className="flex space-x-5 text-xl">
              <a className="text-white hover:text-yellow-400 transition"><FacebookOutlined /></a>
              <a className="text-white hover:text-yellow-400 transition"><TwitterOutlined /></a>
              <a className="text-white hover:text-yellow-400 transition"><LinkedinOutlined /></a>
              <a className="text-white hover:text-yellow-400 transition"><InstagramOutlined /></a>
              <a className="text-white hover:text-yellow-400 transition"><WechatOutlined /></a>
              <a className="text-white hover:text-yellow-400 transition"><YoutubeOutlined /></a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end text-gray-400 text-xs">
            <p className="mr-2">© 2025 Yosti Co., Ltd. All rights reserved.</p>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <div className="space-x-4 ml-4 flex flex-wrap justify-center">
              <a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-yellow-400 transition">Terms of Service</a>
              <a href="/cookies" className="hover:text-yellow-400 transition">Cookie Policy</a>
              <a href="/accessibility" className="hover:text-yellow-400 transition">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
