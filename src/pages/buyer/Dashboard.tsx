// src/pages/buyer/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-10">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-[#0A1A4E] mb-8">
        Buyer Dashboard
      </h1>

      {/* ============================
          SECTION 1 — TOP STAT CARDS
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#FFC727]">
          <h3 className="text-sm text-gray-500 mb-1">Active Requests</h3>
          <p className="text-4xl font-bold text-[#0A1A4E]">4</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#FFC727]">
          <h3 className="text-sm text-gray-500 mb-1">Pending Quotes</h3>
          <p className="text-4xl font-bold text-[#0A1A4E]">2</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-[#FFC727]">
          <h3 className="text-sm text-gray-500 mb-1">Shipments In Transit</h3>
          <p className="text-4xl font-bold text-[#0A1A4E]">1</p>
        </div>

      </div>

      {/* ============================
          SECTION 2 — BOTTOM PANELS
      ============================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL — RECENT REQUESTS */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-[#0A1A4E] mb-6">
            Recent Sourcing Requests
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="font-medium text-gray-800">Electronics</p>
              <span className="text-[#0A1A4E] font-semibold text-sm">
                Pending Quote
              </span>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="font-medium text-gray-800">Furniture</p>
              <span className="text-yellow-600 font-semibold text-sm">
                Under Review
              </span>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="font-medium text-gray-800">Fashion Items</p>
              <span className="text-green-700 font-semibold text-sm">
                Quoted
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — SHIPMENTS */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-[#0A1A4E] mb-6">
            Shipments Overview
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="font-medium text-gray-800">Shipment #CN-001</p>
              <span className="text-blue-700 font-semibold text-sm">
                In Transit
              </span>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <p className="font-medium text-gray-800">Shipment #CN-002</p>
              <span className="text-green-700 font-semibold text-sm">
                Delivered
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
