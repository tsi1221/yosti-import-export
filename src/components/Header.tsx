import React from "react";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { BellOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  role: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ role, email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "email",
      icon: <UserOutlined />,
      label: email,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span className="logout-text">Logout</span>,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white border-b border-gray-200 shadow px-5 h-16">
      <div className="text-xl font-semibold ml-64 text-gray-800 truncate">Dashboard</div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Button type="text" icon={<BellOutlined style={{ fontSize: 20 }} />} />
          <span className="absolute top-1.5 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full"
            />
            <span className="hidden md:inline font-medium text-gray-700 capitalize">
              {role.replace("-", " ")}
            </span>
          </div>
        </Dropdown>
      </div>

      <style>{`
        .logout-text {
          display: inline-block;
          width: 100%;
          padding: 5px 12px;
        }
      `}</style>
    </header>
  );
};

export default Header;
