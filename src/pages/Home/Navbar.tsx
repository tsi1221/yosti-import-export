import React, { useState, useEffect } from "react";
import { Menu, Button, Drawer, Dropdown, Space, Tooltip } from "antd";
import {
  LoginOutlined,
  DownOutlined,
  GlobalOutlined,
  FlagOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import yostiLogo from "../../assets/yostilogo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  useEffect(() => {
    const handleScroll = () => drawerVisible && setDrawerVisible(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawerVisible]);

  const offices = [
    {
      city: "Shanghai",
      address: "Room A13, 10th Floor, No. 1, Lane 1136, Xinzha Road, Jing’an District, Shanghai, China",
      fullAddress: "中国上海市静安区新闸路 1136 弄 1 号 10 楼 A13 室",
      phone: "+86 21 6888 8888",
      hours: "Mon-Fri: 9:00-18:00",
      color: "bg-blue-400",
    },
    {
      city: "Yiwu",
      address: "Room 2106, Building 3, Zhongfu Plaza, Futian Street, Yiwu, Zhejiang Province, China",
      fullAddress: "中国浙江省义乌市福田街道中福广场 3 号楼 2106 室",
      phone: "+86 579 8555 6666",
      hours: "Mon-Sat: 8:30-17:30",
      color: "bg-green-400",
    },
  ];

  const menuItems: MenuProps["items"] = [
    { label: "Home", key: "/" },
    { label: "Track Shipment", key: "/track" },
    {
      label: <span className="flex items-center">Industries <DownOutlined className="ml-1 text-xs" /></span>,
      key: "industries",
      children: [
        { label: "Construction Equipment & Materials", key: "/industries/construction" },
        { label: "Consumer Goods & Apparel", key: "/industries/consumer" },
        { label: "Agricultural Tools & Supplies", key: "/industries/agriculture" },
        { label: "Electronics & Gadgets", key: "/industries/electronics" },
        { label: "Food & Beverages", key: "/industries/food" },
        { label: "Vehicles & Spare Parts", key: "/industries/vehicles" },
      ],
    },
    { label: "Services", key: "/services" },
    { label: "Why Choose Us", key: "/Whychoose" },
    { label: "Our Projects", key: "/Ourproject" },
    { label: "Blog", key: "/blog/news     " },
    { label: "About Us", key: "/about" },
    { label: "Contact Us", key: "/contact" },
  ];

  const languageMenuItems = [
    { label: <Space><FlagOutlined /> English</Space>, key: "EN" },
    { label: <Space><FlagOutlined /> Amharic</Space>, key: "AM" },
    { label: <Space><FlagOutlined /> Chinese</Space>, key: "CN" },
    { label: <Space><FlagOutlined /> Oromiffa</Space>, key: "OR" },
  ];

  const handleLanguageSelect: MenuProps["onClick"] = ({ key }) => setSelectedLanguage(key);
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
    setDrawerVisible(false);
  };

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      {/* Office Bar */}
      <div className="bg-[#0F3952] text-white py-1">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-1 md:mb-0">
            <EnvironmentOutlined className="mr-2 text-yellow-400" />
            <span className="font-medium">Global Offices:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {offices.map((office, idx) => (
              <Tooltip
                key={idx}
                title={
                  <div className="p-2">
                    <div className="font-bold text-[#0F3952] mb-1">{office.city}</div>
                    <div className="text-sm">{office.address}</div>
                    <div className="text-xs text-gray-600 mt-1">{office.fullAddress}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <PhoneOutlined className="mr-1" /> {office.phone}
                    </div>
                    <div className="flex items-center text-xs">
                      <ClockCircleOutlined className="mr-1" /> {office.hours}
                    </div>
                  </div>
                }
                placement="bottom"
                color="white"
              >
                <div className="flex items-center cursor-pointer group">
                  <div className={`w-2 h-2 rounded-full ${office.color} mr-1 group-hover:animate-pulse`}></div>
                  <span className="font-semibold">{office.city}:</span>
                  <span className="ml-1 text-sm opacity-90 hidden sm:inline">{office.address}</span>
                </div>
              </Tooltip>
            ))}
          </div>
          <div className="hidden md:flex items-center text-sm">
            <PhoneOutlined className="mr-1 text-yellow-400" />
            <span>24/7 Support: +86 400 123 4567</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={yostiLogo} alt="Yosti Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold ml-2 text-[#0F3952]"><span className="text-yellow-500">Y</span>osti</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Menu
              mode="horizontal"
              items={menuItems}
              onClick={handleMenuClick}
              className="!border-none !bg-transparent flex-1 justify-center text-[#0F3952]"
              style={{ fontSize: "14px", width: "100%" }}
            />
          </div>

          {/* Right Items */}
          <div className="flex items-center space-x-2">
            <Dropdown overlay={<Menu items={languageMenuItems} onClick={handleLanguageSelect} />} placement="bottomRight" trigger={["click"]}>
              <Button type="text" className="flex items-center text-[#0F3952] hover:text-[#0F3952]/80">
                <GlobalOutlined />
                <Space>{selectedLanguage} <DownOutlined className="text-xs" /></Space>
              </Button>
            </Dropdown>

            <Button
              icon={<LoginOutlined />}
              type="default"
              className="rounded-full border-2 border-[#0F3952] text-[#0F3952] px-3 py-1 hover:border-yellow-500 hover:text-yellow-500"
              onClick={() => navigate("/login")}
            >
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Sign In</span>
            </Button>

            <div className="lg:hidden">
              <Button
                icon={<MenuOutlined className="text-xl text-[#0F3952]" />}
                type="text"
                onClick={() => setDrawerVisible(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={yostiLogo} alt="Yosti Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold ml-2 text-[#0F3952]"><span className="text-yellow-500">Y</span>osti</span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div className="mb-4 p-3 bg-[#0F3952] rounded-lg text-white">
          {offices.map((office, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex items-center mb-1">
                <div className={`w-2 h-2 rounded-full ${office.color} mr-2`}></div>
                <h4 className="font-semibold">{office.city}</h4>
              </div>
              <p className="text-sm opacity-90 mb-1">{office.address}</p>
              <p className="text-xs opacity-75 mb-1">{office.fullAddress}</p>
              <div className="text-xs opacity-75 flex items-center mb-1">
                <PhoneOutlined className="mr-1" /> {office.phone}
              </div>
              <div className="text-xs opacity-75 flex items-center">
                <ClockCircleOutlined className="mr-1" /> {office.hours}
              </div>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-white/20 text-sm flex items-center">
            <PhoneOutlined className="mr-2 text-yellow-400" /> 24/7 Support: +86 400 123 4567
          </div>
        </div>

        <Menu mode="inline" items={menuItems} onClick={handleMenuClick} className="border-none" />
      </Drawer>

      {/* Dark Overlay */}
      {drawerVisible && <div onClick={() => setDrawerVisible(false)} className="fixed inset-0 bg-black/50 z-40" />}
    </header>
  );
};

export default Navbar;
