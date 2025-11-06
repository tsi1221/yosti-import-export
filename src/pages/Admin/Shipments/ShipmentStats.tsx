import React from "react";
import { TruckOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center">
    <div className="w-14 h-14 mb-3 flex items-center justify-center rounded-full bg-[#0021f5b4] text-white text-2xl">
      {icon}
    </div>
    <h2 className="text-2xl font-bold">{value}</h2>
    <p className="text-gray-600">{label}</p>
  </div>
);

interface ShipmentStatsProps {
  total: number;
  inTransit: number;
  delivered: number;
  delayed: number;
}

const ShipmentStats: React.FC<ShipmentStatsProps> = ({ total, inTransit, delivered, delayed }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <StatCard label="Total Shipments" value={total} icon={<TruckOutlined />} />
    <StatCard label="In Transit" value={inTransit} icon={<ClockCircleOutlined />} />
    <StatCard label="Delivered" value={delivered} icon={<CheckCircleOutlined />} />
    <StatCard label="Delayed" value={delayed} icon={<ExclamationCircleOutlined />} />
  </div>
);

export default ShipmentStats;
