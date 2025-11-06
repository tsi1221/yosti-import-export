import React from "react";
import { Modal } from "antd";
import type { Shipment } from "./index";

interface ShipmentModalProps {
  visible: boolean;
  shipment?: Shipment;
  onClose: () => void;
}

const ShipmentModal: React.FC<ShipmentModalProps> = ({ visible, shipment, onClose }) => {
  if (!shipment) return null;

  return (
    <Modal title={`Shipment: ${shipment.tracking_number}`} visible={visible} onCancel={onClose} footer={null} width={800}>
      <div className="flex flex-col gap-4">
        <p><span className="font-medium">Customer:</span> {shipment.user.full_name}</p>
        <p><span className="font-medium">Supplier:</span> {shipment.supplier.name}</p>
        <p><span className="font-medium">Pickup Location:</span> {shipment.pickup_location}</p>
        <p><span className="font-medium">Destination:</span> {shipment.destination_country}, {shipment.destination_city}</p>
        <p><span className="font-medium">Goods:</span> {shipment.goods_description}</p>
        <p><span className="font-medium">Weight:</span> {shipment.weight} kg</p>
        <p><span className="font-medium">Volume:</span> {shipment.volume} m³</p>
        <p><span className="font-medium">Shipping Method:</span> {shipment.shipping_method}</p>
        <p><span className="font-medium">Estimated Delivery:</span> {shipment.estimated_delivery_date}</p>
        <h4 className="font-bold mt-4">Updates</h4>
        <ul className="list-disc pl-5">
          {shipment.updates.map((u, i) => (
            <li key={i}>{u.update_time} - {u.location} - {u.status}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ShipmentModal;
