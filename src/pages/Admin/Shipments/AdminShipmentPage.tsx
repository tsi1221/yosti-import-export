import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ShipmentStats from "./ShipmentStats";
import ShipmentFilter from "./ShipmentFilter";
import ShipmentCard from "./ShipmentCard";
import ShipmentTable from "./ShipmentTable";
import ShipmentModal from "./ShipmentModal";
import { shipments } from "./dummy";
import type { Shipment } from "./index";

const AdminShipmentPage: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtered, setFiltered] = useState(shipments);

  const handleRowClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setModalVisible(true);
  };

  const handleFilter = (status?: string) => {
    if (!status) return setFiltered(shipments);
    setFiltered(shipments.filter((s) => s.status === status));
  };

  const handleEdit = (shipment: Shipment) => {
    console.log("Edit", shipment.tracking_number);
    // open edit modal or navigate to edit page
  };

  const handleDelete = (shipment: Shipment) => {
    console.log("Delete", shipment.tracking_number);
    // perform deletion logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shipment Management</h1>

      <ShipmentStats
        total={shipments.length}
        inTransit={shipments.filter((s) => s.status === "in transit").length}
        delivered={shipments.filter((s) => s.status === "delivered").length}
        delayed={0}
      />

      <ShipmentFilter onStatusChange={handleFilter} />

      {/* Mobile Cards */}
      <div className="block lg:hidden grid grid-cols-1 gap-4 mb-6">
        {filtered.map((s) => (
          <ShipmentCard
            key={s.shipment_id}
            shipment={s}
            onClick={() => handleRowClick(s)}
            onEdit={() => handleEdit(s)}
            onDelete={() => handleDelete(s)}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <ShipmentTable
          data={filtered.map((s) => ({
            ...s,
            actions: (
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(s)}
                >
                  <EditOutlined />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(s)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            ),
          }))}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Shipment Details Modal */}
      <ShipmentModal
        shipment={selectedShipment!}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default AdminShipmentPage;
