// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  CustomerServiceOutlined,
  TruckOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import yostiLogo from '../assets/yostilogo.png'; // Import your logo

export type Role = 'admin' | 'super-admin' | 'supplier' | 'customer' | 'student';

interface SidebarProps {
  role: Role;
}

interface MenuItem {
  key: string;
  label: string;
  icon: JSX.Element;
  path?: string;
  children?: MenuItem[];
}

// Sidebar menu items per role
const menuItemsByRole: Record<Role, MenuItem[]> = {
  customer: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'products', label: 'Products', icon: <AppstoreAddOutlined />, path: '/products' },
    { key: 'sourcing', label: 'Sourcing', icon: <AppstoreOutlined />, path: '/sourcing' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
  ],
  supplier: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'products', label: 'Products', icon: <AppstoreAddOutlined />, path: '/products' },
    { key: 'sourcing', label: 'Sourcing', icon: <AppstoreOutlined />, path: '/sourcing' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
  ],
  student: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'inspection', label: 'Inspection', icon: <SafetyOutlined />, path: '/inspection' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'supplier', label: 'Supplier', icon: <AppstoreOutlined />, path: '/supplier' },
  ],
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'products', label: 'Products', icon: <AppstoreAddOutlined />, path: '/products' },
    { key: 'sourcing', label: 'Sourcing', icon: <AppstoreOutlined />, path: '/sourcing' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'inspections', label: 'Inspections', icon: <SafetyOutlined />, path: '/inspections' },
    { key: 'verifications', label: 'Verifications', icon: <CheckCircleOutlined />, path: '/verifications' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'analytics', label: 'Analytics', icon: <BarChartOutlined />, path: '/analytics' },
    {
      key: 'admin-group',
      label: 'Admin Settings',
      icon: <SettingOutlined />,
      children: [
        { key: 'user-management', label: 'User Management', icon: <UserOutlined />, path: '/user-management' },
        { key: 'blog-management', label: 'Blog Management', icon: <FileTextOutlined />, path: '/blog-management' },
        { key: 'system-settings', label: 'System Settings', icon: <SettingOutlined />, path: '/system-settings' },
      ],
    },
  ],
  'super-admin': [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { key: 'products', label: 'Products', icon: <AppstoreAddOutlined />, path: '/products' },
    { key: 'sourcing', label: 'Sourcing', icon: <AppstoreOutlined />, path: '/sourcing' },
    { key: 'support', label: 'Support', icon: <CustomerServiceOutlined />, path: '/support' },
    { key: 'shipments', label: 'Shipments', icon: <TruckOutlined />, path: '/shipments' },
    { key: 'inspections', label: 'Inspections', icon: <SafetyOutlined />, path: '/inspections' },
    { key: 'verifications', label: 'Verifications', icon: <CheckCircleOutlined />, path: '/verifications' },
    { key: 'payments', label: 'Payments', icon: <DollarCircleOutlined />, path: '/payments' },
    { key: 'analytics', label: 'Analytics', icon: <BarChartOutlined />, path: '/analytics' },
    {
      key: 'admin-group',
      label: 'Admin Settings',
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
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

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
            cursor-pointer
          `}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          {!collapsed && <span className="truncate">{item.label}</span>}
        </button>
        {item.children?.map((child) => renderMenuItem(child, depth + 1))}
      </div>
    );
  };

  return (
    <aside
      className="flex flex-col bg-[#0F3952] text-white transition-all duration-300"
      style={{ width: collapsed ? '80px' : '250px', height: '100vh' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-start py-4 px-4 border-b border-gray-700 select-none cursor-default gap-2">
        <img
          src={yostiLogo}
          alt="Yosti Logo"
          className={`${collapsed ? 'h-6' : 'h-12'} transition-all`}
        />
        {!collapsed && (
          <span className="text-xl font-bold">
            <span className="text-white">Y</span>
            <span style={{ color: '#E4BD3B' }}>osti</span>
          </span>
        )}
      </div>

      {/* Scrollable Menu with hidden scrollbar */}
      <div
        className="flex-1 overflow-y-auto px-1 mt-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {menuItemsByRole[role]?.map((item) => renderMenuItem(item))}
      </div>

      {/* Collapse Button at bottom */}
      <div className="border-t border-gray-700 p-2 flex justify-center">
        <button onClick={toggleSidebar} className="text-white text-lg focus:outline-none">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* Hide scrollbar for Webkit */}
      <style>{`
        div::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
