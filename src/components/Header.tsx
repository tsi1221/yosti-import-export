// src/components/Header.tsx
import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  role: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ role, email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to home
  };

  // User dropdown menu
  const menu = (
    <Menu
      items={[
        { key: 'email', icon: <UserOutlined />, label: email },
        { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: <span className="logout-text">Logout</span>,
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white border-b border-gray-200 shadow px-5 h-16">
      {/* Page title */}
      <div className="text-xl font-semibold ml-64 text-gray-800 truncate">Dashboard</div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button type="text" icon={<BellOutlined style={{ fontSize: 20 }} />}>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User profile dropdown */}
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full"
            />
            <span className="hidden md:inline font-medium text-gray-700 capitalize">
              {role.replace('-', ' ')}
            </span>
          </div>
        </Dropdown>
      </div>

      {/* Custom styles for Logout */}
      <style>{`
        .logout-text {
          display: inline-block;
          width: 100%;
          padding: 5px 12px;
        }
        .logout-text:hover {
          background-color: transparent !important;
          color: inherit !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
