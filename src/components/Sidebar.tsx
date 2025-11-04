// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ContainerOutlined,
  CustomerServiceOutlined,
  TruckOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export type Role = 'customer' | 'admin' | 'super-admin' | 'supplier';

interface SidebarProps {
  role: Role;
}

interface MenuItem {
  key: string;
  label: string;
  icon: JSX.Element;
  path?: string; // Add path to navigate
  children?: MenuItem[];
}

// Define paths for routing
const menuItemsByRole: Record<Role, MenuItem[]> = {
  customer: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
  ],
  supplier: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'sourcing', label: 'Sourcing', icon: <ContainerOutlined />, path: '/sourcing' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
  ],
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'sourcing', label: 'Sourcing', icon: <ContainerOutlined />, path: '/sourcing' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'inspections', label: 'Inspections', icon: <SafetyOutlined />, path: '/inspections' },
    { key: 'verifications', label: 'Verifications', icon: <CheckCircleOutlined />, path: '/verifications' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'analytics', label: 'Analytics', icon: <BarChartOutlined />, path: '/analytics' },
    {
      key: 'admin-group',
      label: 'ADMIN',
      icon: <SettingOutlined />,
      children: [
        { key: 'user-management', label: 'User Management', icon: <UserOutlined />, path: '/user-management' },
        { key: 'blog-management', label: 'Blog Management', icon: <FileTextOutlined />, path: '/blog-management' },
      ],
    },
  ],
  'super-admin': [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'sourcing', label: 'Sourcing', icon: <ContainerOutlined />, path: '/sourcing' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'inspections', label: 'Inspections', icon: <SafetyOutlined />, path: '/inspections' },
    { key: 'verifications', label: 'Verifications', icon: <CheckCircleOutlined />, path: '/verifications' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'analytics', label: 'Analytics', icon: <BarChartOutlined />, path: '/analytics' },
    {
      key: 'admin-group',
      label: 'ADMIN',
      icon: <SettingOutlined />,
      children: [
        { key: 'user-management', label: 'User Management', icon: <UserOutlined />, path: '/user-management' },
        { key: 'blog-management', label: 'Blog Management', icon: <FileTextOutlined />, path: '/blog-management' },
        { key: 'system-settings', label: 'System Settings', icon: <SettingOutlined />, path: '/system-settings' },
      ],
    },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const navigate = useNavigate();

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isSelected = selectedKey === item.key;

    return (
      <div key={item.key}>
        <button
          onClick={() => {
            setSelectedKey(item.key);
            if (item.path) navigate(item.path);
          }}
          className={`
            flex items-center w-full py-2 px-4 rounded-lg transition-all
            ${isSelected ? 'font-semibold bg-white/20' : ''}
            hover:bg-white/10
          `}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          <span className="truncate">{item.label}</span>
        </button>
        {item.children?.map((child) => renderMenuItem(child, depth + 1))}
      </div>
    );
  };

  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-center py-5 border-b border-gray-700 select-none cursor-default">
        Yosti
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto mt-4 px-1">
        {menuItemsByRole[role]?.map((item) => renderMenuItem(item))}
      </div>
    </aside>
  );
};

export default Sidebar;
