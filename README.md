  { email: "buyer@example.com", password: "password123", role: "buyer" },
  { email: "supplier@example.com", password: "password123", role: "supplier" },
  { email: "admin@example.com", password: "password123", role: "admin" },
  { email: "superadmin@example.com", password: "password123", role: "super-admin" },
  { email: "logistics@example.com", password: "password123", role: "logistics" },








  /////////////////////////////////////////////////////////////////////////////////////////////////

  // src/components/Header.tsx
import React from 'react';
import { Button, Select } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import type { Role } from './Sidebar';

const { Option } = Select;

interface HeaderProps {
  role: Role;
  setRole: (value: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
  return (
    <header className="w-full flex justify-between items-center p-4 lg:p-5 bg-white shadow border-b border-gray-200 fixed top-0 left-0 z-50">
      {/* Page title */}
      <div className="text-xl font-semibold ml-64 text-gray-800 truncate">Dashboard</div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Role selector */}
        <Select
          value={role}
          onChange={(value: Role) => setRole(value)}
          style={{ width: 160, height: 34 }}
        >
          <Option value="super-admin">Super Admin</Option>
          <Option value="admin">Admin</Option>
          <Option value="buyer">Buyer</Option>
          <Option value="supplier">Supplier</Option>
          <Option value="student">Student</Option>
          <Option value="logistics">Logistics</Option>
        </Select>

        {/* Notifications */}
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          className="relative"
        >
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="rounded-full"
          />
          <span className="hidden md:inline font-medium text-gray-700 capitalize">
            {role.replace('-', ' ')}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;  