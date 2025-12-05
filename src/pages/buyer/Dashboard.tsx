// src/pages/buyer/Dashboard.tsx
import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
import type { StatCard, RequestItem, ShipmentItem } from "../buyer/type/Dashboardinterface";
import { FileTextOutlined, ClockCircleOutlined, TruckOutlined } from "@ant-design/icons";

const statIcons: Record<string, React.ReactNode> = {
  "Active Requests": <FileTextOutlined className="text-yellow-500 text-2xl" />,
  "Pending Quotes": <ClockCircleOutlined className="text-yellow-500 text-2xl" />,
  "Shipments In Transit": <TruckOutlined className="text-yellow-500 text-2xl" />,
};

const StatCardComponent: React.FC<{ stat: StatCard }> = ({ stat }) => (
  <div
    className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer h-24"
    style={{ borderLeft: `4px solid ${stat.color}` }}
  >
    <div>{statIcons[stat.title]}</div>
    <div>
      <h3 className="text-sm text-gray-500">{stat.title}</h3>
      <p className="text-xl font-medium text-[#0A1A4E]">{stat.value}</p>
    </div>
  </div>
);

const BarCard: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition cursor-pointer">
    <div className="flex justify-between mb-1">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs font-semibold text-gray-700">{value}%</p>
    </div>
    <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, loading } = useDashboard();

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-medium text-[#0A1A4E] mb-6">
        Buyer Dashboard
      </h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {data?.stats.map((stat, i) => (
          <StatCardComponent key={i} stat={stat} />
        ))}
      </div>

      {/* BOTTOM CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT REQUESTS */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-[#0A1A4E] mb-4">Recent Sourcing Requests</h2>
          <div className="space-y-3">
            {data?.requests.map((req: RequestItem, i: number) => {
              const color =
                req.status === "Quoted"
                  ? "#22c55e"
                  : req.status === "Under Review"
                  ? "#facc15"
                  : "#0A1A4E";
              const value = req.status === "Quoted" ? 100 : req.status === "Under Review" ? 60 : 30;

              return <BarCard key={i} label={req.item} value={value} color={color} />;
            })}
          </div>
        </div>

        {/* SHIPMENTS */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-[#0A1A4E] mb-4">Shipments Overview</h2>
          <div className="space-y-3">
            {data?.shipments.map((ship: ShipmentItem, i: number) => {
              const color =
                ship.status === "Delivered"
                  ? "#22c55e"
                  : ship.status === "In Transit"
                  ? "#3b82f6"
                  : "#0A1A4E";
              const value = ship.status === "Delivered" ? 100 : 50;

              return <BarCard key={i} label={`Shipment #${ship.id}`} value={value} color={color} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
