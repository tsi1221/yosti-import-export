import React, { useState, useEffect } from "react";
import { Menu, Button, Skeleton, Drawer } from "antd";
import { LoginOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import yostiLogo from "../../assets/yostilogo.png";

const Navbar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems: MenuProps["items"] = [
    { label: "Home", key: "home", path: "/" },
    { label: "About Us", key: "about", path: "/about" },
    { label: "Services", key: "services", path: "/services" },
    {
      label: (
        <span>
          Blog <DownOutlined style={{ fontSize: 12 }} />
        </span>
      ),
      key: "blog",
      children: [
        { label: "Company News", key: "blog:news", path: "/blog/news" },
        { label: "Industry Insights", key: "blog:insights", path: "/blog/insights" },
      ],
    },
    {
      label: (
        <span>
          Export Products <DownOutlined style={{ fontSize: 12 }} />
        </span>
      ),
      key: "exports",
      children: [
        { label: "Coffee", key: "exports:coffee", path: "/exports/coffee" },
        { label: "Spices", key: "exports:spices", path: "/exports/spices" },
        { label: "Oil Seeds", key: "exports:oilseeds", path: "/exports/oilseeds" },
      ],
    },
    { label: "Testimonials", key: "testimonials", path: "/testimonials" },
    { label: "Contact", key: "contact", path: "/contact" },
  ];

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const clickedItem = menuItems.find((item) => item.key === info.key) as any;
    if (clickedItem?.path) {
      navigate(clickedItem.path);
      setDrawerVisible(false);
    } else if (info.key.includes(":")) {
      const [parentKey] = info.key.split(":");
      const parent = menuItems.find((i) => i.key === parentKey) as any;
      const child = parent?.children.find((c) => c.key === info.key);
      if (child?.path) {
        navigate(child.path);
        setDrawerVisible(false);
      }
    }
  };

  // Custom CSS for dark blue underline
  const menuItemStyle = {
    color: "#0F3952",
    fontSize: "1.125rem", // text-lg
    borderBottom: "2px solid transparent",
    transition: "border-bottom 0.3s",
  };

  const menuItemHover = {
    borderBottom: "2px solid #0F3952",
  };

  return (
  <header className="navbar flex justify-between items-center px-3 bg-white border-b-2 border-transparent shadow-md sticky top-0 z-50" style={{ height: "100px" }}>

      
      {/* Logo */}
      <div className="navbar-logo flex items-center space-x-2">
        <img src={yostiLogo} alt="Yosti Logo" className="h-12 w-auto" />
        <span className="text-3xl font-bold">
          <span className="text-yellow-400">Y</span>
          <span className="text-[#0F3952]">osti</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {loading ? (
          <Skeleton.Input active size="default" style={{ width: 400, border: "none", boxShadow: "none" }} />
        ) : (
          <Menu
            mode="horizontal"
            items={menuItems}
            className="!border-none !shadow-none"
            onClick={handleMenuClick}
            style={{ color: "#0F3952" }}
            selectedKeys={[]}
            overflowedIndicator={<MenuOutlined />}
            itemIcon={null}
            theme="light"
          >
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                style={menuItemStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderBottom = "2px solid #0F3952")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderBottom = "2px solid transparent")}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        )}

        <a href="/login">
          <Button
            icon={<LoginOutlined />}
            type="text"
            style={{ color: "#0F3952", borderBottom: "2px solid transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottom = "3px solid #0F3952")}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottom = "2px solid transparent")}
          >
            Login
          </Button>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button icon={<MenuOutlined className="text-[#0F3952]" />} type="text" onClick={() => setDrawerVisible(true)} />
      </div>

      {/* Drawer (Mobile Menu) */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <img src={yostiLogo} alt="Yosti Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold">
              <span className="text-yellow-400">Y</span>
              <span className="text-[#0F3952]">osti</span>
            </span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Menu mode="inline" items={menuItems} onClick={handleMenuClick} selectedKeys={[]} />
        )}

        <Button icon={<LoginOutlined />} type="text" className="mt-4 text-[#0F3952] text-lg">
          Login
        </Button>
      </Drawer>
    </header>
  );
};

export default Navbar;
