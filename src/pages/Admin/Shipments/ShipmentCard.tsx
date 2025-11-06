import React from "react";
import type { Shipment } from "./index";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: () => void;
  onEdit?: (shipment: Shipment) => void;
  onDelete?: (shipment: Shipment) => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  onClick,
  onEdit,
  onDelete,
}) => (
  <div
    onClick={onClick}
    className="bg-white p-5 rounded-xl shadow flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{shipment.tracking_number}</h3>
        <p>
          <span className="font-medium">Customer:</span> {shipment.user.full_name}
        </p>
        <p>
          <span className="font-medium">Supplier:</span> {shipment.supplier.name}
        </p>
        <p>
          <span className="font-medium">Destination:</span>{" "}
          {shipment.destination_country}, {shipment.destination_city}
        </p>
        <p>
          <span className="font-medium">ETA:</span> {shipment.estimated_delivery_date}
        </p>
        <span
          className={`text-sm font-semibold ${
            shipment.status === "delivered"
              ? "text-green-500"
              : shipment.status === "in transit"
              ? "text-blue-500"
              : "text-gray-500"
          }`}
        >
          {shipment.status.toUpperCase()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit(shipment);
          }}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
        >
          <EditOutlined /> Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete(shipment);
          }}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
        >
          <DeleteOutlined /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default ShipmentCard;
