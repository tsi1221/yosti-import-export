import React, { useState, useEffect } from "react";
import { Menu, Button, Skeleton, Drawer } from "antd";
import { LoginOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // <-- import
import type { MenuProps } from "antd";

const Navbar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate(); // <-- use hook

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
          Blog <DownOutlined style={{ fontSize: 10 }} />
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
          Export Products <DownOutlined style={{ fontSize: 10 }} />
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

  // Navigation handler
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const clickedItem = menuItems.find(
      (item) => item.key === info.key
    ) as any; // type casting for path
    if (clickedItem?.path) {
      navigate(clickedItem.path);
      setDrawerVisible(false); // close drawer on mobile
    } else if (info.key.includes(":")) {
      // handle nested children
      const [parentKey, childKey] = info.key.split(":");
      const parent = menuItems.find((i) => i.key === parentKey) as any;
      const child = parent?.children.find((c) => c.key === info.key);
      if (child?.path) {
        navigate(child.path);
        setDrawerVisible(false);
      }
    }
  };

  return (
    <header className="navbar flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-logo text-xl font-semibold text-blue-700">Yosti</div>

      <div className="hidden md:flex items-center space-x-6">
        {loading ? (
          <Skeleton.Input
            active
            size="default"
            style={{ width: 400, border: "none", boxShadow: "none" }}
          />
        ) : (
          <Menu
            mode="horizontal"
            items={menuItems}
            className="!border-none !shadow-none"
            style={{ borderBottom: "none", boxShadow: "none" }}
            onClick={handleMenuClick} // <-- handle click
          />
        )}
        <Button icon={<LoginOutlined />} type="text">
          Login
        </Button>
      </div>

      <div className="md:hidden">
        <Button
          icon={<MenuOutlined />}
          type="text"
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      <Drawer
        title="Yosti"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Menu
            mode="inline"
            items={menuItems}
            className="!border-none"
            style={{ border: "none" }}
            onClick={handleMenuClick} // <-- handle click
          />
        )}
        <Button icon={<LoginOutlined />} type="text" className="mt-4">
          Login
        </Button>
      </Drawer>
    </header>
  );
};

export default Navbar;
