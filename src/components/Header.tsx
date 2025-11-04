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
    <header className="w-full flex justify-between items-center p-5 bg-white shadow border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="text-xl font-semibold ml-64 text-gray-800">Dashboard</div>

      <div className="flex items-center gap-4">
        <Select
          value={role}
          onChange={(value: Role) => setRole(value)}
          style={{ width: 140, height: 34 }}
        >
          <Option value="super-admin">Super Admin</Option>
          <Option value="admin">Admin</Option>
          <Option value="customer">Customer</Option>
          <Option value="supplier">Supplier</Option>
        </Select>

        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          className="relative"
        >
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="rounded-full"
          />
          <span className="hidden md:inline">{role}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
