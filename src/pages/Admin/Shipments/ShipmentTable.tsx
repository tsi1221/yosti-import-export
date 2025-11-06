import React from "react";
import { Table, Badge } from "antd";
import type { Shipment } from "./index";

interface ShipmentTableProps {
  data: Shipment[];
  onRowClick?: (shipment: Shipment) => void;
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ data, onRowClick }) => {
  const columns = [
    { title: "Tracking #", dataIndex: "tracking_number", key: "tracking_number" },
    { title: "Customer", dataIndex: ["user", "full_name"], key: "customer" },
    { title: "Supplier", dataIndex: ["supplier", "name"], key: "supplier" },
    { title: "Pickup", dataIndex: "pickup_location", key: "pickup" },
    { title: "Destination", render: (_: any, record: Shipment) => `${record.destination_country}, ${record.destination_city}`, key: "destination" },
    { title: "Method", dataIndex: "shipping_method", key: "method" },
    { title: "Status", render: (_: any, record: Shipment) => {
        const color = record.status === "delivered" ? "green" : record.status === "in transit" ? "blue" : "gray";
        return <Badge color={color} text={record.status.toUpperCase()} />;
      } 
    },
    { title: "ETA", dataIndex: "estimated_delivery_date", key: "eta" },
  ];

  return <Table columns={columns} dataSource={data} rowKey="shipment_id" onRow={(record) => ({ onClick: () => onRowClick?.(record) })} />;
};

export default ShipmentTable;
