// src/hooks/useShipments.ts
import { useState } from "react";
import dayjs from "dayjs";
import type { Shipment, ShipmentUpdate } from "../pages/buyer/type/ShipmentsInterface";

export interface BookShipmentForm {
  pickup_location: string;
  destination_country: string;
  destination_city: string;
  goods_description: string;
  weight: number;
  volume: number;
  shipping_method: "sea" | "air" | "express";
}

// Mock data: 3 sample shipments
const initialShipments: Shipment[] = [
  {
    shipment_id: "SHP-001",
    user_id: "USR-001",
    pickup_location: "Guangzhou Warehouse",
    destination_country: "Ethiopia",
    destination_city: "Addis Ababa",
    goods_description: "Bluetooth Speakers",
    weight: 120,
    volume: 3.5,
    shipping_method: "air",
    tracking_number: "TRK-99231A",
    status: "in transit",
    estimated_delivery: "2025-12-10",
    updates: [
      { update_id: "UPD-001", shipment_id: "SHP-001", location: "Guangzhou Warehouse", status: "booked", remarks: "Shipment booked", update_time: "2025-11-01 10:00" },
      { update_id: "UPD-002", shipment_id: "SHP-001", location: "Guangzhou Airport", status: "in transit", remarks: "Shipment departed", update_time: "2025-11-03 14:30" },
    ],
  },
  {
    shipment_id: "SHP-002",
    user_id: "USR-002",
    pickup_location: "Shanghai Port",
    destination_country: "Kenya",
    destination_city: "Nairobi",
    goods_description: "Smartphones",
    weight: 80,
    volume: 1.2,
    shipping_method: "sea",
    tracking_number: "TRK-87312B",
    status: "at port",
    estimated_delivery: "2025-12-15",
    updates: [
      { update_id: "UPD-003", shipment_id: "SHP-002", location: "Shanghai Port", status: "booked", remarks: "Shipment booked", update_time: "2025-11-02 11:00" },
      { update_id: "UPD-004", shipment_id: "SHP-002", location: "Port of Shanghai", status: "at port", remarks: "Arrived at port", update_time: "2025-11-05 09:00" },
    ],
  },
  {
    shipment_id: "SHP-003",
    user_id: "USR-003",
    pickup_location: "Shenzhen Warehouse",
    destination_country: "Nigeria",
    destination_city: "Lagos",
    goods_description: "Laptops",
    weight: 150,
    volume: 4.0,
    shipping_method: "express",
    tracking_number: "TRK-56421C",
    status: "customs",
    estimated_delivery: "2025-12-12",
    updates: [
      { update_id: "UPD-005", shipment_id: "SHP-003", location: "Shenzhen Warehouse", status: "booked", remarks: "Shipment booked", update_time: "2025-11-03 12:00" },
      { update_id: "UPD-006", shipment_id: "SHP-003", location: "Lagos Customs", status: "customs", remarks: "Under inspection", update_time: "2025-11-07 15:00" },
    ],
  },
];

export const useShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

  const addShipment = (formValues: BookShipmentForm) => {
    const newShipment: Shipment = {
      shipment_id: `SHP-${Math.floor(Math.random() * 999).toString().padStart(3, "0")}`,
      user_id: "USR-001",
      pickup_location: formValues.pickup_location,
      destination_country: formValues.destination_country,
      destination_city: formValues.destination_city,
      goods_description: formValues.goods_description,
      weight: formValues.weight,
      volume: formValues.volume,
      shipping_method: formValues.shipping_method,
      tracking_number: "TRK-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: "booked",
      estimated_delivery: dayjs().add(15, "day").format("YYYY-MM-DD"),
      updates: [
        {
          update_id: `UPD-${Math.floor(Math.random() * 999)}`,
          shipment_id: `SHP-${Math.floor(Math.random() * 999)}`,
          location: formValues.pickup_location,
          status: "booked",
          remarks: "Shipment booked",
          update_time: dayjs().format("YYYY-MM-DD HH:mm"),
        } as ShipmentUpdate,
      ],
    };
    setShipments((prev) => [newShipment, ...prev]);
  };

  return { shipments, addShipment };
};
