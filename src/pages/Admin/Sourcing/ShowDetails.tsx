import React from "react";
import { Drawer, Tag } from "antd";
import dayjs from "dayjs";

interface SourcingRequest {
  request_id: string;
  user_id: string;
  product_name: string;
  description: string;
  quantity: number;
  target_price: number;
  supplier_region: string;
  sample_required: boolean;
  deadline: string;
  status: "open" | "quoted" | "completed";
  created_at: string;
}

interface ShowDetailsProps {
  visible: boolean;
  request: SourcingRequest | null;
  onClose: () => void;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ visible, request, onClose }) => {
  if (!request) return null;

  const statusColor = request.status === "open" ? "orange" : request.status === "quoted" ? "blue" : "green";

  const fieldClass = "text-gray-700 text-sm mb-2";
  const labelClass = "font-semibold text-gray-500 mr-2";

  return (
    <Drawer
      title="Sourcing Request Details"
      placement="right"
      width={350}
      onClose={onClose}
      open={visible}
      bodyStyle={{ padding: "16px"}}
    >
      <div className={fieldClass}><span className={labelClass}>Product:</span>{request.product_name}</div>
      <div className={fieldClass}><span className={labelClass}>Description:</span>{request.description}</div>
      <div className={fieldClass}><span className={labelClass}>Quantity:</span>{request.quantity}</div>
      <div className={fieldClass}><span className={labelClass}>Target Price:</span>${request.target_price}</div>
      <div className={fieldClass}><span className={labelClass}>Supplier Region:</span>{request.supplier_region}</div>
      <div className={fieldClass}><span className={labelClass}>Sample Required:</span>{request.sample_required ? "Yes" : "No"}</div>
      <div className={fieldClass}><span className={labelClass}>Deadline:</span>{dayjs(request.deadline).format("YYYY-MM-DD")}</div>
      <div className={fieldClass}><span className={labelClass}>Status:</span><Tag color={statusColor}>{request.status.toUpperCase()}</Tag></div>
      <div className={fieldClass}><span className={labelClass}>Created At:</span>{dayjs(request.created_at).format("YYYY-MM-DD HH:mm")}</div>
    </Drawer>
  );
};

export default ShowDetails;
