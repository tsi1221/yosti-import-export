// src/pages/Dashboard.tsx
import React from 'react';
import { Card, Table, Tag } from 'antd';
import {
  TeamOutlined,
  FileTextOutlined,
  TruckOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';

interface Metric {
  title: string;
  value: string;
  icon: React.ElementType;
}

interface TableRow {
  key: string;
  productName: string;
  status: string;
  date: string;
}

const metricData: Metric[] = [
  { title: 'Total Users', value: '7', icon: TeamOutlined },
  { title: 'Open Sourcing Requests', value: '2', icon: FileTextOutlined },
  { title: 'Shipments In-Transit', value: '1', icon: TruckOutlined },
  { title: 'Revenue (USD)', value: '$16,250', icon: DollarCircleOutlined },
];

const tableData: TableRow[] = [
  { key: '1', productName: 'Bulk White Sesame Seeds', status: 'completed', date: '15/09/2025' },
  { key: '2', productName: 'Sidamo Grade A Coffee Beans', status: 'in-progress', date: '19/10/2025' },
  { key: '3', productName: 'Textile Weaving Machine Parts', status: 'open', date: '21/10/2025' },
  { key: '4', productName: 'Industrial Grade Resin', status: 'completed', date: '01/09/2025' },
];

const statusColors: Record<string, string> = {
  completed: 'blue',
  'in-progress': 'gold',
  open: 'green',
};

const MetricCard: React.FC<Metric> = ({ title, value, icon: Icon }) => (
  <Card
    bordered={false}
    className="flex items-center  justify-between bg-indigo-700 rounded-xl text-white shadow-md hover:shadow-lg transition duration-300 p-3"
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-[#0F3952] text-white text-2xl flex items-center justify-center">
        <Icon />
      </div>
      <div>
        <p className="text-6 font-medium opacity-90">{title}</p>
        <h2 className="text-9 font-semibold">{value}</h2>
      </div>
    </div>
  </Card>
);

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
    render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center' as const,
    render: (status: string) => (
      <Tag color={statusColors[status]} className="font-medium capitalize">
        {status.replace('-', ' ')}
      </Tag>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'right' as const,
    render: (date: string) => <span className="text-gray-600">{date}</span>,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-1 lg:p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Metrics Section */}
      <div className="grid border: 2px solid #0F3952 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricData.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Recent Requests */}
      <Card
        title={<span className="text-base font-semibold text-gray-800">Recent Sourcing Requests</span>}
        bordered={false}
        className="rounded-xl shadow-sm hover:shadow-md transition"
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          bordered
          className="rounded-lg overflow-hidden"
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
